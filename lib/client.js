'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = require('q');
var is = require('is');
var _url = require('url');
var querystring = require('querystring');
var base64 = require('js-base64').Base64;
var _request = require('request');
var isAbsoluteUrl = require('is-absolute-url');
var joinURL = require('url-join');

var GitHubError = require('./error');

/**
 * Client for the GitHub API.
 * @type {Class}
 */

var APIClient = function () {
    function APIClient() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, APIClient);

        this.opts = _extends({
            // Endpoint for the API
            endpoint: 'https://api.github.com',
            // User-Agent to use for requests
            userAgent: 'octocat.js',
            // Access token
            token: null,
            // Basic auth
            username: null,
            password: null,
            // Custom request
            request: {}
        }, opts);
    }

    /**
     * Return the value for the authentication header.
     * @return {String}
     */


    _createClass(APIClient, [{
        key: 'getAuthorizationHeader',
        value: function getAuthorizationHeader() {
            var _opts = this.opts,
                token = _opts.token,
                username = _opts.username,
                password = _opts.password;


            if (token) {
                return 'token ' + this.opts.token;
            } else if (username) {
                return 'Basic ' + base64.encode(password ? username + ':' + password : username);
            } else {
                return undefined;
            }
        }

        /**
         * Get the API URL to request.
         * @param  {String} httpMethod
         * @param  {String} method
         * @param  {Object} params
         * @return {String}
         */

    }, {
        key: 'url',
        value: function url(httpMethod, method, params) {
            var uri = isAbsoluteUrl(method) ? method : joinURL(this.opts.endpoint, method);

            var parsedUrl = _url.parse(uri);
            var parsedParams = querystring.parse(parsedUrl.query);

            uri = _url.format(parsedUrl);
            if (httpMethod == 'GET') {
                parsedUrl.search = '?' + querystring.stringify(_extends({}, params, parsedParams));
                uri = _url.format(parsedUrl);
            }

            return uri;
        }

        /**
         * Parse an HTTP response to handle error.
         */

    }, {
        key: 'onResponse',
        value: function onResponse(response, body) {
            var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            opts = _extends({
                successOn: ['2XX']
            }, opts);

            var statusCode = response ? response.statusCode : 0;
            var statusType = Math.floor(statusCode / 100) + 'XX';
            var success = opts.successOn.some(function (status) {
                return status == statusType || status == statusCode;
            });

            // Try parsing body
            if ((opts.json || !success) && is.string(body)) {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    // Ignore errors
                }
            }

            // Build result object
            var result = {
                response: response,
                statusCode: statusCode,
                statusType: statusType,
                headers: response ? response.headers : {},
                body: body
            };

            if (!success) {
                throw GitHubError.createForResponse(result);
            }

            return result;
        }

        /**
         * Execute an API request.
         */

    }, {
        key: 'request',
        value: function request(httpMethod, method, params) {
            var _this = this;

            var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            opts = _extends({
                headers: {},
                json: true,
                process: function process(r) {}
            }, opts);

            httpMethod = httpMethod.toUpperCase();

            var d = Promise.defer();
            var uri = this.url(httpMethod, method, params);

            // Build request
            var r = _request(_extends({}, this.opts.request, {
                method: httpMethod,
                uri: uri,
                json: opts.json,
                body: httpMethod != 'GET' ? params : undefined,
                headers: _extends({
                    'User-Agent': this.opts.userAgent,
                    'Authorization': this.getAuthorizationHeader()
                }, this.opts.request.headers || {}, opts.headers)
            }), function (err, response, body) {
                if (err) {
                    return d.reject(err);
                }

                try {
                    var result = _this.onResponse(response, body, opts);
                    d.resolve(result);
                } catch (e) {
                    d.reject(e);
                }
            });

            opts.process(r);

            return d.promise;
        }

        /**
         * HTTP methods
         */

    }, {
        key: 'get',
        value: function get(uri, params, opts) {
            return this.request('GET', uri, params, opts);
        }
    }, {
        key: 'post',
        value: function post(uri, params, opts) {
            return this.request('POST', uri, params, opts);
        }
    }, {
        key: 'patch',
        value: function patch(uri, params, opts) {
            return this.request('PATCH', uri, params, opts);
        }
    }, {
        key: 'del',
        value: function del(uri, params, opts) {
            return this.request('DELETE', uri, params, opts);
        }
    }]);

    return APIClient;
}();

module.exports = APIClient;