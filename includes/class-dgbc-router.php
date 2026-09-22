<?php
/**
 * Router and Template Loader for Digital Guide Box (Configurable Edition).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class DGBC_Router {

	const QUERY_VAR = 'digital_guide_box_custom_app';

	public static function init() {
		add_action( 'init', array( __CLASS__, 'add_rewrite_rules' ) );
		add_filter( 'query_vars', array( __CLASS__, 'add_query_vars' ) );
		add_action( 'template_redirect', array( __CLASS__, 'intercept_template' ) );
		add_shortcode( 'digital_guide_box', array( __CLASS__, 'render_shortcode' ) );
		add_shortcode( 'digital_guide_box_v2', array( __CLASS__, 'render_shortcode' ) );
		add_shortcode( 'digital_guide_box_custom', array( __CLASS__, 'render_shortcode' ) );
	}

	public static function get_endpoint_slug() {
		$access = DGBC_Settings::get_section( 'access' );
		$slug   = ! empty( $access['slug'] ) ? sanitize_title( $access['slug'] ) : 'digital-guide-box';
		if ( 'digital-guide-box-v2' === $slug ) {
			$slug = 'digital-guide-box';
		}
		return $slug;
	}

	public static function get_box_url() {
		return home_url( '/' . self::get_endpoint_slug() . '/' );
	}

	public static function add_rewrite_rules() {
		$slug = self::get_endpoint_slug();
		add_rewrite_rule(
			'^' . preg_quote( $slug, '/' ) . '/?$',
			'index.php?' . self::QUERY_VAR . '=1',
			'top'
		);

		// Backwards compatibility for old v2 slug
		if ( 'digital-guide-box' === $slug ) {
			add_rewrite_rule(
				'^digital-guide-box-v2/?$',
				'index.php?' . self::QUERY_VAR . '=1',
				'top'
			);
		}
	}

	public static function add_query_vars( $vars ) {
		$vars[] = self::QUERY_VAR;
		return $vars;
	}

	public static function intercept_template() {
		$slug = self::get_endpoint_slug();

		$is_query = ( '1' === get_query_var( self::QUERY_VAR ) );

		// Fallback detection via REQUEST_URI
		$request_path = trim( parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH ), '/' );
		$is_direct    = ( $request_path === $slug || ( 'digital-guide-box' === $slug && $request_path === 'digital-guide-box-v2' ) );

		if ( $is_query || $is_direct ) {
			self::load_canvas_template();
			exit;
		}
	}

	public static function load_canvas_template() {
		status_header( 200 );
		nocache_headers();

		$template_path = DGBC_DIR . 'templates/box-app.php';
		if ( file_exists( $template_path ) ) {
			include $template_path;
		} else {
			wp_die( 'Digital-Guide-Box Template nicht gefunden.', 'Fehler', array( 'response' => 404 ) );
		}
	}

	public static function render_shortcode( $atts ) {
		ob_start();
		$template_path = DGBC_DIR . 'templates/box-app.php';
		if ( file_exists( $template_path ) ) {
			include $template_path;
		}
		return ob_get_clean();
	}
}
