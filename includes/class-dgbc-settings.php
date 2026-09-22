<?php
/**
 * Settings Manager for Digital Guide Box (Configurable Edition).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class DGBC_Settings {

	const OPTION_KEY = 'dgbc_settings';

	public static function get_defaults() {
		return array(
			'access' => array(
				'password'           => 'digitalguidejan',
				'session_duration'   => 8 * HOUR_IN_SECONDS, // 28800 seconds
				'slug'               => 'digital-guide-box',
				'notification_email' => 'office@janbruening.de',
			),
			'gate' => array(
				'principle'   => 'Nachlesen · Verstehen · Anwenden',
				'title'       => 'Schön, dass du da bist.',
				'subtitle'    => 'Deine Anleitungen und Neuigkeiten für einen entspannten digitalen Alltag.',
				'note'        => 'Dein Zugang bleibt für acht Stunden geöffnet.',
				'home_url'    => 'https://www.janbruening.de',
				'imprint_url' => 'https://www.janbruening.de/impressum',
			),
			'profile' => array(
				'name'           => 'Jan Dennis Brüning',
				'role'           => 'Dein Digital-Guide',
				'avatar_url'     => '',
				'email'          => 'office@janbruening.de',
				'phone'          => '+49 1520 2553087',
				'emergency_note' => 'Wenn du allein nicht weiterkommst, bin ich für dich da.',
			),
			'whatsapp' => array(
				'enabled'     => true,
				'badge'       => 'Direkt auf dem Smartphone immer dabei',
				'title'       => 'Neu: WhatsApp-Kanal',
				'description' => 'Im Kanal bekommst du neue Tipps. Hier in der Box findest du die Anleitungen zum Nachlesen und Ausprobieren.',
				'url'         => 'https://whatsapp.com/channel/0029VbBej87KAwEt5x4IYN03',
				'footer_note' => 'Kostenlos abonnieren. In Ruhe mitlesen.',
			),
			'gemini' => array(
				'enabled'          => true,
				'provider'         => 'gemini', // 'gemini', 'openai', 'mistral', 'groq', 'custom'
				'api_key'          => '',
				'default_model'    => 'gemini-2.5-flash',
				'openai_api_key'   => '',
				'openai_model'     => 'gpt-4o-mini',
				'mistral_api_key'  => '',
				'mistral_model'    => 'mistral-small-latest',
				'groq_api_key'     => '',
				'groq_model'       => 'llama-3.3-70b-versatile',
				'custom_endpoint'  => '',
				'custom_api_key'   => '',
				'custom_model'              => 'llama3.2',
				'system_prompt'             => "Du bist Jan Dennis Brüning, der empathische, geduldige und verlässliche Digital-Guide der „Digital-Guide-Box“.\nDeine Mission ist es, Menschen im digitalen Alltag zu begleiten und ihnen die Scheu vor moderner Technologie zu nehmen – insbesondere bei Fragen zu Smartphones (Android & iPhone), Tablets, Windows/Mac, WhatsApp, E-Mails, Internetsicherheit, Online-Banking, Online-Diensten, Kundenkonten und digitalen Formularen.\n\nDeine Kommunikationsregeln:\n1. Freundlich, ermutigend und respektvoll im herzlichen „Du“.\n2. Vermeide technisches Fachchinesisch. Wenn Fachbegriffe unumgänglich sind (wie z. B. Cloud, Cache, 2-Faktor-Authentifizierung, Browserverlauf), erkläre sie sofort mit einem einfachen Alltagsvergleich.\n3. Strukturiere Handlungsanweisungen immer in klare, nummerierte Schritte (1., 2., 3.), sodass man sie leicht nachmachen kann.\n4. Höchste Wachsamkeit bei Sicherheit: Erinnere stets daran, niemals Passwörter, PINs oder TANs per Mail/Telefon weiterzugeben und bei verdächtigen Links oder Gewinnspielen vorsichtig zu sein.\n5. Empathie & Geduld: Es gibt keine dummen Fragen. Bestärke den Nutzer darin, Dinge in Ruhe auszuprobieren.\n6. Bei sehr kniffligen Problemen oder Geräte-Hardwaredefekten: Weise freundlich darauf hin, dass man dich in der Box auch direkt über die Kontaktkarte per Mail oder Telefon erreichen kann.\n7. Formatiere deine Antworten übersichtlich mit Absätzen, fetten Hervorhebungen und Listen.",
				'rate_limit_enabled'        => true,
				'rate_limit_requests'       => 10,
				'rate_limit_window_minutes' => 10,
				'max_input_length'          => 800,
				'max_output_tokens'         => 800,
				'strict_topic_filter'       => true,
				'off_topic_message'         => 'Als dein persönlicher Digital-Guide helfe ich dir sehr gerne bei allen Fragen rund um Smartphone, Tablet, Computer, Internet, E-Mail, WhatsApp und digitale Dienste. Fragen außerhalb dieses Themas kann ich leider nicht beantworten. Wie kann ich dich bei deinen Geräten oder digitalen Formularen unterstützen?',
			),
			'custom_news' => array(),
		);
	}

	public static function get_all() {
		$defaults = self::get_defaults();
		$stored   = get_option( self::OPTION_KEY, array() );

		if ( ! is_array( $stored ) ) {
			$stored = array();
		}

		$merged = array();
		foreach ( $defaults as $section => $sec_defaults ) {
			if ( 'custom_news' === $section ) {
				$merged['custom_news'] = isset( $stored['custom_news'] ) && is_array( $stored['custom_news'] ) ? $stored['custom_news'] : array();
				continue;
			}
			$sec_stored = isset( $stored[ $section ] ) && is_array( $stored[ $section ] ) ? $stored[ $section ] : array();
			$merged[ $section ] = wp_parse_args( $sec_stored, $sec_defaults );
		}

		if ( isset( $merged['access']['slug'] ) && 'digital-guide-box-v2' === $merged['access']['slug'] ) {
			$merged['access']['slug'] = 'digital-guide-box';
		}

		return $merged;
	}

	public static function get_section( $section ) {
		$all = self::get_all();
		return isset( $all[ $section ] ) ? $all[ $section ] : array();
	}

	public static function update_all( $new_settings ) {
		$sanitized = self::sanitize( $new_settings );
		return update_option( self::OPTION_KEY, $sanitized );
	}

	public static function sanitize( $input ) {
		$defaults = self::get_defaults();
		$clean    = array();

		// Access
		$clean['access']['password'] = ! empty( $input['access']['password'] )
			? sanitize_text_field( $input['access']['password'] )
			: $defaults['access']['password'];

		$duration = isset( $input['access']['session_duration'] ) ? absint( $input['access']['session_duration'] ) : 28800;
		if ( $duration < 3600 ) {
			$duration = 3600; // min 1 hour
		}
		$clean['access']['session_duration'] = $duration;

		$slug = ! empty( $input['access']['slug'] )
			? sanitize_title( $input['access']['slug'] )
			: $defaults['access']['slug'];
		if ( 'digital-guide-box-v2' === $slug ) {
			$slug = 'digital-guide-box';
		}
		$clean['access']['slug'] = $slug;

		$email = ! empty( $input['access']['notification_email'] )
			? sanitize_email( $input['access']['notification_email'] )
			: $defaults['access']['notification_email'];
		$clean['access']['notification_email'] = $email;

		// Gate
		$clean['gate']['principle'] = isset( $input['gate']['principle'] ) ? sanitize_text_field( $input['gate']['principle'] ) : $defaults['gate']['principle'];
		$clean['gate']['title']     = isset( $input['gate']['title'] ) ? sanitize_text_field( $input['gate']['title'] ) : $defaults['gate']['title'];
		$clean['gate']['subtitle']  = isset( $input['gate']['subtitle'] ) ? sanitize_textarea_field( $input['gate']['subtitle'] ) : $defaults['gate']['subtitle'];
		$clean['gate']['note']      = isset( $input['gate']['note'] ) ? sanitize_text_field( $input['gate']['note'] ) : $defaults['gate']['note'];
		$clean['gate']['home_url']  = isset( $input['gate']['home_url'] ) ? esc_url_raw( $input['gate']['home_url'] ) : $defaults['gate']['home_url'];
		$clean['gate']['imprint_url'] = isset( $input['gate']['imprint_url'] ) ? esc_url_raw( $input['gate']['imprint_url'] ) : $defaults['gate']['imprint_url'];

		// Profile
		$clean['profile']['name']           = isset( $input['profile']['name'] ) ? sanitize_text_field( $input['profile']['name'] ) : $defaults['profile']['name'];
		$clean['profile']['role']           = isset( $input['profile']['role'] ) ? sanitize_text_field( $input['profile']['role'] ) : $defaults['profile']['role'];
		$clean['profile']['avatar_url']     = isset( $input['profile']['avatar_url'] ) ? esc_url_raw( $input['profile']['avatar_url'] ) : '';
		$clean['profile']['email']          = isset( $input['profile']['email'] ) ? sanitize_email( $input['profile']['email'] ) : $defaults['profile']['email'];
		$clean['profile']['phone']          = isset( $input['profile']['phone'] ) ? sanitize_text_field( $input['profile']['phone'] ) : $defaults['profile']['phone'];
		$clean['profile']['emergency_note'] = isset( $input['profile']['emergency_note'] ) ? sanitize_text_field( $input['profile']['emergency_note'] ) : $defaults['profile']['emergency_note'];

		// WhatsApp
		$clean['whatsapp']['enabled']     = ! empty( $input['whatsapp']['enabled'] );
		$clean['whatsapp']['badge']       = isset( $input['whatsapp']['badge'] ) ? sanitize_text_field( $input['whatsapp']['badge'] ) : $defaults['whatsapp']['badge'];
		$clean['whatsapp']['title']       = isset( $input['whatsapp']['title'] ) ? sanitize_text_field( $input['whatsapp']['title'] ) : $defaults['whatsapp']['title'];
		$clean['whatsapp']['description'] = isset( $input['whatsapp']['description'] ) ? sanitize_textarea_field( $input['whatsapp']['description'] ) : $defaults['whatsapp']['description'];
		$clean['whatsapp']['url']         = isset( $input['whatsapp']['url'] ) ? esc_url_raw( $input['whatsapp']['url'] ) : $defaults['whatsapp']['url'];
		$clean['whatsapp']['footer_note'] = isset( $input['whatsapp']['footer_note'] ) ? sanitize_text_field( $input['whatsapp']['footer_note'] ) : $defaults['whatsapp']['footer_note'];

		// Gemini & Multi-Provider AI Settings
		$clean['gemini']['enabled']       = ! empty( $input['gemini']['enabled'] );
		$clean['gemini']['provider']      = in_array( $input['gemini']['provider'] ?? 'gemini', array( 'gemini', 'openai', 'mistral', 'groq', 'custom' ), true )
			? $input['gemini']['provider']
			: 'gemini';
		$clean['gemini']['api_key']       = isset( $input['gemini']['api_key'] ) ? trim( sanitize_text_field( $input['gemini']['api_key'] ) ) : '';
		$clean['gemini']['default_model'] = ! empty( $input['gemini']['default_model'] ) ? sanitize_text_field( $input['gemini']['default_model'] ) : 'gemini-2.5-flash';

		$clean['gemini']['openai_api_key']  = isset( $input['gemini']['openai_api_key'] ) ? trim( sanitize_text_field( $input['gemini']['openai_api_key'] ) ) : '';
		$clean['gemini']['openai_model']    = ! empty( $input['gemini']['openai_model'] ) ? sanitize_text_field( $input['gemini']['openai_model'] ) : 'gpt-4o-mini';

		$clean['gemini']['mistral_api_key'] = isset( $input['gemini']['mistral_api_key'] ) ? trim( sanitize_text_field( $input['gemini']['mistral_api_key'] ) ) : '';
		$clean['gemini']['mistral_model']   = ! empty( $input['gemini']['mistral_model'] ) ? sanitize_text_field( $input['gemini']['mistral_model'] ) : 'mistral-small-latest';

		$clean['gemini']['groq_api_key']    = isset( $input['gemini']['groq_api_key'] ) ? trim( sanitize_text_field( $input['gemini']['groq_api_key'] ) ) : '';
		$clean['gemini']['groq_model']      = ! empty( $input['gemini']['groq_model'] ) ? sanitize_text_field( $input['gemini']['groq_model'] ) : 'llama-3.3-70b-versatile';

		$clean['gemini']['custom_endpoint'] = isset( $input['gemini']['custom_endpoint'] ) ? esc_url_raw( trim( $input['gemini']['custom_endpoint'] ) ) : '';
		$clean['gemini']['custom_api_key']  = isset( $input['gemini']['custom_api_key'] ) ? trim( sanitize_text_field( $input['gemini']['custom_api_key'] ) ) : '';
		$clean['gemini']['custom_model']    = ! empty( $input['gemini']['custom_model'] ) ? sanitize_text_field( $input['gemini']['custom_model'] ) : 'llama3.2';

		$clean['gemini']['system_prompt']   = isset( $input['gemini']['system_prompt'] ) ? sanitize_textarea_field( $input['gemini']['system_prompt'] ) : $defaults['gemini']['system_prompt'];

		$clean['gemini']['rate_limit_enabled']        = ! empty( $input['gemini']['rate_limit_enabled'] );
		$clean['gemini']['rate_limit_requests']       = isset( $input['gemini']['rate_limit_requests'] ) ? max( 1, min( 100, intval( $input['gemini']['rate_limit_requests'] ) ) ) : 10;
		$clean['gemini']['rate_limit_window_minutes'] = isset( $input['gemini']['rate_limit_window_minutes'] ) ? max( 1, min( 1440, intval( $input['gemini']['rate_limit_window_minutes'] ) ) ) : 10;
		$clean['gemini']['max_input_length']          = isset( $input['gemini']['max_input_length'] ) ? max( 100, min( 5000, intval( $input['gemini']['max_input_length'] ) ) ) : 800;
		$clean['gemini']['max_output_tokens']         = isset( $input['gemini']['max_output_tokens'] ) ? max( 100, min( 4096, intval( $input['gemini']['max_output_tokens'] ) ) ) : 800;
		$clean['gemini']['strict_topic_filter']       = ! empty( $input['gemini']['strict_topic_filter'] );
		$clean['gemini']['off_topic_message']         = isset( $input['gemini']['off_topic_message'] ) ? sanitize_textarea_field( $input['gemini']['off_topic_message'] ) : $defaults['gemini']['off_topic_message'];

		// Custom News
		$clean['custom_news'] = array();
		if ( isset( $input['custom_news'] ) && is_array( $input['custom_news'] ) ) {
			foreach ( $input['custom_news'] as $item ) {
				if ( empty( $item['title'] ) ) {
					continue;
				}
				$clean['custom_news'][] = array(
					'id'              => ! empty( $item['id'] ) ? sanitize_key( $item['id'] ) : 'news-' . uniqid(),
					'title'           => sanitize_text_field( $item['title'] ),
					'category'        => ! empty( $item['category'] ) ? sanitize_text_field( $item['category'] ) : 'Geräte & Technik',
					'date'            => ! empty( $item['date'] ) ? sanitize_text_field( $item['date'] ) : current_time( 'Y-m-d' ),
					'dateLabel'       => ! empty( $item['dateLabel'] ) ? sanitize_text_field( $item['dateLabel'] ) : 'Aktuell',
					'relevance'       => sanitize_textarea_field( $item['relevance'] ?? '' ),
					'takeaway'        => sanitize_textarea_field( $item['takeaway'] ?? '' ),
					'tip'             => sanitize_textarea_field( $item['tip'] ?? '' ),
					'paragraphs'      => ! empty( $item['paragraphs'] ) ? array_map( 'sanitize_textarea_field', (array) $item['paragraphs'] ) : array(),
					'paragraphTitles' => ! empty( $item['paragraphTitles'] ) ? array_map( 'sanitize_text_field', (array) $item['paragraphTitles'] ) : array(),
					'guideIds'        => ! empty( $item['guideIds'] ) ? array_map( 'sanitize_key', (array) $item['guideIds'] ) : array(),
					'assessment'      => array(
						'relevance' => in_array( $item['assessment']['relevance'] ?? '', array( 'yes', 'no', 'conditional' ), true ) ? $item['assessment']['relevance'] : 'yes',
						'context'   => sanitize_text_field( $item['assessment']['context'] ?? '' ),
						'action'    => in_array( $item['assessment']['action'] ?? '', array( 'none', 'recommended', 'important' ), true ) ? $item['assessment']['action'] : 'none',
						'advice'    => sanitize_text_field( $item['assessment']['advice'] ?? '' ),
					),
				);
			}
		}

		return $clean;
	}
}
