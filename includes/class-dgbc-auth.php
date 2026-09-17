<?php
/**
 * Authentication and Gate Access Protection for Digital Guide Box (Configurable Edition).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class DGBC_Auth {

	const COOKIE_NAME = 'dgbc_auth_token';

	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
	}

	public static function register_rest_routes() {
		register_rest_route(
			'digital-guide-box-v2/v1',
			'/verify',
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'rest_verify' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'digital-guide-box-v2/v1',
			'/lock',
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'rest_lock' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	public static function get_expected_password() {
		$access = DGBC_Settings::get_section( 'access' );
		return ! empty( $access['password'] ) ? $access['password'] : 'digitalguidejan';
	}

	public static function get_session_duration() {
		$access = DGBC_Settings::get_section( 'access' );
		return ! empty( $access['session_duration'] ) ? absint( $access['session_duration'] ) : ( 8 * HOUR_IN_SECONDS );
	}

	public static function verify_password( $input ) {
		$expected = self::get_expected_password();
		return hash_equals( (string) $expected, (string) $input );
	}

	public static function create_token() {
		$duration = self::get_session_duration();
		$expires  = time() + $duration;
		$key      = wp_salt( 'auth' );
		$hmac     = hash_hmac( 'sha256', 'dgbc_session_' . $expires, $key );
		return $expires . '|' . $hmac;
	}

	public static function validate_token( $token ) {
		if ( empty( $token ) || ! is_string( $token ) ) {
			return false;
		}

		$parts = explode( '|', $token, 2 );
		if ( count( $parts ) !== 2 ) {
			return false;
		}

		list( $expires, $hmac ) = $parts;
		$expires = intval( $expires );

		if ( $expires < time() ) {
			return false;
		}

		$key           = wp_salt( 'auth' );
		$expected_hmac = hash_hmac( 'sha256', 'dgbc_session_' . $expires, $key );

		return hash_equals( $expected_hmac, $hmac );
	}

	public static function is_authorized() {
		if ( isset( $_COOKIE[ self::COOKIE_NAME ] ) && self::validate_token( $_COOKIE[ self::COOKIE_NAME ] ) ) {
			return true;
		}
		return false;
	}

	public static function set_auth_cookie() {
		$token    = self::create_token();
		$duration = self::get_session_duration();
		$expires  = time() + $duration;
		$secure   = is_ssl();

		setcookie( self::COOKIE_NAME, $token, $expires, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN, $secure, true );
		setcookie( 'dgbc_authorized', '1', $expires, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN, $secure, false );
	}

	public static function clear_auth_cookie() {
		$past = time() - 3600;
		setcookie( self::COOKIE_NAME, '', $past, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN );
		setcookie( 'dgbc_authorized', '', $past, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN );
	}

	public static function rest_verify( WP_REST_Request $request ) {
		$params   = $request->get_json_params();
		$password = isset( $params['password'] ) ? trim( (string) $params['password'] ) : '';

		if ( empty( $password ) ) {
			return new WP_REST_Response( array( 'success' => false, 'message' => 'Bitte gib ein Passwort ein.' ), 400 );
		}

		if ( self::verify_password( $password ) ) {
			self::set_auth_cookie();
			$duration = self::get_session_duration();
			return new WP_REST_Response(
				array(
					'success'   => true,
					'message'   => 'Zugang freigeschaltet.',
					'expiresIn' => $duration,
				),
				200
			);
		}

		return new WP_REST_Response(
			array(
				'success' => false,
				'message' => 'Das Passwort ist leider nicht korrekt. Bitte prüfe deine Eingabe.',
			),
			401
		);
	}

	public static function rest_lock( WP_REST_Request $request ) {
		self::clear_auth_cookie();
		return new WP_REST_Response(
			array(
				'success' => true,
				'message' => 'Box geschlossen.',
			),
			200
		);
	}
}
