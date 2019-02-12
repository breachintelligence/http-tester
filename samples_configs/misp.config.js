/**
 * The config file should contain your request and integration options.
 * @type {{}}
 */
module.exports = {
  /**
   * URL to your MISP server to include the schema (i.e., http:// or https://) and port (if not 80 or 443).  No
   * trailing slash is required.
   */
  url: 'https://<yourhost>',
  apiKey: '',
  /**
   * HTTP Request related option can be set here.  For a full list of options please see:
   * https://github.com/request/request#requestoptions-callback
   */
  request: {
    // Provide the path to your certFile. Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    cert: '',
    // Provide the path to your private key. Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    key: '',
    // Provide the key passphrase if required.  Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    passphrase: '',
    // Provide the Certificate Authority. Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    ca: '',
    // An HTTP proxy to be used. Supports proxy Auth with Basic Auth, identical to support for
    // the url parameter (by embedding the auth info in the uri)
    proxy: '',
    /**
     * If set to false, the integration will ignore SSL errors.  This will allow the integration to connect
     * to the MISP servers without valid SSL certificates.  Please note that we do NOT recommending setting this
     * to false in a production environment.
     */
    rejectUnauthorized: true
  },
  /**
   * Environment variables can be set here.  Environment variables are case sensitive.  Setting the variable to
   * "null", will unset the environment variable.
   */
  environment: {
    HTTPS_PROXY: null,
    https_proxy: null,
    HTTP_PROXY: null,
    http_proxy: null,
    NO_PROXY: null,
    no_proxy: null
  }
};
