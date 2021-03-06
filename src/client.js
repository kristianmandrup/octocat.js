const Promise = require('q');
const is = require('is');
const url = require('url');
const querystring = require('querystring');
const base64 = require('js-base64').Base64;
const request = require('request');
const isAbsoluteUrl = require('is-absolute-url');
const joinURL = require('url-join');

const GitHubError = require('./error');
const {
    Base
} = require('./base')
/**
 * Client for the GitHub API.
 * @type {Class}
 */
class APIClient extends Base {
    constructor(config, options) {
        super('APIClient', options || config)
        this.opts = {
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
            request: {},
            ...config
        };
        this.log('APIClient:created', {
            opts: this.opts
        })
    }

    /**
     * Return the value for the authentication header.
     * @return {String}
     */
    getAuthorizationHeader() {
        const {
            token,
            username,
            password
        } = this.opts;

        this.log('getAuthorizationHeader', {
            token,
            username,
            password
        })
        if (token) {
            return `token ${this.opts.token}`;
        } else if (username) {
            return 'Basic ' + base64.encode(password ? `${username}:${password}` : username);
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
    url(httpMethod, method, params) {
        this.log('url', {
            httpMethod,
            method,
            params
        })
        let uri = isAbsoluteUrl(method) ? method : joinURL(this.opts.endpoint, method);

        const parsedUrl = url.parse(uri);
        const parsedParams = querystring.parse(parsedUrl.query);

        uri = url.format(parsedUrl);
        if (httpMethod == 'GET') {
            parsedUrl.search = '?' + querystring.stringify({
                ...params,
                ...parsedParams
            });
            uri = url.format(parsedUrl);
        }

        return uri;
    }

    /**
     * Parse an HTTP response to handle error.
     */
    onResponse(response, body, opts = {}) {
        this.log('onResponse', {
            statusCode: response.statusCode,
            body,
            opts
        })
        opts = {
            successOn: ['2XX'],
            ...opts
        };

        const statusCode = response ? response.statusCode : 0;
        const statusType = Math.floor(statusCode / 100) + 'XX';
        const success = opts.successOn.some(status => (status == statusType || status == statusCode));

        // Try parsing body
        if ((opts.json || !success) && is.string(body)) {
            try {
                body = JSON.parse(body);
            } catch (e) {
                // Ignore errors
            }
        }

        // Build result object
        const result = {
            response,
            statusCode,
            statusType,
            headers: response ? response.headers : {},
            body
        };

        if (!success) {
            throw GitHubError.createForResponse(result);
        }

        return result;
    }

    /**
     * Execute an API request.
     */
    request(httpMethod, method, params, opts = {}) {
        this.log('request', {
            httpMethod,
            method,
            params,
            opts
        })
        opts = {
            headers: {},
            json: true,
            process(r) {},
            ...opts
        };
        opts.accept = this._previewAccept(opts)

        httpMethod = httpMethod.toUpperCase();

        const d = Promise.defer();
        const uri = this.url(httpMethod, method, params);

        // Build request
        const r = request({
                ...this.opts.request,
                method: httpMethod,
                uri,
                json: opts.json,
                body: httpMethod != 'GET' ? params : undefined,
                headers: {
                    'User-Agent': this.opts.userAgent,
                    'Accept': this.opts.accept,
                    'Authorization': this.getAuthorizationHeader(),
                    ...(this.opts.request.headers || {}),
                    ...opts.headers
                }
            },
            (err, response, body) => {
                // reset special client headers used for preview APIs
                this.opts.accept = null

                if (err) {
                    return d.reject(err);
                }

                try {
                    const result = this.onResponse(response, body, opts);
                    d.resolve(result);
                } catch (e) {
                    d.reject(e);
                }
            }
        );

        opts.process(r);

        return d.promise;
    }

    /**
     * HTTP methods
     */
    get(uri, params, opts) {
        return this.request('GET', uri, params, opts);
    }
    post(uri, params, opts) {
        return this.request('POST', uri, params, opts);
    }
    patch(uri, params, opts) {
        return this.request('PATCH', uri, params, opts);
    }
    del(uri, params, opts) {
        return this.request('DELETE', uri, params, opts);
    }
}

module.exports = APIClient;
