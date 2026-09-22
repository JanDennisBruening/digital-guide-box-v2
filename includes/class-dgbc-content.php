<?php
/**
 * Content Manager for Digital Guide Box (Configurable Edition).
 * Manages all Guides (Anleitungen) and News (Neuigkeiten).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class DGBC_Content {

	const OPTION_GUIDES = 'dgbc_all_guides';
	const OPTION_NEWS   = 'dgbc_all_news';

	/**
	 * Load default guides from bundled JSON file.
	 */
	public static function get_default_guides() {
		$file = DGBC_DIR . 'includes/data/default-guides.json';
		if ( file_exists( $file ) ) {
			$json = file_get_contents( $file );
			$data = json_decode( $json, true );
			if ( is_array( $data ) ) {
				return $data;
			}
		}
		return array();
	}

	/**
	 * Load default news from bundled JSON file.
	 */
	public static function get_default_news() {
		$file = DGBC_DIR . 'includes/data/default-news.json';
		if ( file_exists( $file ) ) {
			$json = file_get_contents( $file );
			$data = json_decode( $json, true );
			if ( is_array( $data ) ) {
				return $data;
			}
		}
		return array();
	}

	/**
	 * Retrieve all guides. If not stored in DB, returns defaults.
	 */
	public static function get_guides() {
		$stored = get_option( self::OPTION_GUIDES, null );
		if ( is_array( $stored ) ) {
			return $stored;
		}
		return self::get_default_guides();
	}

	/**
	 * Save the entire guides array.
	 */
	public static function save_guides( $guides ) {
		if ( ! is_array( $guides ) ) {
			$guides = array();
		}
		return update_option( self::OPTION_GUIDES, $guides, 'no' );
	}

	/**
	 * Get a single guide by ID.
	 */
	public static function get_guide( $id ) {
		$guides = self::get_guides();
		foreach ( $guides as $guide ) {
			if ( isset( $guide['id'] ) && $guide['id'] === $id ) {
				return $guide;
			}
		}
		return null;
	}

	/**
	 * Save or update a single guide.
	 */
	public static function save_guide( $guide_data ) {
		$guides = self::get_guides();
		$id     = sanitize_key( $guide_data['id'] ?? '' );
		if ( empty( $id ) ) {
			$id = 'guide-' . uniqid();
			$guide_data['id'] = $id;
		}

		$replaced = false;
		foreach ( $guides as $idx => $guide ) {
			if ( ( $guide['id'] ?? '' ) === $id ) {
				$guides[ $idx ] = $guide_data;
				$replaced = true;
				break;
			}
		}

		if ( ! $replaced ) {
			array_unshift( $guides, $guide_data );
		}

		self::save_guides( $guides );
		return $id;
	}

	/**
	 * Delete a single guide by ID.
	 */
	public static function delete_guide( $id ) {
		$guides = self::get_guides();
		$filtered = array_values( array_filter( $guides, function( $g ) use ( $id ) {
			return ( ( $g['id'] ?? '' ) !== $id );
		} ) );
		return self::save_guides( $filtered );
	}

	/**
	 * Reset guides to default values.
	 */
	public static function reset_guides() {
		return delete_option( self::OPTION_GUIDES );
	}

	/**
	 * Retrieve all news. If not stored in DB, returns defaults plus any legacy custom_news.
	 */
	public static function get_news() {
		$stored = get_option( self::OPTION_NEWS, null );
		if ( is_array( $stored ) ) {
			return $stored;
		}

		// Initialize from defaults
		$default_news = self::get_default_news();

		// Check for legacy custom_news in settings
		$settings = DGBC_Settings::get_all();
		$legacy   = $settings['custom_news'] ?? array();
		if ( ! empty( $legacy ) && is_array( $legacy ) ) {
			// Prepend legacy custom news
			return array_merge( $legacy, $default_news );
		}

		return $default_news;
	}

	/**
	 * Save the entire news array.
	 */
	public static function save_news( $news ) {
		if ( ! is_array( $news ) ) {
			$news = array();
		}
		return update_option( self::OPTION_NEWS, $news, 'no' );
	}

	/**
	 * Get a single news item by ID.
	 */
	public static function get_news_item( $id ) {
		$news = self::get_news();
		foreach ( $news as $item ) {
			if ( isset( $item['id'] ) && $item['id'] === $id ) {
				return $item;
			}
		}
		return null;
	}

	/**
	 * Save or update a single news item.
	 */
	public static function save_news_item( $item_data ) {
		$news = self::get_news();
		$id   = sanitize_key( $item_data['id'] ?? '' );
		if ( empty( $id ) ) {
			$id = 'news-' . uniqid();
			$item_data['id'] = $id;
		}

		$replaced = false;
		foreach ( $news as $idx => $item ) {
			if ( ( $item['id'] ?? '' ) === $id ) {
				$news[ $idx ] = $item_data;
				$replaced = true;
				break;
			}
		}

		if ( ! $replaced ) {
			array_unshift( $news, $item_data );
		}

		self::save_news( $news );
		return $id;
	}

	/**
	 * Delete a single news item by ID.
	 */
	public static function delete_news_item( $id ) {
		$news = self::get_news();
		$filtered = array_values( array_filter( $news, function( $n ) use ( $id ) {
			return ( ( $n['id'] ?? '' ) !== $id );
		} ) );
		return self::save_news( $filtered );
	}

	/**
	 * Reset news to default values.
	 */
	public static function reset_news() {
		return delete_option( self::OPTION_NEWS );
	}
}
