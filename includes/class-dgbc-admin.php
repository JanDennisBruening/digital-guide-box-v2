<?php
/**
 * Admin Management Center for Digital Guide Box (Configurable Edition).
 * Full CRUD for Settings, Guides (Anleitungen) & News (Neuigkeiten).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class DGBC_Admin {

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'add_admin_menu' ) );
		add_action( 'admin_init', array( __CLASS__, 'handle_actions' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_admin_assets' ) );
	}

	public static function add_admin_menu() {
		add_menu_page(
			'Digital-Guide-Box',
			'Digital-Guide-Box',
			'manage_options',
			'digital-guide-box-v2',
			array( __CLASS__, 'render_admin_page' ),
			'dashicons-welcome-learn-more',
			31
		);
	}

	public static function enqueue_admin_assets( $hook ) {
		if ( false === strpos( $hook, 'digital-guide-box-v2' ) ) {
			return;
		}
		wp_enqueue_media();
	}

	public static function handle_actions() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		// 1. Save General Settings
		if ( isset( $_POST['dgbc_save_settings'] ) ) {
			check_admin_referer( 'dgbc_settings_nonce_action', 'dgbc_settings_nonce' );
			$current = DGBC_Settings::get_all();
			$tab     = sanitize_key( $_POST['dgbc_current_tab'] ?? 'access' );

			if ( 'access' === $tab && isset( $_POST['access'] ) ) {
				$current['access'] = array_merge( $current['access'], (array) $_POST['access'] );
			} elseif ( 'gate' === $tab && isset( $_POST['gate'] ) ) {
				$current['gate'] = array_merge( $current['gate'], (array) $_POST['gate'] );
			} elseif ( 'profile' === $tab && isset( $_POST['profile'] ) ) {
				$current['profile'] = array_merge( $current['profile'], (array) $_POST['profile'] );
			} elseif ( 'whatsapp' === $tab && isset( $_POST['whatsapp'] ) ) {
				$wa_input = (array) $_POST['whatsapp'];
				$wa_input['enabled'] = ! empty( $_POST['whatsapp']['enabled'] );
				$current['whatsapp'] = array_merge( $current['whatsapp'], $wa_input );
			} elseif ( 'gemini' === $tab && isset( $_POST['gemini'] ) ) {
				$gem_input = (array) $_POST['gemini'];
				$gem_input['enabled']             = ! empty( $_POST['gemini']['enabled'] );
				$gem_input['rate_limit_enabled']  = ! empty( $_POST['gemini']['rate_limit_enabled'] );
				$gem_input['strict_topic_filter'] = ! empty( $_POST['gemini']['strict_topic_filter'] );
				$current['gemini'] = array_merge( $current['gemini'] ?? array(), $gem_input );
			}

			DGBC_Settings::update_all( $current );
			DGBC_Router::add_rewrite_rules();
			flush_rewrite_rules();

			wp_safe_redirect( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => $tab, 'settings-updated' => 'true' ), admin_url( 'admin.php' ) ) );
			exit;
		}

		// 2. Save Guide (Create or Edit)
		if ( isset( $_POST['dgbc_save_guide'] ) ) {
			check_admin_referer( 'dgbc_guide_nonce_action', 'dgbc_guide_nonce' );

			$raw_id = sanitize_key( $_POST['guide_id'] ?? '' );
			if ( empty( $raw_id ) ) {
				$raw_id = sanitize_title( $_POST['guide_title'] ?? 'anleitung' );
				if ( empty( $raw_id ) ) {
					$raw_id = 'anleitung-' . uniqid();
				}
			}

			// Preparation steps: split by lines
			$prep_raw = sanitize_textarea_field( $_POST['guide_prep'] ?? '' );
			$prep_lines = array_values( array_filter( array_map( 'trim', explode( "\n", str_replace( "\r", '', $prep_raw ) ) ) ) );

			// Dynamic steps
			$steps = array();
			if ( isset( $_POST['steps'] ) && is_array( $_POST['steps'] ) ) {
				foreach ( $_POST['steps'] as $s ) {
					$s_title = sanitize_text_field( $s['title'] ?? '' );
					$s_text  = sanitize_textarea_field( $s['text'] ?? '' );
					$s_check = sanitize_text_field( $s['check'] ?? '' );
					$s_icon  = sanitize_key( $s['icon'] ?? 'check' );
					if ( ! empty( $s_title ) || ! empty( $s_text ) ) {
						$steps[] = array(
							'title' => $s_title,
							'text'  => $s_text,
							'check' => $s_check,
							'icon'  => $s_icon,
						);
					}
				}
			}

			// Sources
			$sources = array();
			if ( ! empty( $_POST['guide_source_title'] ) ) {
				$sources[] = array(
					'title' => sanitize_text_field( $_POST['guide_source_title'] ),
					'url'   => esc_url_raw( $_POST['guide_source_url'] ?? '' ),
				);
			}

			$guide_item = array(
				'id'        => $raw_id,
				'title'     => sanitize_text_field( $_POST['guide_title'] ?? '' ),
				'subtitle'  => sanitize_text_field( $_POST['guide_subtitle'] ?? '' ),
				'category'  => sanitize_text_field( $_POST['guide_category'] ?? 'Alltag' ),
				'theme'     => sanitize_key( $_POST['guide_theme'] ?? 'blau' ),
				'minutes'   => absint( $_POST['guide_minutes'] ?? 3 ),
				'updatedAt' => sanitize_text_field( $_POST['guide_updated_at'] ?? current_time( 'Y-m-d' ) ),
				'scope'     => sanitize_text_field( $_POST['guide_scope'] ?? 'Für Android und iPhone' ),
				'learning'  => array(
					'kind'        => 'step',
					'why'         => sanitize_textarea_field( $_POST['guide_why'] ?? '' ),
					'preparation' => $prep_lines,
				),
				'steps'     => $steps,
				'tip'       => sanitize_textarea_field( $_POST['guide_tip'] ?? '' ),
				'sources'   => $sources,
			);

			DGBC_Content::save_guide( $guide_item );

			wp_safe_redirect( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'guides', 'guide-saved' => 'true' ), admin_url( 'admin.php' ) ) );
			exit;
		}

		// 3. Delete Guide
		if ( isset( $_GET['dgbc_delete_guide'] ) ) {
			check_admin_referer( 'dgbc_delete_guide_action' );
			$del_id = sanitize_key( $_GET['dgbc_delete_guide'] );
			DGBC_Content::delete_guide( $del_id );

			wp_safe_redirect( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'guides', 'guide-deleted' => 'true' ), admin_url( 'admin.php' ) ) );
			exit;
		}

		// 4. Reset Guides to Defaults
		if ( isset( $_POST['dgbc_reset_guides'] ) ) {
			check_admin_referer( 'dgbc_reset_guides_action', 'dgbc_reset_guides_nonce' );
			DGBC_Content::reset_guides();

			wp_safe_redirect( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'guides', 'guides-reset' => 'true' ), admin_url( 'admin.php' ) ) );
			exit;
		}

		// 5. Save News (Create or Edit)
		if ( isset( $_POST['dgbc_save_news'] ) ) {
			check_admin_referer( 'dgbc_news_nonce_action', 'dgbc_news_nonce' );

			$raw_id = sanitize_key( $_POST['news_id'] ?? '' );
			if ( empty( $raw_id ) ) {
				$raw_id = sanitize_title( $_POST['news_title'] ?? 'neuigkeit' );
				if ( empty( $raw_id ) ) {
					$raw_id = 'news-' . uniqid();
				}
			}

			// Dynamic Paragraphs
			$paragraphs       = array();
			$paragraph_titles = array();
			if ( isset( $_POST['paragraphs'] ) && is_array( $_POST['paragraphs'] ) ) {
				foreach ( $_POST['paragraphs'] as $p ) {
					$p_title = sanitize_text_field( $p['title'] ?? '' );
					$p_text  = sanitize_textarea_field( $p['text'] ?? '' );
					if ( ! empty( $p_text ) ) {
						$paragraphs[]       = $p_text;
						$paragraph_titles[] = ! empty( $p_title ) ? $p_title : 'Details';
					}
				}
			}

			// Sources
			$sources = array();
			if ( ! empty( $_POST['news_source_title'] ) ) {
				$sources[] = array(
					'title' => sanitize_text_field( $_POST['news_source_title'] ),
					'url'   => esc_url_raw( $_POST['news_source_url'] ?? '' ),
				);
			}

			$news_item = array(
				'id'              => $raw_id,
				'title'           => sanitize_text_field( $_POST['news_title'] ?? '' ),
				'category'        => sanitize_text_field( $_POST['news_category'] ?? 'Geräte & Technik' ),
				'date'            => sanitize_text_field( $_POST['news_date'] ?? current_time( 'Y-m-d' ) ),
				'dateLabel'       => sanitize_text_field( $_POST['news_datelabel'] ?? 'Aktuell' ),
				'relevance'       => sanitize_textarea_field( $_POST['news_relevance'] ?? '' ),
				'takeaway'        => sanitize_textarea_field( $_POST['news_takeaway'] ?? '' ),
				'tip'             => sanitize_textarea_field( $_POST['news_tip'] ?? '' ),
				'checkedAt'       => sanitize_text_field( $_POST['news_date'] ?? current_time( 'Y-m-d' ) ),
				'paragraphTitles' => $paragraph_titles,
				'paragraphs'      => $paragraphs,
				'assessment'      => array(
					'relevance' => sanitize_key( $_POST['news_assess_rel'] ?? 'yes' ),
					'context'   => sanitize_text_field( $_POST['news_assess_ctx'] ?? '' ),
					'action'    => sanitize_key( $_POST['news_assess_act'] ?? 'none' ),
					'advice'    => sanitize_text_field( $_POST['news_assess_adv'] ?? '' ),
				),
				'sources'         => $sources,
			);

			DGBC_Content::save_news_item( $news_item );

			wp_safe_redirect( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news', 'news-saved' => 'true' ), admin_url( 'admin.php' ) ) );
			exit;
		}

		// 6. Delete News
		if ( isset( $_GET['dgbc_delete_news'] ) ) {
			check_admin_referer( 'dgbc_delete_news_action' );
			$del_id = sanitize_key( $_GET['dgbc_delete_news'] );
			DGBC_Content::delete_news_item( $del_id );

			wp_safe_redirect( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news', 'news-deleted' => 'true' ), admin_url( 'admin.php' ) ) );
			exit;
		}

		// 7. Reset News to Defaults
		if ( isset( $_POST['dgbc_reset_news'] ) ) {
			check_admin_referer( 'dgbc_reset_news_action', 'dgbc_reset_news_nonce' );
			DGBC_Content::reset_news();

			wp_safe_redirect( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news', 'news-reset' => 'true' ), admin_url( 'admin.php' ) ) );
			exit;
		}

		// 8. Delete Inquiry
		if ( isset( $_GET['dgbc_delete_inquiry'] ) ) {
			check_admin_referer( 'dgbc_delete_inquiry_action' );
			$del_id    = sanitize_text_field( $_GET['dgbc_delete_inquiry'] );
			$inquiries = get_option( DGBC_Inquiries::OPTION_KEY, array() );
			$inquiries = array_values( array_filter( $inquiries, function( $inq ) use ( $del_id ) {
				return ( ( $inq['id'] ?? '' ) !== $del_id );
			} ) );
			update_option( DGBC_Inquiries::OPTION_KEY, $inquiries );

			wp_safe_redirect( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'inbox', 'inquiry-deleted' => 'true' ), admin_url( 'admin.php' ) ) );
			exit;
		}
	}

	public static function render_admin_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$settings   = DGBC_Settings::get_all();
		$box_url    = DGBC_Router::get_box_url();
		$active_tab = isset( $_GET['tab'] ) ? sanitize_key( $_GET['tab'] ) : 'access';
		$all_guides = DGBC_Content::get_guides();
		$all_news   = DGBC_Content::get_news();

		$tabs = array(
			'access'   => '🔑 Zugang & Links',
			'gate'     => '🚪 Eingangstor / Begrüßung',
			'profile'  => '👤 Profil & Beraterkontakt',
			'whatsapp' => '💬 WhatsApp-Kanal',
			'gemini'   => '🤖 KI-Assistent & Anbieter',
			'guides'   => '📖 Anleitungen (' . count( $all_guides ) . ')',
			'news'     => '📰 Neuigkeiten (' . count( $all_news ) . ')',
			'inbox'    => '📥 Posteingang',
		);
		?>
		<div class="wrap" style="max-width: 1100px;">
			<h1 style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
				<span class="dashicons dashicons-welcome-learn-more" style="font-size:32px;width:32px;height:32px;color:#164781;"></span>
				Digital-Guide-Box <span style="font-size:16px;background:#e5effb;color:#164781;padding:3px 10px;border-radius:12px;font-weight:600;">v<?php echo esc_html( DGBC_VERSION ); ?></span>
			</h1>
			<p style="font-size:15px;color:#555;margin-bottom:20px;">
				Verwalte alle Inhalte, Texte, Anleitungen, Neuigkeiten und Einstellungen deiner Digital-Guide-Box flexibel im WordPress-Backend.
			</p>

			<?php if ( isset( $_GET['settings-updated'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Einstellungen erfolgreich gespeichert.</strong></p></div>
			<?php elseif ( isset( $_GET['guide-saved'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Anleitung erfolgreich gespeichert.</strong></p></div>
			<?php elseif ( isset( $_GET['guide-deleted'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Anleitung gelöscht.</strong></p></div>
			<?php elseif ( isset( $_GET['guides-reset'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Alle Anleitungen wurden auf den Standardwert zurückgesetzt.</strong></p></div>
			<?php elseif ( isset( $_GET['news-saved'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Beitrag erfolgreich gespeichert.</strong></p></div>
			<?php elseif ( isset( $_GET['news-deleted'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Beitrag gelöscht.</strong></p></div>
			<?php elseif ( isset( $_GET['news-reset'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Alle Neuigkeiten wurden auf den Standardwert zurückgesetzt.</strong></p></div>
			<?php elseif ( isset( $_GET['inquiry-deleted'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Anfrage aus dem Posteingang gelöscht.</strong></p></div>
			<?php endif; ?>

			<!-- Quick Link Card -->
			<div style="background:#fff;border-left:4px solid #164781;box-shadow:0 1px 3px rgba(0,0,0,0.08);padding:16px 20px;border-radius:4px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:15px;">
				<div>
					<strong style="font-size:15px;color:#164781;display:block;">🔗 Direktlink zu deiner Digital-Guide-Box</strong>
					<span style="font-size:13px;color:#666;">Diesen Link erhalten Käuferinnen und Käufer nach dem Kauf:</span>
				</div>
				<div style="display:flex;gap:8px;align-items:center;">
					<input type="text" readonly value="<?php echo esc_url( $box_url ); ?>" id="dgbc-box-link" style="width:320px;font-size:14px;background:#f7f9fd;border:1px solid #ccd0d4;padding:6px 10px;border-radius:4px;" />
					<button type="button" class="button button-primary" onclick="navigator.clipboard.writeText(document.getElementById('dgbc-box-link').value);alert('Link kopiert!');">
						Link kopieren
					</button>
					<a href="<?php echo esc_url( $box_url ); ?>" target="_blank" class="button button-secondary">
						Öffnen ↗
					</a>
				</div>
			</div>

			<!-- Tab Navigation -->
			<nav class="nav-tab-wrapper" style="margin-bottom:20px;">
				<?php foreach ( $tabs as $tab_key => $tab_name ) : ?>
					<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => $tab_key ), admin_url( 'admin.php' ) ) ); ?>" class="nav-tab <?php echo $active_tab === $tab_key ? 'nav-tab-active' : ''; ?>">
						<?php echo esc_html( $tab_name ); ?>
					</a>
				<?php endforeach; ?>
			</nav>

			<!-- Tab Contents -->
			<div style="background:#fff;padding:25px 30px;border-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

				<!-- 1. TAB: ACCESS -->
				<?php if ( 'access' === $active_tab ) : ?>
					<form method="post" action="">
						<?php wp_nonce_field( 'dgbc_settings_nonce_action', 'dgbc_settings_nonce' ); ?>
						<input type="hidden" name="dgbc_current_tab" value="access" />
						<h2 style="margin-top:0;font-size:18px;border-bottom:1px solid #eee;padding-bottom:10px;">Zugang &amp; Sicherheit</h2>
						<table class="form-table" role="presentation">
							<tr>
								<th scope="row"><label for="dgbc_pw">Zugangspasswort</label></th>
								<td>
									<input name="access[password]" type="text" id="dgbc_pw" value="<?php echo esc_attr( $settings['access']['password'] ); ?>" class="regular-text" required />
									<p class="description">Standard: <code>digitalguidejan</code>. Dieses Passwort schützt den Eingang zur Box.</p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="dgbc_duration">Sitzungsdauer nach Freischaltung</label></th>
								<td>
									<select name="access[session_duration]" id="dgbc_duration">
										<option value="28800" <?php selected( $settings['access']['session_duration'], 28800 ); ?>>8 Stunden (Standard)</option>
										<option value="86400" <?php selected( $settings['access']['session_duration'], 86400 ); ?>>24 Stunden</option>
										<option value="604800" <?php selected( $settings['access']['session_duration'], 604800 ); ?>>7 Tage</option>
										<option value="2592000" <?php selected( $settings['access']['session_duration'], 2592000 ); ?>>30 Tage</option>
									</select>
									<p class="description">Wie lange bleibt die Box auf dem Gerät geöffnet, ohne dass das Passwort erneut eingegeben werden muss.</p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="dgbc_slug">URL-Pfad (Slug)</label></th>
								<td>
									<code><?php echo esc_html( home_url( '/' ) ); ?></code>
									<input name="access[slug]" type="text" id="dgbc_slug" value="<?php echo esc_attr( $settings['access']['slug'] ); ?>" class="regular-text" style="width:220px;" required />
									<code>/</code>
									<p class="description">Standard: <code>digital-guide-box</code>. Kann frei angepasst werden (z. B. <code>ratgeber-box</code>).</p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="dgbc_email">E-Mail für Benachrichtigungen</label></th>
								<td>
									<input name="access[notification_email]" type="email" id="dgbc_email" value="<?php echo esc_attr( $settings['access']['notification_email'] ); ?>" class="regular-text" required />
									<p class="description">An diese E-Mail-Adresse werden Supportanfragen und Feedback weitergeleitet.</p>
								</td>
							</tr>
							<tr>
								<th scope="row">Shortcode</th>
								<td>
									<code>[digital_guide_box]</code>
									<p class="description">Zur Einbindung in Standardseiten, Block-Editor oder Elementor.</p>
								</td>
							</tr>
						</table>
						<p class="submit">
							<input type="submit" name="dgbc_save_settings" class="button button-primary" value="Zugangsdaten speichern" />
						</p>
					</form>

				<!-- 2. TAB: GATE -->
				<?php elseif ( 'gate' === $active_tab ) : ?>
					<form method="post" action="">
						<?php wp_nonce_field( 'dgbc_settings_nonce_action', 'dgbc_settings_nonce' ); ?>
						<input type="hidden" name="dgbc_current_tab" value="gate" />
						<h2 style="margin-top:0;font-size:18px;border-bottom:1px solid #eee;padding-bottom:10px;">Eingangstor &amp; Willkommenstexte</h2>
						<table class="form-table" role="presentation">
							<tr>
								<th scope="row"><label for="gate_principle">Leitspruch (oben)</label></th>
								<td>
									<input name="gate[principle]" type="text" id="gate_principle" value="<?php echo esc_attr( $settings['gate']['principle'] ); ?>" class="large-text" />
									<p class="description">Standard: <code>Nachlesen · Verstehen · Anwenden</code></p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="gate_title">Hauptüberschrift (H1)</label></th>
								<td>
									<input name="gate[title]" type="text" id="gate_title" value="<?php echo esc_attr( $settings['gate']['title'] ); ?>" class="large-text" />
									<p class="description">Standard: <code>Schön, dass du da bist.</code></p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="gate_subtitle">Begrüßungstext</label></th>
								<td>
									<textarea name="gate[subtitle]" id="gate_subtitle" rows="3" class="large-text"><?php echo esc_textarea( $settings['gate']['subtitle'] ); ?></textarea>
									<p class="description">Erscheint direkt unter der Hauptüberschrift.</p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="gate_note">Hinweis unter dem Button</label></th>
								<td>
									<input name="gate[note]" type="text" id="gate_note" value="<?php echo esc_attr( $settings['gate']['note'] ); ?>" class="large-text" />
									<p class="description">Standard: <code>Dein Zugang bleibt für acht Stunden geöffnet.</code></p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="gate_home">Link „Zurück zur Startseite“</label></th>
								<td>
									<input name="gate[home_url]" type="url" id="gate_home" value="<?php echo esc_attr( $settings['gate']['home_url'] ); ?>" class="regular-text" />
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="gate_imprint">Link „Impressum“</label></th>
								<td>
									<input name="gate[imprint_url]" type="url" id="gate_imprint" value="<?php echo esc_attr( $settings['gate']['imprint_url'] ); ?>" class="regular-text" />
								</td>
							</tr>
						</table>
						<p class="submit">
							<input type="submit" name="dgbc_save_settings" class="button button-primary" value="Texte speichern" />
						</p>
					</form>

				<!-- 3. TAB: PROFILE -->
				<?php elseif ( 'profile' === $active_tab ) : ?>
					<form method="post" action="">
						<?php wp_nonce_field( 'dgbc_settings_nonce_action', 'dgbc_settings_nonce' ); ?>
						<input type="hidden" name="dgbc_current_tab" value="profile" />
						<h2 style="margin-top:0;font-size:18px;border-bottom:1px solid #eee;padding-bottom:10px;">Beraterprofil &amp; Kontaktleiste</h2>
						<table class="form-table" role="presentation">
							<tr>
								<th scope="row"><label for="profile_name">Name des Beraters</label></th>
								<td>
									<input name="profile[name]" type="text" id="profile_name" value="<?php echo esc_attr( $settings['profile']['name'] ); ?>" class="regular-text" />
									<p class="description">Standard: <code>Jan Dennis Brüning</code></p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="profile_role">Bezeichnung / Rolle</label></th>
								<td>
									<input name="profile[role]" type="text" id="profile_role" value="<?php echo esc_attr( $settings['profile']['role'] ); ?>" class="regular-text" />
									<p class="description">Standard: <code>Dein persönlicher Digitalguide</code></p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="profile_avatar">Profilbild (Mediathek)</label></th>
								<td>
									<div style="display:flex;align-items:center;gap:15px;margin-bottom:8px;">
										<img id="dgbc_avatar_preview" src="<?php echo esc_url( ! empty( $settings['profile']['avatar_url'] ) ? $settings['profile']['avatar_url'] : DGBC_URL . 'assets/profilbild.png' ); ?>" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid #ccd0d4;" alt="" />
										<div>
											<input type="hidden" name="profile[avatar_url]" id="profile_avatar" value="<?php echo esc_attr( $settings['profile']['avatar_url'] ); ?>" />
											<button type="button" class="button" id="dgbc_upload_avatar_btn">
												📷 Bild aus Mediathek wählen
											</button>
											<button type="button" class="button" onclick="document.getElementById('profile_avatar').value='';document.getElementById('dgbc_avatar_preview').src='<?php echo esc_url( DGBC_URL . 'assets/profilbild.png' ); ?>';">
												Standard wiederherstellen
											</button>
										</div>
									</div>
									<p class="description">Wähle direkt ein Foto aus deiner WordPress-Mediathek aus. Empfohlen: Quadratisches Portraitbild (z. B. 256×256 px).</p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="profile_email">E-Mail-Adresse für Anfragen</label></th>
								<td>
									<input name="profile[email]" type="email" id="profile_email" value="<?php echo esc_attr( $settings['profile']['email'] ); ?>" class="regular-text" />
									<p class="description">Erscheint in der Notfall-Kontaktkarte.</p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="profile_phone">Telefonnummer für Direktanruf</label></th>
								<td>
									<input name="profile[phone]" type="text" id="profile_phone" value="<?php echo esc_attr( $settings['profile']['phone'] ); ?>" class="regular-text" />
									<p class="description">z. B. <code>+49 1520 2553087</code></p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="profile_note">Hinweis im Kontaktbereich</label></th>
								<td>
									<input name="profile[emergency_note]" type="text" id="profile_note" value="<?php echo esc_attr( $settings['profile']['emergency_note'] ); ?>" class="large-text" />
									<p class="description">Standard: <code>Wenn du allein nicht weiterkommst, bin ich für dich da.</code></p>
								</td>
							</tr>
						</table>

						<script>
						jQuery(document).ready(function($) {
							var file_frame;
							$('#dgbc_upload_avatar_btn').on('click', function(e) {
								e.preventDefault();
								if (file_frame) {
									file_frame.open();
									return;
								}
								file_frame = wp.media({
									title: 'Profilbild für Digital-Guide-Box auswählen',
									button: { text: 'Als Profilbild verwenden' },
									multiple: false
								});
								file_frame.on('select', function() {
									var attachment = file_frame.state().get('selection').first().toJSON();
									$('#profile_avatar').val(attachment.url);
									$('#dgbc_avatar_preview').attr('src', attachment.url);
								});
								file_frame.open();
							});
						});
						</script>

						<p class="submit">
							<input type="submit" name="dgbc_save_settings" class="button button-primary" value="Profil speichern" />
						</p>
					</form>

				<!-- 4. TAB: WHATSAPP -->
				<?php elseif ( 'whatsapp' === $active_tab ) : ?>
					<form method="post" action="">
						<?php wp_nonce_field( 'dgbc_settings_nonce_action', 'dgbc_settings_nonce' ); ?>
						<input type="hidden" name="dgbc_current_tab" value="whatsapp" />
						<h2 style="margin-top:0;font-size:18px;border-bottom:1px solid #eee;padding-bottom:10px;">WhatsApp-Kanal Integration</h2>
						<table class="form-table" role="presentation">
							<tr>
								<th scope="row">Kanal-Box anzeigen</th>
								<td>
									<label>
										<input type="checkbox" name="whatsapp[enabled]" value="1" <?php checked( $settings['whatsapp']['enabled'] ); ?> />
										<strong>WhatsApp-Kanal in der rechten Seitenleiste einblenden</strong>
									</label>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="wa_badge">Plakette / Badge-Text</label></th>
								<td>
									<input name="whatsapp[badge]" type="text" id="wa_badge" value="<?php echo esc_attr( $settings['whatsapp']['badge'] ); ?>" class="large-text" />
									<p class="description">Standard: <code>Direkt auf dem Smartphone immer dabei</code></p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="wa_title">Überschrift</label></th>
								<td>
									<input name="whatsapp[title]" type="text" id="wa_title" value="<?php echo esc_attr( $settings['whatsapp']['title'] ); ?>" class="large-text" />
									<p class="description">Standard: <code>Neu: WhatsApp-Kanal</code></p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="wa_desc">Beschreibungstext</label></th>
								<td>
									<textarea name="whatsapp[description]" id="wa_desc" rows="3" class="large-text"><?php echo esc_textarea( $settings['whatsapp']['description'] ); ?></textarea>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="wa_url">WhatsApp-Kanal Einladungslink</label></th>
								<td>
									<input name="whatsapp[url]" type="url" id="wa_url" value="<?php echo esc_attr( $settings['whatsapp']['url'] ); ?>" class="large-text" />
									<p class="description">z. B. <code>https://whatsapp.com/channel/0029VbBej87KAwEt5x4IYN03</code></p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="wa_foot">Hinweis unter dem Button</label></th>
								<td>
									<input name="whatsapp[footer_note]" type="text" id="wa_foot" value="<?php echo esc_attr( $settings['whatsapp']['footer_note'] ); ?>" class="large-text" />
									<p class="description">Standard: <code>Kostenlos abonnieren. In Ruhe mitlesen.</code></p>
								</td>
							</tr>
						</table>
						<p class="submit">
							<input type="submit" name="dgbc_save_settings" class="button button-primary" value="WhatsApp-Einstellungen speichern" />
						</p>
					</form>

				<!-- 5. TAB: MULTI-PROVIDER AI ASSISTANT -->
				<?php elseif ( 'gemini' === $active_tab ) : 
					$ai_cfg       = $settings['gemini'] ?? DGBC_Settings::get_defaults()['gemini'];
					$cur_provider = ! empty( $ai_cfg['provider'] ) ? $ai_cfg['provider'] : 'gemini';

					$has_gemini_key  = ! empty( $ai_cfg['api_key'] );
					$has_openai_key  = ! empty( $ai_cfg['openai_api_key'] );
					$has_mistral_key = ! empty( $ai_cfg['mistral_api_key'] );
					$has_groq_key    = ! empty( $ai_cfg['groq_api_key'] );
					$has_custom_ep   = ! empty( $ai_cfg['custom_endpoint'] );
				?>
					<form method="post" action="">
						<?php wp_nonce_field( 'dgbc_settings_nonce_action', 'dgbc_settings_nonce' ); ?>
						<input type="hidden" name="dgbc_current_tab" value="gemini" />
						<h2 style="margin-top:0;font-size:18px;border-bottom:1px solid #eee;padding-bottom:10px;">🤖 KI-Assistent &amp; Modellauswahl</h2>
						<p style="color:#555;">Der integrierte KI-Assistent steht deinen Nutzerinnen und Nutzern in der Digital-Guide-Box geduldig zur Seite. Wähle hier flexibel deinen bevorzugten KI-Dienst – von Google Gemini über europäische DSGVO-Anbieter (Mistral AI) bis hin zu einem selbstgehosteten Server (Ollama).</p>

						<table class="form-table" role="presentation">
							<tr>
								<th scope="row">KI-Assistent aktivieren</th>
								<td>
									<label>
										<input type="checkbox" name="gemini[enabled]" value="1" <?php checked( ! empty( $ai_cfg['enabled'] ) ); ?> />
										<strong>KI-Assistent in der Digital-Guide-Box verfügbar machen</strong>
									</label>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="ai_provider">KI-Anbieter / Dienst</label></th>
								<td>
									<select name="gemini[provider]" id="ai_provider" style="font-size:14px;padding:6px 12px;width:380px;" onchange="switchAiProvider(this.value)">
										<option value="gemini" <?php selected( $cur_provider, 'gemini' ); ?>>🔵 Google Gemini (Standard · Schnell &amp; kostenlos)</option>
										<option value="openai" <?php selected( $cur_provider, 'openai' ); ?>>🟢 OpenAI (ChatGPT · GPT-4o-mini / GPT-4o)</option>
										<option value="mistral" <?php selected( $cur_provider, 'mistral' ); ?>>🇫🇷 Mistral AI (EU / Paris · 100% DSGVO-konform)</option>
										<option value="groq" <?php selected( $cur_provider, 'groq' ); ?>>⚡ Groq (Ultra-schnell · Open-Source Llama 3.3)</option>
										<option value="custom" <?php selected( $cur_provider, 'custom' ); ?>>🖥️ Eigener Server / Ollama (Self-Hosted)</option>
									</select>
									<p class="description">Du kannst den Anbieter jederzeit wechseln, ohne dass deine Einstellungen bei den anderen Anbietern verloren gehen.</p>
								</td>
							</tr>
						</table>

						<!-- 1. GOOGLE GEMINI FIELDS -->
						<div id="ai_section_gemini" class="ai-provider-section" style="<?php echo 'gemini' === $cur_provider ? '' : 'display:none;'; ?>background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:16px 20px;margin-bottom:20px;">
							<h3 style="margin-top:0;font-size:15px;color:#164781;">🔵 Google Gemini Konfiguration</h3>
							<div style="background: <?php echo $has_gemini_key ? '#f0fdf4' : '#fffbeb'; ?>; border-left: 4px solid <?php echo $has_gemini_key ? '#22c55e' : '#f59e0b'; ?>; padding: 10px 14px; border-radius: 4px; margin-bottom: 14px;">
								<?php if ( $has_gemini_key ) : ?>
									<strong style="color:#166534;display:block;">✓ Google Gemini API-Schlüssel ist hinterlegt.</strong>
								<?php else : ?>
									<strong style="color:#92400e;display:block;">⚠️ Noch kein Gemini API-Schlüssel hinterlegt</strong>
									<span style="font-size:13px;color:#b45309;">Kostenlosen Schlüssel erstellen in <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color:#1d4ed8;font-weight:600;">Google AI Studio ↗</a>.</span>
								<?php endif; ?>
							</div>
							<table class="form-table" style="margin:0;">
								<tr>
									<th style="width:180px;"><label for="gemini_api_key">Gemini API-Schlüssel</label></th>
									<td>
										<input name="gemini[api_key]" type="password" id="gemini_api_key" value="<?php echo esc_attr( $ai_cfg['api_key'] ?? '' ); ?>" class="large-text" placeholder="AIzaSy..." />
										<button type="button" class="button button-secondary" style="margin-top:4px;" onclick="const f=document.getElementById('gemini_api_key'); f.type = f.type === 'password' ? 'text' : 'password';">Anzeigen / Verbergen</button>
									</td>
								</tr>
								<tr>
									<th><label for="gemini_default_model">Gemini Modell</label></th>
									<td>
										<select name="gemini[default_model]" id="gemini_default_model">
											<option value="gemini-2.0-flash" <?php selected( ( in_array( $ai_cfg['default_model'] ?? '', array( 'gemini-2.5-flash', 'gemini-2.0-flash', '' ), true ) ? 'gemini-2.0-flash' : $ai_cfg['default_model'] ), 'gemini-2.0-flash' ); ?>>Gemini 2.0 Flash (Empfohlen – blitzschnell, präzise &amp; kostenlos)</option>
											<option value="gemini-1.5-flash" <?php selected( ( $ai_cfg['default_model'] ?? '' ), 'gemini-1.5-flash' ); ?>>Gemini 1.5 Flash (Bewährtes Standard-Modell)</option>
											<option value="gemini-1.5-pro" <?php selected( ( in_array( $ai_cfg['default_model'] ?? '', array( 'gemini-2.5-pro', 'gemini-1.5-pro' ), true ) ? 'gemini-1.5-pro' : $ai_cfg['default_model'] ), 'gemini-1.5-pro' ); ?>>Gemini 1.5 Pro (Für besonders anspruchsvolle Aufgaben)</option>
											<option value="gemini-2.0-flash-lite" <?php selected( ( $ai_cfg['default_model'] ?? '' ), 'gemini-2.0-flash-lite' ); ?>>Gemini 2.0 Flash Lite (Sehr schnelle Reaktionszeit)</option>
										</select>
									</td>
								</tr>
							</table>
						</div>

						<!-- 2. OPENAI FIELDS -->
						<div id="ai_section_openai" class="ai-provider-section" style="<?php echo 'openai' === $cur_provider ? '' : 'display:none;'; ?>background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:16px 20px;margin-bottom:20px;">
							<h3 style="margin-top:0;font-size:15px;color:#164781;">🟢 OpenAI (ChatGPT) Konfiguration</h3>
							<div style="background: <?php echo $has_openai_key ? '#f0fdf4' : '#fffbeb'; ?>; border-left: 4px solid <?php echo $has_openai_key ? '#22c55e' : '#f59e0b'; ?>; padding: 10px 14px; border-radius: 4px; margin-bottom: 14px;">
								<?php if ( $has_openai_key ) : ?>
									<strong style="color:#166534;display:block;">✓ OpenAI API-Schlüssel ist hinterlegt.</strong>
								<?php else : ?>
									<strong style="color:#92400e;display:block;">⚠️ Noch kein OpenAI API-Schlüssel hinterlegt</strong>
									<span style="font-size:13px;color:#b45309;">API-Schlüssel erstellen unter <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style="color:#1d4ed8;font-weight:600;">platform.openai.com ↗</a>.</span>
								<?php endif; ?>
							</div>
							<table class="form-table" style="margin:0;">
								<tr>
									<th style="width:180px;"><label for="openai_api_key">OpenAI API-Schlüssel</label></th>
									<td>
										<input name="gemini[openai_api_key]" type="password" id="openai_api_key" value="<?php echo esc_attr( $ai_cfg['openai_api_key'] ?? '' ); ?>" class="large-text" placeholder="sk-..." />
										<button type="button" class="button button-secondary" style="margin-top:4px;" onclick="const f=document.getElementById('openai_api_key'); f.type = f.type === 'password' ? 'text' : 'password';">Anzeigen / Verbergen</button>
									</td>
								</tr>
								<tr>
									<th><label for="openai_model">OpenAI Modell</label></th>
									<td>
										<select name="gemini[openai_model]" id="openai_model">
											<option value="gpt-4o-mini" <?php selected( ( $ai_cfg['openai_model'] ?? '' ), 'gpt-4o-mini' ); ?>>GPT-4o-mini (Empfohlen – extrem günstig, schnell &amp; verlässlich)</option>
											<option value="gpt-4o" <?php selected( ( $ai_cfg['openai_model'] ?? '' ), 'gpt-4o' ); ?>>GPT-4o (Maximales Sprachverständnis)</option>
										</select>
									</td>
								</tr>
							</table>
						</div>

						<!-- 3. MISTRAL AI FIELDS -->
						<div id="ai_section_mistral" class="ai-provider-section" style="<?php echo 'mistral' === $cur_provider ? '' : 'display:none;'; ?>background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:16px 20px;margin-bottom:20px;">
							<h3 style="margin-top:0;font-size:15px;color:#164781;">🇫🇷 Mistral AI (EU / DSGVO) Konfiguration</h3>
							<div style="background: <?php echo $has_mistral_key ? '#f0fdf4' : '#fffbeb'; ?>; border-left: 4px solid <?php echo $has_mistral_key ? '#22c55e' : '#f59e0b'; ?>; padding: 10px 14px; border-radius: 4px; margin-bottom: 14px;">
								<?php if ( $has_mistral_key ) : ?>
									<strong style="color:#166534;display:block;">✓ Mistral AI API-Schlüssel ist hinterlegt (Server in Paris / EU).</strong>
								<?php else : ?>
									<strong style="color:#92400e;display:block;">⚠️ Noch kein Mistral API-Schlüssel hinterlegt</strong>
									<span style="font-size:13px;color:#b45309;">API-Schlüssel erstellen unter <a href="https://console.mistral.ai/api-keys/" target="_blank" rel="noopener noreferrer" style="color:#1d4ed8;font-weight:600;">console.mistral.ai ↗</a>.</span>
								<?php endif; ?>
							</div>
							<table class="form-table" style="margin:0;">
								<tr>
									<th style="width:180px;"><label for="mistral_api_key">Mistral API-Schlüssel</label></th>
									<td>
										<input name="gemini[mistral_api_key]" type="password" id="mistral_api_key" value="<?php echo esc_attr( $ai_cfg['mistral_api_key'] ?? '' ); ?>" class="large-text" placeholder="..." />
										<button type="button" class="button button-secondary" style="margin-top:4px;" onclick="const f=document.getElementById('mistral_api_key'); f.type = f.type === 'password' ? 'text' : 'password';">Anzeigen / Verbergen</button>
									</td>
								</tr>
								<tr>
									<th><label for="mistral_model">Mistral Modell</label></th>
									<td>
										<select name="gemini[mistral_model]" id="mistral_model">
											<option value="mistral-small-latest" <?php selected( ( $ai_cfg['mistral_model'] ?? '' ), 'mistral-small-latest' ); ?>>Mistral Small (Empfohlen – schnell, kostengünstig &amp; sehr gutes Deutsch)</option>
											<option value="mistral-large-latest" <?php selected( ( $ai_cfg['mistral_model'] ?? '' ), 'mistral-large-latest' ); ?>>Mistral Large (Spitzenmodell von Mistral)</option>
											<option value="open-mistral-nemo" <?php selected( ( $ai_cfg['mistral_model'] ?? '' ), 'open-mistral-nemo' ); ?>>Mistral Nemo (Effizientes Open-Weights-Modell)</option>
										</select>
									</td>
								</tr>
							</table>
						</div>

						<!-- 4. GROQ FIELDS -->
						<div id="ai_section_groq" class="ai-provider-section" style="<?php echo 'groq' === $cur_provider ? '' : 'display:none;'; ?>background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:16px 20px;margin-bottom:20px;">
							<h3 style="margin-top:0;font-size:15px;color:#164781;">⚡ Groq (Ultra-schnelle LPU-Chips) Konfiguration</h3>
							<div style="background: <?php echo $has_groq_key ? '#f0fdf4' : '#fffbeb'; ?>; border-left: 4px solid <?php echo $has_groq_key ? '#22c55e' : '#f59e0b'; ?>; padding: 10px 14px; border-radius: 4px; margin-bottom: 14px;">
								<?php if ( $has_groq_key ) : ?>
									<strong style="color:#166534;display:block;">✓ Groq API-Schlüssel ist hinterlegt.</strong>
								<?php else : ?>
									<strong style="color:#92400e;display:block;">⚠️ Noch kein Groq API-Schlüssel hinterlegt</strong>
									<span style="font-size:13px;color:#b45309;">Kostenlosen API-Schlüssel erstellen unter <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" style="color:#1d4ed8;font-weight:600;">console.groq.com ↗</a>.</span>
								<?php endif; ?>
							</div>
							<table class="form-table" style="margin:0;">
								<tr>
									<th style="width:180px;"><label for="groq_api_key">Groq API-Schlüssel</label></th>
									<td>
										<input name="gemini[groq_api_key]" type="password" id="groq_api_key" value="<?php echo esc_attr( $ai_cfg['groq_api_key'] ?? '' ); ?>" class="large-text" placeholder="gsk_..." />
										<button type="button" class="button button-secondary" style="margin-top:4px;" onclick="const f=document.getElementById('groq_api_key'); f.type = f.type === 'password' ? 'text' : 'password';">Anzeigen / Verbergen</button>
									</td>
								</tr>
								<tr>
									<th><label for="groq_model">Groq Modell</label></th>
									<td>
										<select name="gemini[groq_model]" id="groq_model">
											<option value="llama-3.3-70b-versatile" <?php selected( ( $ai_cfg['groq_model'] ?? '' ), 'llama-3.3-70b-versatile' ); ?>>Llama 3.3 70B Versatile (Empfohlen – extrem starkes Open-Source-Modell)</option>
											<option value="llama-3.1-8b-instant" <?php selected( ( $ai_cfg['groq_model'] ?? '' ), 'llama-3.1-8b-instant' ); ?>>Llama 3.1 8B Instant (Ultraschnell, bis zu 800 Tokens/Sekunde)</option>
										</select>
									</td>
								</tr>
							</table>
						</div>

						<!-- 5. CUSTOM / OLLAMA FIELDS -->
						<div id="ai_section_custom" class="ai-provider-section" style="<?php echo 'custom' === $cur_provider ? '' : 'display:none;'; ?>background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:16px 20px;margin-bottom:20px;">
							<h3 style="margin-top:0;font-size:15px;color:#164781;">🖥️ Eigener Server / Ollama / Self-Hosted Konfiguration</h3>
							<div style="background: <?php echo $has_custom_ep ? '#f0fdf4' : '#fffbeb'; ?>; border-left: 4px solid <?php echo $has_custom_ep ? '#22c55e' : '#f59e0b'; ?>; padding: 10px 14px; border-radius: 4px; margin-bottom: 14px;">
								<?php if ( $has_custom_ep ) : ?>
									<strong style="color:#166534;display:block;">✓ Eigener Server-Endpunkt ist konfiguriert.</strong>
								<?php else : ?>
									<strong style="color:#92400e;display:block;">⚠️ Noch kein Server-Endpunkt hinterlegt</strong>
									<span style="font-size:13px;color:#b45309;">Trage die vollständige Chat-Completions-URL deines Servers ein (z. B. <code>http://deine-server-ip:11434/v1/chat/completions</code>).</span>
								<?php endif; ?>
							</div>
							<table class="form-table" style="margin:0;">
								<tr>
									<th style="width:180px;"><label for="custom_endpoint">Chat-Completions URL *</label></th>
									<td>
										<input name="gemini[custom_endpoint]" type="url" id="custom_endpoint" value="<?php echo esc_attr( $ai_cfg['custom_endpoint'] ?? '' ); ?>" class="large-text" placeholder="http://localhost:11434/v1/chat/completions" />
										<p class="description">Vollständiger Pfad zur OpenAI-kompatiblen Schnittstelle (z. B. bei Ollama, vLLM oder LocalAI).</p>
									</td>
								</tr>
								<tr>
									<th><label for="custom_model">Modell-Name</label></th>
									<td>
										<input name="gemini[custom_model]" type="text" id="custom_model" value="<?php echo esc_attr( $ai_cfg['custom_model'] ?? 'llama3.2' ); ?>" class="regular-text" placeholder="llama3.2" />
										<p class="description">Der Name des Modells, wie er auf deinem Server geladen ist (z. B. <code>llama3.2</code>, <code>mistral</code>, <code>gemma2</code>).</p>
									</td>
								</tr>
								<tr>
									<th><label for="custom_api_key">API-Schlüssel / Token (optional)</label></th>
									<td>
										<input name="gemini[custom_api_key]" type="password" id="custom_api_key" value="<?php echo esc_attr( $ai_cfg['custom_api_key'] ?? '' ); ?>" class="large-text" placeholder="Optionaler Bearer-Token..." />
									</td>
								</tr>
							</table>
						</div>

						<script>
						function switchAiProvider(provider) {
							jQuery('.ai-provider-section').hide();
							jQuery('#ai_section_' + provider).fadeIn(150);
						}
						</script>

						<table class="form-table" role="presentation">
							<tr>
								<th scope="row"><label for="gemini_prompt">Persönlichkeit &amp; System-Prompt</label></th>
								<td>
									<textarea name="gemini[system_prompt]" id="gemini_prompt" rows="8" class="large-text" style="font-family:monospace;font-size:12px;"><?php echo esc_textarea( $ai_cfg['system_prompt'] ); ?></textarea>
									<p class="description">Definiert Tonfall, Verhaltensregeln und Zielgruppe des KI-Assistenten – gilt einheitlich für alle ausgewählten KI-Anbieter.</p>
								</td>
							</tr>
						</table>

						<hr style="margin:28px 0 20px;border:0;border-top:1px solid #cbd5e1;" />

						<h3 style="font-size:16px;margin:16px 0 8px;display:flex;align-items:center;gap:8px;">
							<span>🛡️</span> Sicherheit, Limits &amp; Spam-Schutz
						</h3>
						<p class="description" style="margin-bottom:16px;">
							Schütze deinen KI-Assistenten vor übermäßigen Anfragen, böswilligen Bots, Kostenfallen und thematischer Zweckentfremdung.
						</p>

						<table class="form-table" role="presentation">
							<tr>
								<th scope="row">Rate-Limiting (Anfrageschutz)</th>
								<td>
									<label>
										<input type="checkbox" name="gemini[rate_limit_enabled]" value="1" <?php checked( ! empty( $ai_cfg['rate_limit_enabled'] ) ); ?> />
										<strong>Anfragen pro Besucher zeitlich begrenzen</strong> (schützt vor Bot-Dauerfeuer und Kostenexplosion)
									</label>
									<div style="margin-top:8px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
										<span>Maximal</span>
										<input type="number" name="gemini[rate_limit_requests]" value="<?php echo esc_attr( $ai_cfg['rate_limit_requests'] ?? 10 ); ?>" min="1" max="100" style="width:70px;" />
										<span>Fragen innerhalb von</span>
										<input type="number" name="gemini[rate_limit_window_minutes]" value="<?php echo esc_attr( $ai_cfg['rate_limit_window_minutes'] ?? 10 ); ?>" min="1" max="1440" style="width:70px;" />
										<span>Minuten pro Besucher/IP</span>
									</div>
									<p class="description">Standard: 10 Fragen in 10 Minuten. Bei Überschreitung erhält der Nutzer einen freundlichen Hinweis auf eine kurze Pause oder den direkten Kontakt zu dir.</p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="gemini_max_input">Max. Zeichen pro Frage</label></th>
								<td>
									<input name="gemini[max_input_length]" type="number" id="gemini_max_input" value="<?php echo esc_attr( $ai_cfg['max_input_length'] ?? 800 ); ?>" min="100" max="5000" style="width:100px;" /> Zeichen
									<p class="description">Verhindert, dass jemand riesige Textmengen oder Dokumente in den Chat kopiert. Standard: 800 Zeichen (ca. 120 Wörter).</p>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="gemini_max_tokens">Max. Antwortlänge (Tokens)</label></th>
								<td>
									<input name="gemini[max_output_tokens]" type="number" id="gemini_max_tokens" value="<?php echo esc_attr( $ai_cfg['max_output_tokens'] ?? 800 ); ?>" min="100" max="4096" style="width:100px;" /> Tokens
									<p class="description">Begrenzt die Ausführlichkeit der generierten Antwort. Schont dein API-Kontingent und verhindert Endlostexte. Standard: 800 Tokens (ca. 500–600 Wörter).</p>
								</td>
							</tr>
							<tr>
								<th scope="row">Themen-Filter (Guardrails)</th>
								<td>
									<label>
										<input type="checkbox" name="gemini[strict_topic_filter]" value="1" <?php checked( ! empty( $ai_cfg['strict_topic_filter'] ) ); ?> />
										<strong>Strikte thematische Leitplanken aktivieren</strong> (lehnt themenfremde Fragen automatisch ab)
									</label>
									<p class="description">Beschränkt den Assistenten auf digitale Alltagsthemen (Smartphones, PC, Internet, E-Mail, WhatsApp, Online-Dienste, Passwörter, Sicherheit). Fragen zu Politik, Hausaufgaben, Witzen oder Versuche, die Anweisungen zu manipulieren, werden höflich abgewiesen.</p>
									<div style="margin-top:10px;">
										<label for="gemini_off_topic_msg" style="display:block;font-weight:600;margin-bottom:4px;">Freundliche Ablehnungsnachricht bei themenfremden Fragen:</label>
										<textarea name="gemini[off_topic_message]" id="gemini_off_topic_msg" rows="3" class="large-text"><?php echo esc_textarea( $ai_cfg['off_topic_message'] ?? DGBC_Settings::get_defaults()['gemini']['off_topic_message'] ); ?></textarea>
									</div>
								</td>
							</tr>
						</table>
						<p class="submit">
							<input type="submit" name="dgbc_save_settings" class="button button-primary" value="KI-Einstellungen speichern" />
						</p>
					</form>

				<!-- 6. TAB: GUIDES (ANLEITUNGEN VERWALTEN) -->
				<?php elseif ( 'guides' === $active_tab ) : 
					$action = sanitize_key( $_GET['action'] ?? '' );
					$editing_id = sanitize_key( $_GET['id'] ?? '' );
					$is_edit = ( 'edit_guide' === $action );
					$edit_guide = null;

					if ( $is_edit && ! empty( $editing_id ) && 'new' !== $editing_id ) {
						$edit_guide = DGBC_Content::get_guide( $editing_id );
					}
				?>
					<?php if ( $is_edit ) : 
						$g_id       = $edit_guide['id'] ?? ( 'guide-' . uniqid() );
						$g_title    = $edit_guide['title'] ?? '';
						$g_subtitle = $edit_guide['subtitle'] ?? '';
						$g_category = $edit_guide['category'] ?? 'Kommunikation';
						$g_theme    = $edit_guide['theme'] ?? 'blau';
						$g_minutes  = $edit_guide['minutes'] ?? 3;
						$g_scope    = $edit_guide['scope'] ?? 'Für Android und iPhone';
						$g_updated  = $edit_guide['updatedAt'] ?? current_time( 'Y-m-d' );
						$g_why      = $edit_guide['learning']['why'] ?? '';
						$g_prep     = ! empty( $edit_guide['learning']['preparation'] ) ? implode( "\n", (array) $edit_guide['learning']['preparation'] ) : '';
						$g_steps    = ! empty( $edit_guide['steps'] ) ? (array) $edit_guide['steps'] : array();
						$g_tip      = $edit_guide['tip'] ?? '';
						$g_src_title = $edit_guide['sources'][0]['title'] ?? '';
						$g_src_url   = $edit_guide['sources'][0]['url'] ?? '';

						if ( empty( $g_steps ) ) {
							$g_steps = array(
								array( 'title' => 'Schritt 1', 'text' => '', 'check' => '', 'icon' => 'check' )
							);
						}
					?>
						<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
							<h2 style="margin:0;font-size:18px;">
								<?php echo empty( $edit_guide ) ? '➕ Neue Anleitung erstellen' : '✏️ Anleitung bearbeiten: ' . esc_html( $g_title ); ?>
							</h2>
							<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'guides' ), admin_url( 'admin.php' ) ) ); ?>" class="button">
								← Zurück zur Übersicht
							</a>
						</div>

						<form method="post" action="">
							<?php wp_nonce_field( 'dgbc_guide_nonce_action', 'dgbc_guide_nonce' ); ?>
							<table class="form-table" role="presentation">
								<tr>
									<th scope="row"><label for="guide_title">Titel der Anleitung *</label></th>
									<td>
										<input name="guide_title" type="text" id="guide_title" value="<?php echo esc_attr( $g_title ); ?>" class="large-text" required placeholder="z. B. Eine Nachricht schreiben" />
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="guide_subtitle">Untertitel / Kurzbeschreibung</label></th>
									<td>
										<input name="guide_subtitle" type="text" id="guide_subtitle" value="<?php echo esc_attr( $g_subtitle ); ?>" class="large-text" placeholder="z. B. Mit WhatsApp in Kontakt bleiben." />
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="guide_id">ID (Kürzel / Slug)</label></th>
									<td>
										<input name="guide_id" type="text" id="guide_id" value="<?php echo esc_attr( $g_id ); ?>" class="regular-text" style="width:240px;" />
										<p class="description">Eindeutiger Bezeichner (z. B. <code>whatsapp</code>, <code>google-konto</code>). Nur Kleinbuchstaben, Zahlen und Bindestriche.</p>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="guide_category">Kategorie</label></th>
									<td>
										<input name="guide_category" type="text" id="guide_category" value="<?php echo esc_attr( $g_category ); ?>" class="regular-text" list="guide_categories_list" />
										<datalist id="guide_categories_list">
											<option value="Kommunikation">
											<option value="Konten">
											<option value="Sicherheit">
											<option value="Geräte">
											<option value="Internet">
											<option value="Mobilität">
											<option value="Digitale Dienste">
											<option value="Alltag">
										</datalist>
										<p class="description">Wähle eine bestehende Kategorie oder trage eine neue ein.</p>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="guide_theme">Farbschema (Theme)</label></th>
									<td>
										<select name="guide_theme" id="guide_theme">
											<option value="gruen" <?php selected( $g_theme, 'gruen' ); ?>>Grün (z. B. WhatsApp, Kommunikation)</option>
											<option value="blau" <?php selected( $g_theme, 'blau' ); ?>>Blau (z. B. Konten, System)</option>
											<option value="rot" <?php selected( $g_theme, 'rot' ); ?>>Rot (z. B. Sicherheit, Warnungen)</option>
											<option value="tuerkis" <?php selected( $g_theme, 'tuerkis' ); ?>>Türkis (z. B. Internet, Browser)</option>
											<option value="violett" <?php selected( $g_theme, 'violett' ); ?>>Violett (z. B. Medien, Unterhaltung)</option>
											<option value="gold" <?php selected( $g_theme, 'gold' ); ?>>Gold / Gelb (z. B. Banking, Finanzen)</option>
											<option value="magenta" <?php selected( $g_theme, 'magenta' ); ?>>Magenta (z. B. Verwaltung, Anträge)</option>
											<option value="schiefer" <?php selected( $g_theme, 'schiefer' ); ?>>Schiefergrau (z. B. Allgemeines)</option>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="guide_minutes">Dauer (Minuten)</label></th>
									<td>
										<input name="guide_minutes" type="number" id="guide_minutes" min="1" max="60" value="<?php echo esc_attr( $g_minutes ); ?>" style="width:80px;" /> Minuten
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="guide_scope">Gültigkeitsbereich (Scope)</label></th>
									<td>
										<input name="guide_scope" type="text" id="guide_scope" value="<?php echo esc_attr( $g_scope ); ?>" class="regular-text" placeholder="z. B. Für Android und iPhone" />
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="guide_why">Warum das wichtig ist (Lernziel)</label></th>
									<td>
										<textarea name="guide_why" id="guide_why" rows="2" class="large-text"><?php echo esc_textarea( $g_why ); ?></textarea>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="guide_prep">Vorbereitung (je Zeile ein Punkt)</label></th>
									<td>
										<textarea name="guide_prep" id="guide_prep" rows="3" class="large-text"><?php echo esc_textarea( $g_prep ); ?></textarea>
										<p class="description">Jede Zeile wird als eigener Vorbereitungspunkt angezeigt.</p>
									</td>
								</tr>
							</table>

							<!-- Step Builder -->
							<h3 style="margin-top:25px;font-size:16px;border-bottom:1px solid #eee;padding-bottom:8px;">
								📋 Schritte der Anleitung
							</h3>
							<div id="dgbc-steps-container">
								<?php foreach ( $g_steps as $idx => $step ) : ?>
									<div class="dgbc-step-block" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:16px;margin-bottom:14px;">
										<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
											<strong style="color:#164781;font-size:14px;" class="dgbc-step-heading">Schritt <?php echo esc_html( $idx + 1 ); ?></strong>
											<button type="button" class="button button-link-delete dgbc-remove-step-btn" onclick="this.closest('.dgbc-step-block').remove(); renumberSteps();">
												Schritt entfernen
											</button>
										</div>
										<table class="form-table" style="margin:0;">
											<tr>
												<th style="width:140px;padding:6px 0;">Schritt-Titel</th>
												<td style="padding:6px 0;">
													<input type="text" name="steps[<?php echo esc_attr( $idx ); ?>][title]" value="<?php echo esc_attr( $step['title'] ?? '' ); ?>" class="large-text" placeholder="z. B. Chat öffnen" required />
												</td>
											</tr>
											<tr>
												<th style="padding:6px 0;">Ausführlicher Text</th>
												<td style="padding:6px 0;">
													<textarea name="steps[<?php echo esc_attr( $idx ); ?>][text]" rows="3" class="large-text" placeholder="Genaue Handlungsanweisung ohne Fachbegriffe ..." required><?php echo esc_textarea( $step['text'] ?? '' ); ?></textarea>
												</td>
											</tr>
											<tr>
												<th style="padding:6px 0;">Prüf-Frage (Check)</th>
												<td style="padding:6px 0;">
													<input type="text" name="steps[<?php echo esc_attr( $idx ); ?>][check]" value="<?php echo esc_attr( $step['check'] ?? '' ); ?>" class="large-text" placeholder="z. B. Siehst du das Menü auf dem Bildschirm?" />
												</td>
											</tr>
										</table>
									</div>
								<?php endforeach; ?>
							</div>

							<p>
								<button type="button" class="button button-secondary" id="dgbc-add-step-btn">
									➕ Weiteren Schritt hinzufügen
								</button>
							</p>

							<script>
							function renumberSteps() {
								jQuery('#dgbc-steps-container .dgbc-step-block').each(function(index) {
									jQuery(this).find('.dgbc-step-heading').text('Schritt ' + (index + 1));
									jQuery(this).find('input, textarea').each(function() {
										var name = jQuery(this).attr('name');
										if (name) {
											jQuery(this).attr('name', name.replace(/steps\[\d+\]/, 'steps[' + index + ']'));
										}
									});
								});
							}

							jQuery(document).ready(function($) {
								$('#dgbc-add-step-btn').on('click', function() {
									var count = $('#dgbc-steps-container .dgbc-step-block').length;
									var tpl = `
										<div class="dgbc-step-block" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:16px;margin-bottom:14px;">
											<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
												<strong style="color:#164781;font-size:14px;" class="dgbc-step-heading">Schritt ` + (count + 1) + `</strong>
												<button type="button" class="button button-link-delete dgbc-remove-step-btn" onclick="this.closest('.dgbc-step-block').remove(); renumberSteps();">
													Schritt entfernen
												</button>
											</div>
											<table class="form-table" style="margin:0;">
												<tr>
													<th style="width:140px;padding:6px 0;">Schritt-Titel</th>
													<td style="padding:6px 0;">
														<input type="text" name="steps[` + count + `][title]" value="" class="large-text" placeholder="z. B. Bestätigen" required />
													</td>
												</tr>
												<tr>
													<th style="padding:6px 0;">Ausführlicher Text</th>
													<td style="padding:6px 0;">
														<textarea name="steps[` + count + `][text]" rows="3" class="large-text" placeholder="Genaue Handlungsanweisung ..." required></textarea>
													</td>
												</tr>
												<tr>
													<th style="padding:6px 0;">Prüf-Frage (Check)</th>
													<td style="padding:6px 0;">
														<input type="text" name="steps[` + count + `][check]" value="" class="large-text" placeholder="z. B. Wurde die Bestätigung angezeigt?" />
													</td>
												</tr>
											</table>
										</div>
									`;
									$('#dgbc-steps-container').append(tpl);
								});
							});
							</script>

							<h3 style="margin-top:25px;font-size:16px;border-bottom:1px solid #eee;padding-bottom:8px;">
								💡 Tipp &amp; Quellenangabe
							</h3>
							<table class="form-table" role="presentation">
								<tr>
									<th scope="row"><label for="guide_tip">Hilfreicher Tipp (optional)</label></th>
									<td>
										<textarea name="guide_tip" id="guide_tip" rows="2" class="large-text" placeholder="Ein nützlicher Zusatztipp ..."><?php echo esc_textarea( $g_tip ); ?></textarea>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="guide_source_title">Quelle / Weiterführender Link</label></th>
									<td>
										<input name="guide_source_title" type="text" id="guide_source_title" value="<?php echo esc_attr( $g_src_title ); ?>" class="regular-text" placeholder="Titel (z. B. Offizielle Hilfe)" />
										<input name="guide_source_url" type="url" id="guide_source_url" value="<?php echo esc_attr( $g_src_url ); ?>" class="regular-text" placeholder="https://..." />
									</td>
								</tr>
							</table>

							<p class="submit" style="display:flex;gap:12px;align-items:center;">
								<input type="submit" name="dgbc_save_guide" class="button button-primary button-large" value="💾 Anleitung speichern" />
								<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'guides' ), admin_url( 'admin.php' ) ) ); ?>" class="button button-large">
									Abbrechen
								</a>
							</p>
						</form>

					<?php else : 
						// LIST VIEW FOR GUIDES
						$filter_cat = sanitize_text_field( $_GET['filter_cat'] ?? '' );
						$search_q   = sanitize_text_field( $_GET['s_guide'] ?? '' );

						$filtered_guides = $all_guides;
						if ( ! empty( $filter_cat ) ) {
							$filtered_guides = array_values( array_filter( $filtered_guides, function( $g ) use ( $filter_cat ) {
								return ( ( $g['category'] ?? '' ) === $filter_cat );
							} ) );
						}
						if ( ! empty( $search_q ) ) {
							$filtered_guides = array_values( array_filter( $filtered_guides, function( $g ) use ( $search_q ) {
								$haystack = ( $g['title'] ?? '' ) . ' ' . ( $g['subtitle'] ?? '' ) . ' ' . ( $g['category'] ?? '' );
								return ( false !== stripos( $haystack, $search_q ) );
							} ) );
						}

						// Gather unique categories for filter
						$categories = array();
						foreach ( $all_guides as $g ) {
							if ( ! empty( $g['category'] ) && ! in_array( $g['category'], $categories, true ) ) {
								$categories[] = $g['category'];
							}
						}
						sort( $categories );
					?>
						<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
							<div>
								<h2 style="margin:0;font-size:18px;">📖 Alle Anleitungen verwalten (<?php echo count( $all_guides ); ?>)</h2>
								<p style="margin:4px 0 0 0;color:#666;font-size:13px;">Bearbeite bestehende Anleitungen, erstelle neue oder setze alle Inhalte auf die Standardwerte zurück.</p>
							</div>
							<div style="display:flex;gap:10px;align-items:center;">
								<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'guides', 'action' => 'edit_guide', 'id' => 'new' ), admin_url( 'admin.php' ) ) ); ?>" class="button button-primary">
									➕ Neue Anleitung erstellen
								</a>
								<form method="post" action="" onsubmit="return confirm('Möchtest du wirklich alle Anleitungen auf die ursprünglichen 35 Standard-Anleitungen zurücksetzen? Eigene Änderungen gehen dabei verloren.');" style="display:inline;">
									<?php wp_nonce_field( 'dgbc_reset_guides_action', 'dgbc_reset_guides_nonce' ); ?>
									<input type="submit" name="dgbc_reset_guides" class="button button-secondary" value="🔄 Auf Standard zurücksetzen" />
								</form>
							</div>
						</div>

						<!-- Filter Bar -->
						<div style="background:#f8fafc;padding:12px 16px;border-radius:4px;border:1px solid #e2e8f0;margin-bottom:20px;display:flex;gap:15px;align-items:center;flex-wrap:wrap;">
							<form method="get" action="" style="display:flex;gap:10px;align-items:center;flex:1;flex-wrap:wrap;">
								<input type="hidden" name="page" value="digital-guide-box-v2" />
								<input type="hidden" name="tab" value="guides" />

								<label for="filter_cat" style="font-size:13px;font-weight:600;">Kategorie:</label>
								<select name="filter_cat" id="filter_cat" onchange="this.form.submit();">
									<option value="">Alle Kategorien (<?php echo count( $all_guides ); ?>)</option>
									<?php foreach ( $categories as $cat ) : ?>
										<option value="<?php echo esc_attr( $cat ); ?>" <?php selected( $filter_cat, $cat ); ?>>
											<?php echo esc_html( $cat ); ?>
										</option>
									<?php endforeach; ?>
								</select>

								<label for="s_guide" style="font-size:13px;font-weight:600;margin-left:10px;">Suche:</label>
								<input type="search" name="s_guide" id="s_guide" value="<?php echo esc_attr( $search_q ); ?>" placeholder="Titel oder Schlagwort ..." style="width:200px;" />

								<input type="submit" class="button button-secondary" value="Filtern" />
								<?php if ( ! empty( $filter_cat ) || ! empty( $search_q ) ) : ?>
									<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'guides' ), admin_url( 'admin.php' ) ) ); ?>" class="button button-link">
										Filter zurücksetzen
									</a>
								<?php endif; ?>
							</form>
						</div>

						<!-- Guides Table -->
						<table class="wp-list-table widefat fixed striped">
							<thead>
								<tr>
									<th style="width:130px;">Theme &amp; ID</th>
									<th>Titel &amp; Untertitel</th>
									<th style="width:140px;">Kategorie</th>
									<th style="width:90px;">Dauer</th>
									<th style="width:90px;">Schritte</th>
									<th style="width:140px;text-align:right;">Aktionen</th>
								</tr>
							</thead>
							<tbody>
								<?php if ( ! empty( $filtered_guides ) ) : ?>
									<?php foreach ( $filtered_guides as $g ) : 
										$theme_colors = array(
											'gruen'    => '#16a34a',
											'blau'     => '#2563eb',
											'rot'      => '#dc2626',
											'tuerkis'  => '#0d9488',
											'violett'  => '#7c3aed',
											'gold'     => '#d97706',
											'magenta'  => '#c026d3',
											'schiefer' => '#475569',
										);
										$badge_color = $theme_colors[ $g['theme'] ?? 'blau' ] ?? '#2563eb';
									?>
										<tr>
											<td>
												<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:<?php echo esc_attr( $badge_color ); ?>;margin-right:4px;"></span>
												<code><?php echo esc_html( $g['id'] ?? '-' ); ?></code>
											</td>
											<td>
												<strong><?php echo esc_html( $g['title'] ?? 'Ohne Titel' ); ?></strong>
												<?php if ( ! empty( $g['subtitle'] ) ) : ?>
													<span style="display:block;font-size:12px;color:#666;"><?php echo esc_html( $g['subtitle'] ); ?></span>
												<?php endif; ?>
											</td>
											<td><?php echo esc_html( $g['category'] ?? '-' ); ?></td>
											<td><?php echo esc_html( $g['minutes'] ?? 3 ); ?> Min.</td>
											<td><?php echo count( $g['steps'] ?? array() ); ?> Schritte</td>
											<td style="text-align:right;">
												<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'guides', 'action' => 'edit_guide', 'id' => $g['id'] ), admin_url( 'admin.php' ) ) ); ?>" class="button button-small">
													Bearbeiten
												</a>
												<a href="<?php echo esc_url( wp_nonce_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'guides', 'dgbc_delete_guide' => $g['id'] ), admin_url( 'admin.php' ) ), 'dgbc_delete_guide_action' ) ); ?>" class="button button-small" onclick="return confirm('Diese Anleitung wirklich löschen?');" style="color:#b32d2e;">
													Löschen
												</a>
											</td>
										</tr>
									<?php endforeach; ?>
								<?php else : ?>
									<tr>
										<td colspan="6" style="padding:20px;text-align:center;color:#666;">
											Keine Anleitungen für diesen Filter gefunden.
										</td>
									</tr>
								<?php endif; ?>
							</tbody>
						</table>
					<?php endif; ?>

				<!-- 7. TAB: NEWS (NEUIGKEITEN VERWALTEN) -->
				<?php elseif ( 'news' === $active_tab ) : 
					$action = sanitize_key( $_GET['action'] ?? '' );
					$editing_id = sanitize_key( $_GET['id'] ?? '' );
					$is_edit = ( 'edit_news' === $action );
					$edit_item = null;

					if ( $is_edit && ! empty( $editing_id ) && 'new' !== $editing_id ) {
						$edit_item = DGBC_Content::get_news_item( $editing_id );
					}
				?>
					<?php if ( $is_edit ) : 
						$n_id          = $edit_item['id'] ?? ( 'news-' . uniqid() );
						$n_title       = $edit_item['title'] ?? '';
						$n_category    = $edit_item['category'] ?? 'Geräte & Technik';
						$n_date        = $edit_item['date'] ?? current_time( 'Y-m-d' );
						$n_datelabel   = $edit_item['dateLabel'] ?? 'Aktuell';
						$n_relevance   = $edit_item['relevance'] ?? '';
						$n_takeaway    = $edit_item['takeaway'] ?? '';
						$n_tip         = $edit_item['tip'] ?? '';
						$n_assess_act  = $edit_item['assessment']['action'] ?? 'none';
						$n_assess_ctx  = $edit_item['assessment']['context'] ?? '';
						$n_assess_adv  = $edit_item['assessment']['advice'] ?? '';
						$n_assess_rel  = $edit_item['assessment']['relevance'] ?? 'yes';
						$n_src_title   = $edit_item['sources'][0]['title'] ?? '';
						$n_src_url     = $edit_item['sources'][0]['url'] ?? '';

						$paragraphs       = $edit_item['paragraphs'] ?? array();
						$paragraph_titles = $edit_item['paragraphTitles'] ?? array();
						if ( empty( $paragraphs ) ) {
							$paragraphs       = array( '' );
							$paragraph_titles = array( 'Hintergrund' );
						}
					?>
						<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
							<h2 style="margin:0;font-size:18px;">
								<?php echo empty( $edit_item ) ? '➕ Neuen Beitrag erstellen' : '✏️ Beitrag bearbeiten: ' . esc_html( $n_title ); ?>
							</h2>
							<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news' ), admin_url( 'admin.php' ) ) ); ?>" class="button">
								← Zurück zur Übersicht
							</a>
						</div>

						<form method="post" action="">
							<?php wp_nonce_field( 'dgbc_news_nonce_action', 'dgbc_news_nonce' ); ?>
							<table class="form-table" role="presentation">
								<tr>
									<th scope="row"><label for="news_title">Titel des Beitrags *</label></th>
									<td>
										<input name="news_title" type="text" id="news_title" value="<?php echo esc_attr( $n_title ); ?>" class="large-text" required placeholder="z. B. Push-TAN-Freigabe: Was du vor dem Bestätigen unbedingt lesen musst" />
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_id">ID (Kürzel / Slug)</label></th>
									<td>
										<input name="news_id" type="text" id="news_id" value="<?php echo esc_attr( $n_id ); ?>" class="regular-text" style="width:240px;" />
										<p class="description">Eindeutiger Bezeichner (z. B. <code>push-tan-richtig-pruefen-2026</code>).</p>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_category">Kategorie</label></th>
									<td>
										<select name="news_category" id="news_category">
											<?php
											$news_cats = array(
												'Geräte & Technik',
												'Kommunikation & Mobilität',
												'Digitale Verwaltung',
												'Sicherheit & Schutz',
												'Online-Banking & Einkauf',
												'Formulare & Anträge',
												'Medien & Unterhaltung',
												'Künstliche Intelligenz',
												'Verträge & Abos',
												'Lernen & Wissen',
												'Vorsorge & Vollmachten',
												'Gesundheit & E-Rezept',
											);
											foreach ( $news_cats as $cat ) {
												echo '<option value="' . esc_attr( $cat ) . '" ' . selected( $n_category, $cat, false ) . '>' . esc_html( $cat ) . '</option>';
											}
											?>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_date">Datum &amp; Kennzeichnung</label></th>
									<td>
										<input name="news_date" type="date" id="news_date" value="<?php echo esc_attr( $n_date ); ?>" />
										<input name="news_datelabel" type="text" value="<?php echo esc_attr( $n_datelabel ); ?>" placeholder="z. B. Aktuell, Warnung, Ratgeber" style="width:160px;margin-left:8px;" />
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_assess_act">Handlungsempfehlung (Ampel)</label></th>
									<td>
										<select name="news_assess_act" id="news_assess_act">
											<option value="important" <?php selected( $n_assess_act, 'important' ); ?>>🔴 Rot / Warnung · Wichtig &amp; Dringend</option>
											<option value="recommended" <?php selected( $n_assess_act, 'recommended' ); ?>>🟡 Gelb · Handlung empfohlen</option>
											<option value="none" <?php selected( $n_assess_act, 'none' ); ?>>🟢 Grün · Zur Kenntnis / Keine sofortige Handlung</option>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_relevance">Kurzbeschreibung (Vorschau)</label></th>
									<td>
										<textarea name="news_relevance" id="news_relevance" rows="2" class="large-text" placeholder="Worum geht es in einem Satz?"><?php echo esc_textarea( $n_relevance ); ?></textarea>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_takeaway">Das Wichtigste für dich (Takeaway)</label></th>
									<td>
										<textarea name="news_takeaway" id="news_takeaway" rows="2" class="large-text" placeholder="Kernaussage für den Leser ..."><?php echo esc_textarea( $n_takeaway ); ?></textarea>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_assess_ctx">Zielgruppe / Kontext</label></th>
									<td>
										<input name="news_assess_ctx" type="text" id="news_assess_ctx" value="<?php echo esc_attr( $n_assess_ctx ); ?>" class="large-text" placeholder="z. B. Für alle, die Banking-Apps auf dem Handy nutzen." />
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_assess_adv">Konkreter Ratschlag</label></th>
									<td>
										<input name="news_assess_adv" type="text" id="news_assess_adv" value="<?php echo esc_attr( $n_assess_adv ); ?>" class="large-text" placeholder="z. B. Vor dem Fingerabdruck immer Betrag und IBAN prüfen." />
									</td>
								</tr>
							</table>

							<!-- Dynamic Paragraphs Builder -->
							<h3 style="margin-top:25px;font-size:16px;border-bottom:1px solid #eee;padding-bottom:8px;">
								📝 Ausführlicher Inhalt (Absätze)
							</h3>
							<div id="dgbc-paragraphs-container">
								<?php foreach ( $paragraphs as $pidx => $ptext ) : 
									$ptitle = $paragraph_titles[ $pidx ] ?? 'Absatz ' . ( $pidx + 1 );
								?>
									<div class="dgbc-para-block" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:16px;margin-bottom:14px;">
										<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
											<strong style="color:#164781;font-size:14px;" class="dgbc-para-heading">Absatz <?php echo esc_html( $pidx + 1 ); ?></strong>
											<button type="button" class="button button-link-delete dgbc-remove-para-btn" onclick="this.closest('.dgbc-para-block').remove(); renumberParas();">
												Absatz entfernen
											</button>
										</div>
										<table class="form-table" style="margin:0;">
											<tr>
												<th style="width:140px;padding:6px 0;">Zwischenüberschrift</th>
												<td style="padding:6px 0;">
													<input type="text" name="paragraphs[<?php echo esc_attr( $pidx ); ?>][title]" value="<?php echo esc_attr( $ptitle ); ?>" class="large-text" placeholder="z. B. Was steckt dahinter?" />
												</td>
											</tr>
											<tr>
												<th style="padding:6px 0;">Textinhalt</th>
												<td style="padding:6px 0;">
													<textarea name="paragraphs[<?php echo esc_attr( $pidx ); ?>][text]" rows="4" class="large-text" placeholder="Absatztext ..." required><?php echo esc_textarea( $ptext ); ?></textarea>
												</td>
											</tr>
										</table>
									</div>
								<?php endforeach; ?>
							</div>

							<p>
								<button type="button" class="button button-secondary" id="dgbc-add-para-btn">
									➕ Weiteren Absatz hinzufügen
								</button>
							</p>

							<script>
							function renumberParas() {
								jQuery('#dgbc-paragraphs-container .dgbc-para-block').each(function(index) {
									jQuery(this).find('.dgbc-para-heading').text('Absatz ' + (index + 1));
									jQuery(this).find('input, textarea').each(function() {
										var name = jQuery(this).attr('name');
										if (name) {
											jQuery(this).attr('name', name.replace(/paragraphs\[\d+\]/, 'paragraphs[' + index + ']'));
										}
									});
								});
							}

							jQuery(document).ready(function($) {
								$('#dgbc-add-para-btn').on('click', function() {
									var count = $('#dgbc-paragraphs-container .dgbc-para-block').length;
									var tpl = `
										<div class="dgbc-para-block" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:16px;margin-bottom:14px;">
											<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
												<strong style="color:#164781;font-size:14px;" class="dgbc-para-heading">Absatz ` + (count + 1) + `</strong>
												<button type="button" class="button button-link-delete dgbc-remove-para-btn" onclick="this.closest('.dgbc-para-block').remove(); renumberParas();">
													Absatz entfernen
												</button>
											</div>
											<table class="form-table" style="margin:0;">
												<tr>
													<th style="width:140px;padding:6px 0;">Zwischenüberschrift</th>
													<td style="padding:6px 0;">
														<input type="text" name="paragraphs[` + count + `][title]" value="" class="large-text" placeholder="z. B. Praxistipp" />
													</td>
												</tr>
												<tr>
													<th style="padding:6px 0;">Textinhalt</th>
													<td style="padding:6px 0;">
														<textarea name="paragraphs[` + count + `][text]" rows="4" class="large-text" placeholder="Absatztext ..." required></textarea>
													</td>
												</tr>
											</table>
										</div>
									`;
									$('#dgbc-paragraphs-container').append(tpl);
								});
							});
							</script>

							<h3 style="margin-top:25px;font-size:16px;border-bottom:1px solid #eee;padding-bottom:8px;">
								💡 Praxistipp &amp; Quellenangabe
							</h3>
							<table class="form-table" role="presentation">
								<tr>
									<th scope="row"><label for="news_tip">Praxistipp</label></th>
									<td>
										<textarea name="news_tip" id="news_tip" rows="2" class="large-text" placeholder="Praktischer Tipp für den Alltag ..."><?php echo esc_textarea( $n_tip ); ?></textarea>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_source_title">Quelle / Weiterführender Link</label></th>
									<td>
										<input name="news_source_title" type="text" id="news_source_title" value="<?php echo esc_attr( $n_src_title ); ?>" class="regular-text" placeholder="Titel (z. B. BSI, Verbraucherzentrale)" />
										<input name="news_source_url" type="url" id="news_source_url" value="<?php echo esc_attr( $n_src_url ); ?>" class="regular-text" placeholder="https://..." />
									</td>
								</tr>
							</table>

							<p class="submit" style="display:flex;gap:12px;align-items:center;">
								<input type="submit" name="dgbc_save_news" class="button button-primary button-large" value="💾 Beitrag speichern" />
								<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news' ), admin_url( 'admin.php' ) ) ); ?>" class="button button-large">
									Abbrechen
								</a>
							</p>
						</form>

					<?php else : 
						// LIST VIEW FOR NEWS
						$filter_cat = sanitize_text_field( $_GET['filter_cat'] ?? '' );
						$search_q   = sanitize_text_field( $_GET['s_news'] ?? '' );

						$filtered_news = $all_news;
						if ( ! empty( $filter_cat ) ) {
							$filtered_news = array_values( array_filter( $filtered_news, function( $n ) use ( $filter_cat ) {
								return ( ( $n['category'] ?? '' ) === $filter_cat );
							} ) );
						}
						if ( ! empty( $search_q ) ) {
							$filtered_news = array_values( array_filter( $filtered_news, function( $n ) use ( $search_q ) {
								$haystack = ( $n['title'] ?? '' ) . ' ' . ( $n['relevance'] ?? '' ) . ' ' . ( $n['category'] ?? '' );
								return ( false !== stripos( $haystack, $search_q ) );
							} ) );
						}

						// Unique categories
						$categories = array();
						foreach ( $all_news as $n ) {
							if ( ! empty( $n['category'] ) && ! in_array( $n['category'], $categories, true ) ) {
								$categories[] = $n['category'];
							}
						}
						sort( $categories );
					?>
						<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
							<div>
								<h2 style="margin:0;font-size:18px;">📰 Alle Neuigkeiten verwalten (<?php echo count( $all_news ); ?>)</h2>
								<p style="margin:4px 0 0 0;color:#666;font-size:13px;">Bearbeite bestehende Beiträge, erstelle neue Warnungen und Tipps oder setze alle Inhalte auf die Standardwerte zurück.</p>
							</div>
							<div style="display:flex;gap:10px;align-items:center;">
								<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news', 'action' => 'edit_news', 'id' => 'new' ), admin_url( 'admin.php' ) ) ); ?>" class="button button-primary">
									➕ Neuen Beitrag erstellen
								</a>
								<form method="post" action="" onsubmit="return confirm('Möchtest du wirklich alle Neuigkeiten auf die ursprünglichen 60 Standard-Beiträge zurücksetzen? Eigene Änderungen gehen dabei verloren.');" style="display:inline;">
									<?php wp_nonce_field( 'dgbc_reset_news_action', 'dgbc_reset_news_nonce' ); ?>
									<input type="submit" name="dgbc_reset_news" class="button button-secondary" value="🔄 Auf Standard zurücksetzen" />
								</form>
							</div>
						</div>

						<!-- Filter Bar -->
						<div style="background:#f8fafc;padding:12px 16px;border-radius:4px;border:1px solid #e2e8f0;margin-bottom:20px;display:flex;gap:15px;align-items:center;flex-wrap:wrap;">
							<form method="get" action="" style="display:flex;gap:10px;align-items:center;flex:1;flex-wrap:wrap;">
								<input type="hidden" name="page" value="digital-guide-box-v2" />
								<input type="hidden" name="tab" value="news" />

								<label for="filter_cat" style="font-size:13px;font-weight:600;">Kategorie:</label>
								<select name="filter_cat" id="filter_cat" onchange="this.form.submit();">
									<option value="">Alle Themen (<?php echo count( $all_news ); ?>)</option>
									<?php foreach ( $categories as $cat ) : ?>
										<option value="<?php echo esc_attr( $cat ); ?>" <?php selected( $filter_cat, $cat ); ?>>
											<?php echo esc_html( $cat ); ?>
										</option>
									<?php endforeach; ?>
								</select>

								<label for="s_news" style="font-size:13px;font-weight:600;margin-left:10px;">Suche:</label>
								<input type="search" name="s_news" id="s_news" value="<?php echo esc_attr( $search_q ); ?>" placeholder="Titel oder Schlagwort ..." style="width:200px;" />

								<input type="submit" class="button button-secondary" value="Filtern" />
								<?php if ( ! empty( $filter_cat ) || ! empty( $search_q ) ) : ?>
									<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news' ), admin_url( 'admin.php' ) ) ); ?>" class="button button-link">
										Filter zurücksetzen
									</a>
								<?php endif; ?>
							</form>
						</div>

						<!-- News Table -->
						<table class="wp-list-table widefat fixed striped">
							<thead>
								<tr>
									<th style="width:130px;">Wichtigkeit</th>
									<th>Titel &amp; Kurzbeschreibung</th>
									<th style="width:160px;">Kategorie</th>
									<th style="width:110px;">Datum</th>
									<th style="width:140px;text-align:right;">Aktionen</th>
								</tr>
							</thead>
							<tbody>
								<?php if ( ! empty( $filtered_news ) ) : ?>
									<?php foreach ( $filtered_news as $item ) : 
										$act = $item['assessment']['action'] ?? 'none';
									?>
										<tr>
											<td>
												<?php if ( 'important' === $act ) : ?>
													<span style="display:inline-block;padding:3px 8px;border-radius:10px;background:#fee2e2;color:#991b1b;font-weight:600;font-size:11px;">
														🔴 Wichtig
													</span>
												<?php elseif ( 'recommended' === $act ) : ?>
													<span style="display:inline-block;padding:3px 8px;border-radius:10px;background:#fef3c7;color:#92400e;font-weight:600;font-size:11px;">
														🟡 Empfohlen
													</span>
												<?php else : ?>
													<span style="display:inline-block;padding:3px 8px;border-radius:10px;background:#dcfce7;color:#166534;font-weight:600;font-size:11px;">
														🟢 Kenntnis
													</span>
												<?php endif; ?>
											</td>
											<td>
												<strong><?php echo esc_html( $item['title'] ?? 'Ohne Titel' ); ?></strong>
												<?php if ( ! empty( $item['relevance'] ) ) : ?>
													<span style="display:block;font-size:12px;color:#666;"><?php echo esc_html( $item['relevance'] ); ?></span>
												<?php endif; ?>
											</td>
											<td><?php echo esc_html( $item['category'] ?? '-' ); ?></td>
											<td>
												<?php echo esc_html( $item['date'] ?? '-' ); ?>
												<?php if ( ! empty( $item['dateLabel'] ) ) : ?>
													<span style="display:block;font-size:11px;color:#888;"><?php echo esc_html( $item['dateLabel'] ); ?></span>
												<?php endif; ?>
											</td>
											<td style="text-align:right;">
												<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news', 'action' => 'edit_news', 'id' => $item['id'] ), admin_url( 'admin.php' ) ) ); ?>" class="button button-small">
													Bearbeiten
												</a>
												<a href="<?php echo esc_url( wp_nonce_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news', 'dgbc_delete_news' => $item['id'] ), admin_url( 'admin.php' ) ), 'dgbc_delete_news_action' ) ); ?>" class="button button-small" onclick="return confirm('Diesen Beitrag wirklich löschen?');" style="color:#b32d2e;">
													Löschen
												</a>
											</td>
										</tr>
									<?php endforeach; ?>
								<?php else : ?>
									<tr>
										<td colspan="5" style="padding:20px;text-align:center;color:#666;">
											Keine Beiträge für diesen Filter gefunden.
										</td>
									</tr>
								<?php endif; ?>
							</tbody>
						</table>
					<?php endif; ?>

				<!-- 8. TAB: INBOX -->
				<?php elseif ( 'inbox' === $active_tab ) : ?>
					<?php $inquiries = get_option( DGBC_Inquiries::OPTION_KEY, array() ); ?>
					<h2 style="margin-top:0;font-size:18px;border-bottom:1px solid #eee;padding-bottom:10px;">Posteingang (Support &amp; Feedback)</h2>
					<?php if ( ! empty( $inquiries ) && is_array( $inquiries ) ) : ?>
						<table class="wp-list-table widefat fixed striped">
							<thead>
								<tr>
									<th style="width:100px;">Nummer</th>
									<th style="width:120px;">Art</th>
									<th style="width:200px;">Absender</th>
									<th>Nachricht</th>
									<th style="width:140px;">Eingegangen</th>
									<th style="width:80px;">Aktion</th>
								</tr>
							</thead>
							<tbody>
								<?php foreach ( $inquiries as $inq ) : ?>
									<tr>
										<td><strong>#<?php echo esc_html( $inq['id'] ?? '-' ); ?></strong></td>
										<td>
											<?php if ( ( $inq['type'] ?? '' ) === 'feedback' ) : ?>
												<span style="background:#f3e8ff;color:#6b21a8;padding:2px 8px;border-radius:10px;font-size:12px;font-weight:600;">Feedback</span>
											<?php else : ?>
												<span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:10px;font-size:12px;font-weight:600;">Support</span>
											<?php endif; ?>
										</td>
										<td><a href="mailto:<?php echo esc_attr( $inq['email'] ?? '' ); ?>"><?php echo esc_html( $inq['email'] ?? '-' ); ?></a></td>
										<td><?php echo nl2br( esc_html( $inq['message'] ?? '' ) ); ?></td>
										<td><?php echo esc_html( isset( $inq['timestamp'] ) ? wp_date( 'd.m.Y H:i', $inq['timestamp'] ) : '-' ); ?></td>
										<td>
											<a href="<?php echo esc_url( wp_nonce_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'inbox', 'dgbc_delete_inquiry' => $inq['id'] ), admin_url( 'admin.php' ) ), 'dgbc_delete_inquiry_action' ) ); ?>" class="button button-small" onclick="return confirm('Diese Anfrage wirklich löschen?');" style="color:#b32d2e;">
												Löschen
											</a>
										</td>
									</tr>
								<?php endforeach; ?>
							</tbody>
						</table>
					<?php else : ?>
						<p style="color:#666;font-size:14px;padding:20px 0;">Aktuell liegen keine offenen Anfragen vor.</p>
					<?php endif; ?>

				<?php endif; ?>

			</div>
		</div>
		<?php
	}
}
