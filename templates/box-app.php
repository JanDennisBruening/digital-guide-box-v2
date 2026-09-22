<?php
/**
 * Standalone Canvas Template for Digital Guide Box (Configurable Edition).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$assets_url  = DGBC_URL . 'assets/';
$verify_url  = rest_url( 'digital-guide-box-v2/v1/verify' );
$lock_url    = rest_url( 'digital-guide-box-v2/v1/lock' );
$inquiry_url = rest_url( 'digital-guide-box-v2/v1/inquiry' );
$chat_url    = rest_url( 'digital-guide-box-v2/v1/chat' );
$password    = DGBC_Auth::get_expected_password();
$settings    = DGBC_Settings::get_all();
$guides      = DGBC_Content::get_guides();
$news        = DGBC_Content::get_news();

$fav_icon = ! empty( $settings['profile']['avatar_url'] )
	? $settings['profile']['avatar_url']
	: ( $assets_url . 'profilbild.png' );
?><!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Digital Guide Box · <?php echo esc_html( $settings['profile']['name'] ); ?></title>
    <meta name="description" content="<?php echo esc_attr( $settings['gate']['subtitle'] ); ?>" />
    <meta name="robots" content="noindex, nofollow" />
    <meta property="og:title" content="Digital Guide Box · <?php echo esc_attr( $settings['profile']['name'] ); ?>" />
    <meta property="og:description" content="<?php echo esc_attr( $settings['gate']['subtitle'] ); ?>" />
    <link rel="icon" href="<?php echo esc_url( $fav_icon ); ?>" type="image/png" sizes="256x256" />
    <link rel="apple-touch-icon" href="<?php echo esc_url( $fav_icon ); ?>" type="image/png" sizes="256x256" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="<?php echo esc_url( $assets_url . 'app.css?ver=' . DGBC_VERSION ); ?>" />
    <script>
      window.DGB_CONFIG = {
        assetsUrl: <?php echo wp_json_encode( $assets_url ); ?>,
        verifyUrl: <?php echo wp_json_encode( $verify_url ); ?>,
        lockUrl: <?php echo wp_json_encode( $lock_url ); ?>,
        inquiryUrl: <?php echo wp_json_encode( $inquiry_url ); ?>,
        chatUrl: <?php echo wp_json_encode( $chat_url ); ?>,
        siteUrl: <?php echo wp_json_encode( home_url() ); ?>,
        password: <?php echo wp_json_encode( $password ); ?>,
        settings: <?php echo wp_json_encode( $settings ); ?>,
        guides: <?php echo wp_json_encode( $guides ); ?>,
        news: <?php echo wp_json_encode( $news ); ?>
      };
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="<?php echo esc_url( $assets_url . 'app.js?ver=' . DGBC_VERSION ); ?>"></script>
  </body>
</html>
