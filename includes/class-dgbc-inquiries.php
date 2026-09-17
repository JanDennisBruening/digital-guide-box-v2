<?php
/**
 * Inquiries and Feedback Handler for Digital Guide Box (Configurable Edition).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class DGBC_Inquiries {

	const OPTION_KEY = 'dgbc_recent_inquiries';

	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
	}

	public static function register_rest_routes() {
		register_rest_route(
			'digital-guide-box-v2/v1',
			'/inquiry',
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'handle_inquiry' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	public static function handle_inquiry( WP_REST_Request $request ) {
		$params = $request->get_json_params();

		// Honeypot check
		if ( ! empty( $params['website'] ) ) {
			return new WP_REST_Response( array( 'success' => true ), 200 );
		}

		$type    = isset( $params['type'] ) && 'feedback' === $params['type'] ? 'feedback' : 'support';
		$email   = isset( $params['email'] ) ? sanitize_email( $params['email'] ) : '';
		$message = isset( $params['message'] ) ? sanitize_textarea_field( $params['message'] ) : '';
		$req_id  = isset( $params['requestId'] ) ? sanitize_text_field( $params['requestId'] ) : strtoupper( wp_generate_password( 8, false ) );

		if ( 'support' === $type && empty( $email ) ) {
			return new WP_REST_Response( array( 'success' => false, 'message' => 'Bitte E-Mail-Adresse angeben.' ), 400 );
		}

		if ( empty( $message ) ) {
			return new WP_REST_Response( array( 'success' => false, 'message' => 'Bitte eine Nachricht eingeben.' ), 400 );
		}

		// Store in DB
		$inquiries   = get_option( self::OPTION_KEY, array() );
		$new_inquiry = array(
			'id'        => $req_id,
			'type'      => $type,
			'email'     => $email,
			'message'   => $message,
			'timestamp' => time(),
			'ip'        => sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '' ),
		);

		array_unshift( $inquiries, $new_inquiry );
		if ( count( $inquiries ) > 50 ) {
			$inquiries = array_slice( $inquiries, 0, 50 );
		}
		update_option( self::OPTION_KEY, $inquiries );

		// Send email notification
		$access_settings = DGBC_Settings::get_section( 'access' );
		$recipient       = ! empty( $access_settings['notification_email'] ) ? $access_settings['notification_email'] : 'office@janbruening.de';

		$subject = 'support' === $type
			? sprintf( '[Digital Guide Box v2] Priorisierte Supportanfrage #%s', $req_id )
			: sprintf( '[Digital Guide Box v2] Neues Feedback / Wunsch #%s', $req_id );

		$body  = "Neue Mitteilung aus der Digital Guide Box (v2):\n\n";
		$body .= "Art: " . ( 'support' === $type ? 'Priorisierter Support' : 'Feedback & Wünsche' ) . "\n";
		$body .= "Anfragenummer: #" . $req_id . "\n";
		if ( ! empty( $email ) ) {
			$body .= "Absender E-Mail: " . $email . "\n";
		}
		$body .= "Datum: " . wp_date( 'd.m.Y H:i' ) . "\n\n";
		$body .= "Nachricht:\n" . $message . "\n\n";
		$body .= "---\nDiese E-Mail wurde automatisch von deiner Digital Guide Box gesendet.";

		$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
		if ( ! empty( $email ) ) {
			$headers[] = 'Reply-To: ' . $email;
		}

		@wp_mail( $recipient, $subject, $body, $headers );

		return new WP_REST_Response(
			array(
				'success' => true,
				'id'      => $req_id,
				'message' => 'Deine Nachricht wurde erfolgreich übermittelt.',
			),
			200
		);
	}
}
