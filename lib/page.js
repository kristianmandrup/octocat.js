'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Promise = require('q');
var Loggable = require('./loggable');

var DEFAULT_OPTIONS = {
    page: 1,
    per_page: 100,
    headers: {}
};

/**
 * Page that can be updated to iterate over pagination.
 * @type {Class}
 */

var Page = function (_Loggable) {
    _inherits(Page, _Loggable);

    function Page(client, uri, params) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_OPTIONS;

        _classCallCheck(this, Page);

        var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, 'Page', options));

        _this.list = [];
        _this.links = {};
        _this.client = client;
        _this.url = uri;
        _this.params = params || {};
        _this.options = options;
        return _this;
    }

    /**
     * Fetch current page.
     * @return {Promise<Page>}
     */


    _createClass(Page, [{
        key: 'fetch',
        value: function fetch(uri) {
            var _this2 = this;

            this.log('fetch', {
                uri: uri
            });
            var _options = this.options,
                page = _options.page,
                per_page = _options.per_page,
                headers = _options.headers;


            return this.client.get(this.url, _extends({}, this.params, {
                page: page,
                per_page: per_page
            }), {
                headers: headers
            }).then(function (response) {
                _this2.list = response.body;
                _this2.links = parseLinkHeader(response.headers.link);

                // Return itself
                return _this2;
            });
        }

        /**
         * Update the page by fetching a specific url.
         * @param {String} uri
         * @return {Promise<Page>}
         */

    }, {
        key: 'update',
        value: function update(uri) {
            this.url = uri;
            return this.fetch();
        }

        // Has next or previous page

    }, {
        key: 'hasNext',
        value: function hasNext() {
            return !!this.links.next;
        }
    }, {
        key: 'hasPrev',
        value: function hasPrev() {
            return !!this.links.prev;
        }

        /**
         * Fetch next page.
         * @return {Promise<Page>}
         */

    }, {
        key: 'next',
        value: function next() {
            if (!this.hasNext()) {
                return Promise.reject(new Error('Paginated results doesn\'t have nore page'));
            }
            return this.update(this.links.next);
        }

        /**
         * Fetch previous page.
         * @return {Promise<Page>}
         */

    }, {
        key: 'prev',
        value: function prev() {
            if (!this.hasPrev()) {
                return Promise.reject(new Error('Paginated results doesn\'t have a precedent page'));
            }
            return this.update(this.links.prev);
        }

        /**
         * Fetch all items by iterating over pages.
         * @return {Promise<Array>}
         */

    }, {
        key: 'all',
        value: function all() {
            var results = [];

            function handlePage(page) {
                results = results.concat(page.list);

                if (!page.hasNext()) {
                    return results;
                }
                return page.next().then(handlePage);
            }

            return Promise(handlePage(this));
        }
    }]);

    return Page;
}(Loggable);

/**
 * Extract next and prev from link header
 * @param  {String} header
 * @return {Object}
 */


function parseLinkHeader(header) {
    if (!header) {
        return {};
    }

    // Split parts by comma
    var parts = header.split(',');
    var links = {};

    // Parse each part into a named link
    parts.forEach(function (p) {
        var section = p.split(';');
        if (section.length != 2) {
            throw new Error('section could not be split on ";"');
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    });

    return links;
}

module.exports = Page;