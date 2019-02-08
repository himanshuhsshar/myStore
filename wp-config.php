<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'myStore');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'D5bsq2Qz//jo~*J0tQ-qE82d_Kr`a8j5HI;|]&,>#si6Mmx!NFi,NaxoB!tkT2H5');
define('SECURE_AUTH_KEY',  '{`t&z[ad;eD^_UXZJC&*oiwwDN?GUX0NP5ZXY2=#V&LojZXv{^owm,6kK*E3rV#&');
define('LOGGED_IN_KEY',    'J4G+<;[lIWXBR-Mg&iY0_FKDEvH:F$4R%G9D)cv<yXpTp^pb*4{HgqLuFs=$Rdrc');
define('NONCE_KEY',        ']U@ %ZinN][,vwL=^as 8MG3AgVgjP%f6MAB}M1#9G_L*DP<VN `[z]XA&n0O9GB');
define('AUTH_SALT',        '/|GYEv@z+J[PU!h@vp,vYGZzo%g{_&W~Q/Su;8^O #Z6Li--gpp+O[dh,rHmqME<');
define('SECURE_AUTH_SALT', 'K[|6x=R<R#]Z:1fI5+%Y,?r7:VlW+XXL<KggCID`p*UZqW:%V7kXMCL+aI&JBgxw');
define('LOGGED_IN_SALT',   'Ind5)PCPap0za8kL9+2f@(9_#zV.JjBf$V?@@1/T5gZZ,A^`Qn7:5xU1k~YT=Ew!');
define('NONCE_SALT',       '?NyQ?$Nx.h7l!_}niui6&QH-&d/-IJB_)YN5eF$yqdubmld9Cl~sz@2)$4!|/gvf');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);
set_time_limit(600);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
