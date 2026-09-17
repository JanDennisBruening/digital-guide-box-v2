<?php
/**
 * Admin Management Center for Digital Guide Box (Configurable Edition).
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
			'Digital Guide Box v2',
			'Digital Guide Box v2',
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
		if ( ! isset( $_POST['dgbc_save_settings'] ) && ! isset( $_POST['dgbc_add_news'] ) && ! isset( $_GET['dgbc_delete_news'] ) && ! isset( $_GET['dgbc_delete_inquiry'] ) ) {
			return;
		}

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Keine ausreichenden Berechtigungen.' );
		}

		// Save Settings Tab
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
			}

			DGBC_Settings::update_all( $current );
			DGBC_Router::add_rewrite_rules();
			flush_rewrite_rules();

			wp_safe_redirect( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => $tab, 'settings-updated' => 'true' ), admin_url( 'admin.php' ) ) );
			exit;
		}

		// Add Custom News
		if ( isset( $_POST['dgbc_add_news'] ) ) {
			check_admin_referer( 'dgbc_news_nonce_action', 'dgbc_news_nonce' );
			$current = DGBC_Settings::get_all();

			$news_id = ! empty( $_POST['news_id'] ) ? sanitize_key( $_POST['news_id'] ) : 'news-' . uniqid();
			$title   = sanitize_text_field( $_POST['news_title'] ?? '' );
			if ( ! empty( $title ) ) {
				$para1   = sanitize_textarea_field( $_POST['news_para1'] ?? '' );
				$para2   = sanitize_textarea_field( $_POST['news_para2'] ?? '' );
				$paragraphs = array_values( array_filter( array( $para1, $para2 ) ) );

				$new_item = array(
					'id'              => $news_id,
					'title'           => $title,
					'category'        => sanitize_text_field( $_POST['news_category'] ?? 'Geräte & Technik' ),
					'date'            => sanitize_text_field( $_POST['news_date'] ?? current_time( 'Y-m-d' ) ),
					'dateLabel'       => sanitize_text_field( $_POST['news_datelabel'] ?? 'Aktuell' ),
					'relevance'       => sanitize_textarea_field( $_POST['news_relevance'] ?? '' ),
					'takeaway'        => sanitize_textarea_field( $_POST['news_takeaway'] ?? '' ),
					'tip'             => sanitize_textarea_field( $_POST['news_tip'] ?? '' ),
					'paragraphTitles' => array( 'Hintergrund', 'Praxistipp' ),
					'paragraphs'      => $paragraphs,
					'guideIds'        => ! empty( $_POST['news_guides'] ) ? array_map( 'sanitize_key', (array) $_POST['news_guides'] ) : array(),
					'assessment'      => array(
						'relevance' => sanitize_key( $_POST['news_assess_rel'] ?? 'yes' ),
						'context'   => sanitize_text_field( $_POST['news_assess_ctx'] ?? '' ),
						'action'    => sanitize_key( $_POST['news_assess_act'] ?? 'none' ),
						'advice'    => sanitize_text_field( $_POST['news_assess_adv'] ?? '' ),
					),
				);

				// Replace or append
				$replaced = false;
				foreach ( $current['custom_news'] as $idx => $ex ) {
					if ( $ex['id'] === $news_id ) {
						$current['custom_news'][ $idx ] = $new_item;
						$replaced = true;
						break;
					}
				}
				if ( ! $replaced ) {
					array_unshift( $current['custom_news'], $new_item );
				}

				DGBC_Settings::update_all( $current );
			}

			wp_safe_redirect( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news', 'news-saved' => 'true' ), admin_url( 'admin.php' ) ) );
			exit;
		}

		// Delete Custom News
		if ( isset( $_GET['dgbc_delete_news'] ) ) {
			check_admin_referer( 'dgbc_delete_news_action' );
			$del_id  = sanitize_key( $_GET['dgbc_delete_news'] );
			$current = DGBC_Settings::get_all();
			$current['custom_news'] = array_values( array_filter( $current['custom_news'], function( $item ) use ( $del_id ) {
				return ( $item['id'] !== $del_id );
			} ) );
			DGBC_Settings::update_all( $current );

			wp_safe_redirect( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news', 'news-deleted' => 'true' ), admin_url( 'admin.php' ) ) );
			exit;
		}

		// Delete Inquiry
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

		$settings = DGBC_Settings::get_all();
		$box_url  = DGBC_Router::get_box_url();
		$active_tab = isset( $_GET['tab'] ) ? sanitize_key( $_GET['tab'] ) : 'access';

		$tabs = array(
			'access'   => '🔑 Zugang & Links',
			'gate'     => '🚪 Eingangstor / Begrüßung',
			'profile'  => '👤 Profil & Beraterkontakt',
			'whatsapp' => '💬 WhatsApp-Kanal',
			'news'     => '📰 Eigene Neuigkeiten (' . count( $settings['custom_news'] ) . ')',
			'inbox'    => '📥 Posteingang',
		);
		?>
		<div class="wrap" style="max-width: 1040px;">
			<h1 style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
				<span class="dashicons dashicons-welcome-learn-more" style="font-size:32px;width:32px;height:32px;color:#164781;"></span>
				Digital Guide Box <span style="font-size:16px;background:#e5effb;color:#164781;padding:3px 10px;border-radius:12px;font-weight:600;">v2 Konfigurierbar</span>
			</h1>
			<p style="font-size:15px;color:#555;margin-bottom:20px;">
				Passe alle Texte, Kontaktdaten, Passwörter und Inhalte deiner Digital Guide Box flexibel im WordPress-Backend an.
			</p>

			<?php if ( isset( $_GET['settings-updated'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Einstellungen erfolgreich gespeichert.</strong></p></div>
			<?php elseif ( isset( $_GET['news-saved'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Beitrag erfolgreich gespeichert.</strong></p></div>
			<?php elseif ( isset( $_GET['news-deleted'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Beitrag gelöscht.</strong></p></div>
			<?php elseif ( isset( $_GET['inquiry-deleted'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><strong>Anfrage aus dem Posteingang gelöscht.</strong></p></div>
			<?php endif; ?>

			<!-- Quick Link Card -->
			<div style="background:#fff;border-left:4px solid #164781;box-shadow:0 1px 3px rgba(0,0,0,0.08);padding:16px 20px;border-radius:4px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:15px;">
				<div>
					<strong style="font-size:15px;color:#164781;display:block;">🔗 Direktlink zu deiner Digital Guide Box (v2)</strong>
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
									<p class="description">Standard: <code>digital-guide-box-v2</code>. Kann frei angepasst werden (z. B. <code>ratgeber-box</code>).</p>
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
									<code>[digital_guide_box_v2]</code>
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
									<p class="description">Standard: <code>Dein Digital-Guide</code></p>
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
									title: 'Profilbild für Digital Guide Box auswählen',
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

				<!-- 5. TAB: CUSTOM NEWS -->
				<?php elseif ( 'news' === $active_tab ) : ?>
					<h2 style="margin-top:0;font-size:18px;border-bottom:1px solid #eee;padding-bottom:10px;">Eigene Neuigkeiten &amp; Ankündigungen</h2>
					<p>Hier kannst du eigene Neuigkeiten und Warnungen anlegen, die im Tab „Neuigkeiten“ ganz oben für deine Nutzerinnen und Nutzer erscheinen.</p>

					<!-- List of Custom News -->
					<?php if ( ! empty( $settings['custom_news'] ) ) : ?>
						<table class="wp-list-table widefat fixed striped" style="margin-bottom:30px;">
							<thead>
								<tr>
									<th>Titel</th>
									<th style="width:160px;">Kategorie</th>
									<th style="width:110px;">Datum</th>
									<th style="width:140px;">Wichtigkeit</th>
									<th style="width:100px;">Aktionen</th>
								</tr>
							</thead>
							<tbody>
								<?php foreach ( $settings['custom_news'] as $cnews ) : ?>
									<tr>
										<td><strong><?php echo esc_html( $cnews['title'] ); ?></strong></td>
										<td><?php echo esc_html( $cnews['category'] ); ?></td>
										<td><?php echo esc_html( $cnews['date'] ); ?></td>
										<td>
											<?php
											$act = $cnews['assessment']['action'] ?? 'none';
											if ( 'important' === $act ) {
												echo '<span style="color:#d97706;font-weight:600;">⚠️ Wichtig</span>';
											} elseif ( 'recommended' === $act ) {
												echo '<span style="color:#2563eb;font-weight:600;">ℹ️ Empfohlen</span>';
											} else {
												echo '<span style="color:#16a34a;font-weight:600;">✅ Zur Kenntnis</span>';
											}
											?>
										</td>
										<td>
											<a href="<?php echo esc_url( wp_nonce_url( add_query_arg( array( 'page' => 'digital-guide-box-v2', 'tab' => 'news', 'dgbc_delete_news' => $cnews['id'] ), admin_url( 'admin.php' ) ), 'dgbc_delete_news_action' ) ); ?>" class="button button-small" onclick="return confirm('Diesen Beitrag wirklich löschen?');" style="color:#b32d2e;">
												Löschen
											</a>
										</td>
									</tr>
								<?php endforeach; ?>
							</tbody>
						</table>
					<?php else : ?>
						<p style="background:#f9f9f9;padding:15px;border-left:3px solid #ccc;color:#666;">Noch keine eigenen Beiträge angelegt. Die 5 Standardbeiträge der Box sind weiterhin aktiv.</p>
					<?php endif; ?>

					<!-- Add New News Form -->
					<div style="background:#fdfdfd;border:1px solid #e5e5e5;padding:20px;border-radius:4px;">
						<h3 style="margin-top:0;font-size:16px;">➕ Neuen Beitrag hinzufügen</h3>
						<form method="post" action="">
							<?php wp_nonce_field( 'dgbc_news_nonce_action', 'dgbc_news_nonce' ); ?>
							<table class="form-table" role="presentation">
								<tr>
									<th scope="row"><label for="news_title">Titel des Beitrags *</label></th>
									<td>
										<input name="news_title" type="text" id="news_title" class="large-text" required placeholder="z. B. Neues Sicherheitsupdate für WhatsApp" />
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_category">Kategorie</label></th>
									<td>
										<select name="news_category" id="news_category">
											<option value="Sicherheit & Schutz">Sicherheit & Schutz</option>
											<option value="Geräte & Technik" selected>Geräte & Technik</option>
											<option value="Kommunikation & Mobilität">Kommunikation & Mobilität</option>
											<option value="Digitale Verwaltung">Digitale Verwaltung</option>
											<option value="Online-Banking & Einkauf">Online-Banking & Einkauf</option>
											<option value="Lernen & Wissen">Lernen & Wissen</option>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_datelabel">Bezeichnung Datum</label></th>
									<td>
										<input name="news_datelabel" type="text" id="news_datelabel" value="Aktuell" style="width:140px;" />
										<input name="news_date" type="date" value="<?php echo esc_attr( current_time( 'Y-m-d' ) ); ?>" />
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_relevance">Kurzbeschreibung (Vorschau)</label></th>
									<td>
										<textarea name="news_relevance" id="news_relevance" rows="2" class="large-text" placeholder="Worum geht es in einem Satz?"></textarea>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_takeaway">Das Wichtigste für dich</label></th>
									<td>
										<input name="news_takeaway" type="text" id="news_takeaway" class="large-text" placeholder="z. B. Bitte aktualisiere deine App im App-Store." />
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_para1">Ausführlicher Text</label></th>
									<td>
										<textarea name="news_para1" id="news_para1" rows="4" class="large-text" placeholder="Beschreibe die Details einfach und verständlich …"></textarea>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="news_assess_act">Handlungsempfehlung (Ampel)</label></th>
									<td>
										<select name="news_assess_act" id="news_assess_act">
											<option value="none">Grün · Keine sofortige Handlung nötig</option>
											<option value="recommended">Gelb · Handlung empfohlen</option>
											<option value="important">Rot / Warnung · Wichtig &amp; Dringend</option>
										</select>
									</td>
								</tr>
							</table>
							<p class="submit">
								<input type="submit" name="dgbc_add_news" class="button button-primary" value="Beitrag jetzt veröffentlichen" />
							</p>
						</form>
					</div>

				<!-- 6. TAB: INBOX -->
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
