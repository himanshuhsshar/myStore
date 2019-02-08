<?php
/**
 * Plugin Name:			Ocean Demo Import
 * Plugin URI:			https://oceanwp.org/extension/ocean-demo-import/
 * Description:			Import the OceanWP demo content, widgets and customizer settings with one click.
 * Version:				1.0.9
 * Author:				OceanWP
 * Author URI:			https://oceanwp.org/
 * Requires at least:	4.0.0
 * Tested up to:		4.9.8
 *
 * Text Domain: ocean-demo-import
 * Domain Path: /languages/
 *
 * @package Ocean_Demo_Import
 * @category Core
 * @author OceanWP
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns the main instance of Ocean_Demo_Import to prevent the need to use globals.
 *
 * @since  1.0.0
 * @return object Ocean_Demo_Import
 */
function Ocean_Demo_Import() {
	return Ocean_Demo_Import::instance();
} // End Ocean_Demo_Import()

Ocean_Demo_Import();

/**
 * Main Ocean_Demo_Import Class
 *
 * @class Ocean_Demo_Import
 * @version	1.0.0
 * @since 1.0.0
 * @package	Ocean_Demo_Import
 */
final class Ocean_Demo_Import {
	/**
	 * Ocean_Demo_Import The single instance of Ocean_Demo_Import.
	 * @var 	object
	 * @access  private
	 * @since 	1.0.0
	 */
	private static $_instance = null;

	/**
	 * The token.
	 * @var     string
	 * @access  public
	 * @since   1.0.0
	 */
	public $token;

	/**
	 * The version number.
	 * @var     string
	 * @access  public
	 * @since   1.0.0
	 */
	public $version;

	// Admin - Start
	/**
	 * The admin object.
	 * @var     object
	 * @access  public
	 * @since   1.0.0
	 */
	public $admin;

	/**
	 * Constructor function.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function __construct( $widget_areas = array() ) {
		$this->token 			= 'ocean-demo-import';
		$this->plugin_url 		= plugin_dir_url( __FILE__ );
		$this->plugin_path 		= plugin_dir_path( __FILE__ );
		$this->version 			= '1.0.9';

		define( 'ODI_PATH', $this->plugin_path );
		define( 'ODI_URL', $this->plugin_url );

		register_activation_hook( __FILE__, array( $this, 'install' ) );

		add_action( 'init', array( $this, 'load_plugin_textdomain' ) );
	}

	/**
	 * Main Ocean_Demo_Import Instance
	 *
	 * Ensures only one instance of Ocean_Demo_Import is loaded or can be loaded.
	 *
	 * @since 1.0.0
	 * @static
	 * @see Ocean_Demo_Import()
	 * @return Main Ocean_Demo_Import instance
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) )
			self::$_instance = new self();
		return self::$_instance;
	} // End instance()

	/**
	 * Load the localisation file.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function load_plugin_textdomain() {
		load_plugin_textdomain( 'ocean-demo-import', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}

	/**
	 * Cloning is forbidden.
	 *
	 * @since 1.0.0
	 */
	public function __clone() {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?' ), '1.0.0' );
	}

	/**
	 * Unserializing instances of this class is forbidden.
	 *
	 * @since 1.0.0
	 */
	public function __wakeup() {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?' ), '1.0.0' );
	}

	/**
	 * Installation.
	 * Runs on activation. Logs the version number and assigns a notice message to a WordPress option.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function install() {
		$this->_log_version_number();
	}

	/**
	 * Log the plugin version number.
	 * @access  private
	 * @since   1.0.0
	 * @return  void
	 */
	private function _log_version_number() {
		// Log the version number.
		update_option( $this->token . '-version', $this->version );
	}

} // End Class
