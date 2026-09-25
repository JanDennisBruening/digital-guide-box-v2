<?php
/**
 * Plugin Name:       Digital-Guide-Box (Version 2)
 * Plugin URI:        https://janbruening.de/
 * Description:       Digital-Guide-Box für Jan Dennis Brüning – mit flexibler WordPress-Backend-Verwaltung für Texte, Profilbild, WhatsApp-Kanal, Zugangszeiten und eigene Neuigkeiten.
 * Version:           3.0.2
 * Author:            Jan Dennis Brüning
 * Author URI:        https://janbruening.de/
 * Text Domain:       digital-guide-box-v2
 * Requires at least: 6.0
 * Requires PHP:      7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DGBC_VERSION', '3.0.2' );
define( 'DGBC_FILE', __FILE__ );
define( 'DGBC_DIR', plugin_dir_path( __FILE__ ) );
define( 'DGBC_URL', plugin_dir_url( __FILE__ ) );

require_once DGBC_DIR . 'includes/class-dgbc-settings.php';
require_once DGBC_DIR . 'includes/class-dgbc-content.php';
require_once DGBC_DIR . 'includes/class-dgbc-auth.php';
require_once DGBC_DIR . 'includes/class-dgbc-router.php';
require_once DGBC_DIR . 'includes/class-dgbc-inquiries.php';
require_once DGBC_DIR . 'includes/class-dgbc-assistant.php';
require_once DGBC_DIR . 'includes/class-dgbc-admin.php';

final class Digital_Guide_Box_V2 {

	public static function init() {
		DGBC_Auth::init();
		DGBC_Router::init();
		DGBC_Inquiries::init();
		DGBC_Assistant::init();
		DGBC_Admin::init();
	}

	public static function activate() {
		DGBC_Router::add_rewrite_rules();
		flush_rewrite_rules();

		if ( false === get_option( DGBC_Settings::OPTION_KEY, false ) ) {
			DGBC_Settings::update_all( DGBC_Settings::get_defaults() );
		}
	}

	public static function deactivate() {
		flush_rewrite_rules();
	}
}

register_activation_hook( __FILE__, array( 'Digital_Guide_Box_V2', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'Digital_Guide_Box_V2', 'deactivate' ) );

add_action( 'plugins_loaded', array( 'Digital_Guide_Box_V2', 'init' ) );
