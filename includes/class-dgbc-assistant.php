<?php
/**
 * Gemini Assistant and Chat REST Controller for Digital Guide Box v2.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class DGBC_Assistant {

	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
	}

	public static function register_rest_routes() {
		register_rest_route(
			'digital-guide-box-v2/v1',
			'/chat',
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'handle_chat' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	public static function handle_chat( WP_REST_Request $request ) {
		$gemini_config = DGBC_Settings::get_section( 'gemini' );

		if ( empty( $gemini_config['enabled'] ) ) {
			return new WP_REST_Response(
				array( 'error' => 'Der KI-Assistent ist in den Einstellungen deaktiviert.' ),
				403
			);
		}

		$api_key = ! empty( $gemini_config['api_key'] ) ? trim( $gemini_config['api_key'] ) : '';
		if ( empty( $api_key ) ) {
			return new WP_REST_Response(
				array(
					'error' => 'Der Gemini-Dienst ist noch nicht mit einem API-Schlüssel konfiguriert. Bitte hinterlege den API-Schlüssel im WordPress-Admin unter „Digital Guide Box v2 > KI-Assistent“.',
				),
				503
			);
		}

		$body = $request->get_json_params();
		if ( empty( $body ) || ! is_array( $body ) ) {
			$body = $request->get_body_params();
		}

		$messages     = isset( $body['messages'] ) && is_array( $body['messages'] ) ? $body['messages'] : array();
		$model_choice = isset( $body['modelChoice'] ) ? sanitize_text_field( $body['modelChoice'] ) : '';
		$task_type    = isset( $body['taskType'] ) ? sanitize_text_field( $body['taskType'] ) : 'general';
		$stream       = ! isset( $body['stream'] ) || (bool) $body['stream'];

		if ( empty( $messages ) ) {
			return new WP_REST_Response(
				array( 'error' => 'Nachrichten-Verlauf (messages) ist erforderlich.' ),
				400
			);
		}

		// Model mapping
		$default_model = ! empty( $gemini_config['default_model'] ) ? $gemini_config['default_model'] : 'gemini-2.5-flash';
		$selected_model = $default_model;

		if ( 'complex' === $task_type || 'gemini-3.1-pro-preview' === $model_choice ) {
			$selected_model = 'gemini-2.5-pro';
		} elseif ( 'fast' === $task_type || 'gemini-3.1-flash-lite' === $model_choice ) {
			$selected_model = 'gemini-2.0-flash';
		}

		// Prepare contents
		$system_prompt = ! empty( $gemini_config['system_prompt'] )
			? $gemini_config['system_prompt']
			: DGBC_Settings::get_defaults()['gemini']['system_prompt'];

		$contents = array();
		foreach ( $messages as $msg ) {
			if ( empty( $msg['content'] ) ) {
				continue;
			}
			$role = ( isset( $msg['role'] ) && in_array( $msg['role'], array( 'assistant', 'model' ), true ) )
				? 'model'
				: 'user';

			$contents[] = array(
				'role'  => $role,
				'parts' => array(
					array( 'text' => (string) $msg['content'] ),
				),
			);
		}

		if ( empty( $contents ) ) {
			return new WP_REST_Response(
				array( 'error' => 'Keine gültigen Nachrichten übergeben.' ),
				400
			);
		}

		$payload = array(
			'systemInstruction' => array(
				'parts' => array(
					array( 'text' => $system_prompt ),
				),
			),
			'contents'         => $contents,
			'generationConfig' => array(
				'temperature' => 0.7,
			),
		);

		// If streaming is possible and requested
		if ( $stream && function_exists( 'curl_init' ) ) {
			return self::stream_gemini_response( $selected_model, $api_key, $payload );
		}

		// Non-streaming fallback via wp_remote_post
		return self::non_stream_gemini_response( $selected_model, $api_key, $payload );
	}

	private static function stream_gemini_response( $model, $api_key, $payload ) {
		$url = 'https://generativelanguage.googleapis.com/v1beta/models/' . rawurlencode( $model ) . ':streamGenerateContent?alt=sse&key=' . rawurlencode( $api_key );

		// Clean output buffers
		while ( ob_get_level() > 0 ) {
			ob_end_clean();
		}

		header( 'Content-Type: text/event-stream; charset=utf-8' );
		header( 'Cache-Control: no-cache, no-transform' );
		header( 'Connection: keep-alive' );
		header( 'X-Accel-Buffering: no' );

		$ch = curl_init();
		curl_setopt( $ch, CURLOPT_URL, $url );
		curl_setopt( $ch, CURLOPT_POST, true );
		curl_setopt( $ch, CURLOPT_POSTFIELDS, wp_json_encode( $payload ) );
		curl_setopt(
			$ch,
			CURLOPT_HTTPHEADER,
			array(
				'Content-Type: application/json',
				'User-Agent: WordPress-Digital-Guide-Box-v2',
			)
		);
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, false );
		curl_setopt( $ch, CURLOPT_TIMEOUT, 60 );

		curl_setopt(
			$ch,
			CURLOPT_WRITEFUNCTION,
			function( $ch, $data ) use ( $model ) {
				// Parse chunks from Google SSE format and reformat for frontend
				$lines = explode( "\n", $data );
				foreach ( $lines as $line ) {
					$line = trim( $line );
					if ( strpos( $line, 'data: ' ) === 0 ) {
						$json_str = substr( $line, 6 );
						$parsed   = json_decode( $json_str, true );
						if ( isset( $parsed['error']['message'] ) ) {
							echo 'data: ' . wp_json_encode( array( 'error' => $parsed['error']['message'] ) ) . "\n\n";
							flush();
							return strlen( $data );
						}
						$text = $parsed['candidates'][0]['content']['parts'][0]['text'] ?? '';
						if ( '' !== $text ) {
							echo 'data: ' . wp_json_encode( array( 'text' => $text, 'model' => $model ) ) . "\n\n";
							flush();
						}
					}
				}
				return strlen( $data );
			}
		);

		curl_exec( $ch );

		if ( curl_errno( $ch ) ) {
			$curl_err = curl_error( $ch );
			echo 'data: ' . wp_json_encode( array( 'error' => 'Netzwerkfehler: ' . $curl_err ) ) . "\n\n";
		} else {
			echo 'data: ' . wp_json_encode( array( 'done' => true, 'model' => $model ) ) . "\n\n";
		}
		curl_close( $ch );
		flush();
		exit;
	}

	private static function non_stream_gemini_response( $model, $api_key, $payload ) {
		$url = 'https://generativelanguage.googleapis.com/v1beta/models/' . rawurlencode( $model ) . ':generateContent?key=' . rawurlencode( $api_key );

		$response = wp_remote_post(
			$url,
			array(
				'timeout' => 45,
				'headers' => array(
					'Content-Type' => 'application/json',
				),
				'body'    => wp_json_encode( $payload ),
			)
		);

		if ( is_wp_error( $response ) ) {
			return new WP_REST_Response(
				array( 'error' => 'Verbindungsfehler zu Gemini: ' . $response->get_error_message() ),
				500
			);
		}

		$status = wp_remote_retrieve_response_code( $response );
		$body   = wp_remote_retrieve_body( $response );
		$data   = json_decode( $body, true );

		if ( 200 !== $status ) {
			$err_msg = isset( $data['error']['message'] ) ? $data['error']['message'] : ( 'HTTP-Fehler ' . $status );
			return new WP_REST_Response(
				array( 'error' => 'Gemini-Fehler: ' . $err_msg ),
				$status
			);
		}

		$text = isset( $data['candidates'][0]['content']['parts'][0]['text'] )
			? $data['candidates'][0]['content']['parts'][0]['text']
			: '';

		return new WP_REST_Response(
			array(
				'reply' => $text,
				'text'  => $text,
				'model' => $model,
			),
			200
		);
	}
}
