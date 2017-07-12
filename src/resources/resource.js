const joinURL = require('url-join');
const Page = require('../page');
const {
    Base,
    preview
} = require('../base')

/**
 * Resource from the API.
 * @type {Class}
 */
class Resource extends Base {
    constructor(client, opts = {}) {
        super('Resource', opts)
        this.client = client;

        if (!client) {
            throw new Error('Resource should create with a client as first argument');
        }

        if (opts.preview) {
            this.client.opts.accept = this._previewAccept(opts.preview);
        }
    }

    /**
     * Create an url.
     * @return {String}
     */
    url(...args) {
        args = args.filter(arg => Boolean(arg));
        return joinURL(...args);
    }

    /**
     * HTTP methods
     */
    get(uri, params, opts) {
        return this.client.get(this.url(uri), params, opts);
    }
    post(uri, params, opts) {
        return this.client.post(this.url(uri), params, opts);
    }
    patch(uri, params, opts) {
        return this.client.patch(this.url(uri), params, opts);
    }
    put(uri, params, opts) {
        return this.client.put(this.url(uri), params, opts);
    }
    del(uri, params, opts) {
        return this.client.del(this.url(uri), params, opts);
    }

    /**
     * Create a subresource for this resource.
     * @param {ResourceClass} Type
     * @param {Mixed} ...args
     * @return {Resource}
     */
    resource(Type, ...args) {
        return new Type(this.client, this, ...args);
    }

    /**
     * Return a pagination (already fetched).
     *
     * @param  {String} uri
     * @param  {Object} params
     * @param  {Object} options
     * @return {Promise<Page>}
     */
    page(uri, params, options) {
        // TODO: use RegExp and find to match uri with one of preview keys
        const name = preview[uri]
        const accept = this._previewAccept(name)
        if (accept) {
            options.header = {
                accept
            }
        }

        this.log('page', {
            uri,
            params,
            options
        })
        const page = new Page(
            this.client,
            this.url(uri),
            params,
            options
        );

        return page.fetch();
    }
}

module.exports = Resource;
