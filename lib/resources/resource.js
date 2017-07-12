'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var joinURL = require('url-join');
var Page = require('../page');
var Loggable = require('../loggable');

var PREVIEW_ACCEPT = 'application/vnd.github.korra-preview';
/**
 * Resource from the API.
 * @type {Class}
 */

var Resource = function (_Loggable) {
    _inherits(Resource, _Loggable);

    function Resource(client) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Resource);

        var _this = _possibleConstructorReturn(this, (Resource.__proto__ || Object.getPrototypeOf(Resource)).call(this, 'Resource', opts));

        _this.client = client;

        if (!client) {
            throw new Error('Resource should create with a client as first argument');
        }

        if (opts.preview) _this.configurePreviewAPI();
        return _this;
    }

    _createClass(Resource, [{
        key: 'configurePreviewAPI',
        value: function configurePreviewAPI() {
            this.log('configurePreview', {
                accept: PREVIEW_ACCEPT
            });
            this.client.opts.accept = PREVIEW_ACCEPT;
        }

        /**
         * Create an url.
         * @return {String}
         */

    }, {
        key: 'url',
        value: function url() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            args = args.filter(function (arg) {
                return Boolean(arg);
            });
            return joinURL.apply(undefined, _toConsumableArray(args));
        }

        /**
         * HTTP methods
         */

    }, {
        key: 'get',
        value: function get(uri, params, opts) {
            return this.client.get(this.url(uri), params, opts);
        }
    }, {
        key: 'post',
        value: function post(uri, params, opts) {
            return this.client.post(this.url(uri), params, opts);
        }
    }, {
        key: 'patch',
        value: function patch(uri, params, opts) {
            return this.client.patch(this.url(uri), params, opts);
        }
    }, {
        key: 'put',
        value: function put(uri, params, opts) {
            return this.client.put(this.url(uri), params, opts);
        }
    }, {
        key: 'del',
        value: function del(uri, params, opts) {
            return this.client.del(this.url(uri), params, opts);
        }

        /**
         * Create a subresource for this resource.
         * @param {ResourceClass} Type
         * @param {Mixed} ...args
         * @return {Resource}
         */

    }, {
        key: 'resource',
        value: function resource(Type) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            return new (Function.prototype.bind.apply(Type, [null].concat([this.client, this], args)))();
        }

        /**
         * Return a pagination (already fetched).
         *
         * @param  {String} uri
         * @param  {Object} params
         * @param  {Object} options
         * @return {Promise<Page>}
         */

    }, {
        key: 'page',
        value: function page(uri, params, options) {
            this.log('page', {
                uri: uri,
                params: params,
                options: options
            });
            var page = new Page(this.client, this.url(uri), params, options);

            return page.fetch();
        }
    }]);

    return Resource;
}(Loggable);

module.exports = Resource;