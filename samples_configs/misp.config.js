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
        //rejectUnauthorized: false
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
