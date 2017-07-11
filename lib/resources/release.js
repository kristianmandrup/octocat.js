'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Promise = require('q');
var is = require('is');
var fs = require('fs');
var path = require('path');
var mime = require('mime-types');
var querystring = require('querystring');
var progress = require('progress-stream');

var Resource = require('./resource');
var ReleaseAsset = require('./release_asset');

/**
 * Model to represent a release.
 * @type {Resource}
 */

var Release = function (_Resource) {
    _inherits(Release, _Resource);

    function Release(client, repo, id) {
        _classCallCheck(this, Release);

        var _this = _possibleConstructorReturn(this, (Release.__proto__ || Object.getPrototypeOf(Release)).call(this, client));

        _this.repo = repo;
        _this.id = id;
        _this._infos = null;
        return _this;
    }

    /**
     * Return API endpoint for this asset.
     */


    _createClass(Release, [{
        key: 'url',
        value: function url() {
            var _repo;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_repo = this.repo).url.apply(_repo, ['releases/' + this.id].concat(args));
        }
    }, {
        key: 'asset',
        value: function asset(id) {
            return this.resource(ReleaseAsset, id);
        }

        // Get details about the release

    }, {
        key: 'info',
        value: function info() {
            var that = this;

            return this.get('').get('body').tap(function (infos) {
                that._infos = infos;
            });
        }

        // Edit this release

    }, {
        key: 'edit',
        value: function edit(params) {
            return this.patch('', params).get('body');
        }

        /**
         * Upload an asset
         */

    }, {
        key: 'upload',
        value: function upload(output, opts) {
            var that = this;
            var originalOutput = void 0;

            opts = _extends({
                name: null,
                label: undefined,
                mime: null,
                size: null
            }, opts);

            // Normalize to a stream
            if (is.string(output)) {
                originalOutput = output;
                opts.name = opts.name || path.basename(output);
                output = fs.createReadStream(output);
            } else {
                if (!opts.name || !opts.size) {
                    throw new Error('Need \'name\' and \'size\' options when uploading a stream');
                }
            }

            // Detect mime type
            if (!opts.mime) {
                opts.mime = mime.lookup(opts.name) || 'application/octet-stream';
            }

            return Promise()

            // Detect size
            .then(function () {
                if (opts.size) {
                    return opts.size;
                }

                return Promise.nfcall(fs.stat, originalOutput).get('size');
            }).then(function (size) {
                opts.size = size;
                return that._infos || that.info();
            }).then(function (release) {
                var d = Promise.defer();

                var uploadUrl = release.upload_url.replace(/\{(\S+)\}/, '') + '?' + querystring.stringify({
                    name: opts.name,
                    label: opts.label
                });

                var prg = progress({
                    length: opts.size,
                    time: 100
                });

                prg.on('progress', function (state) {
                    d.notify(state);
                });

                output.on('error', function (err) {
                    d.reject(err);
                });

                that.client.post(uploadUrl, undefined, {
                    json: false,
                    headers: {
                        'Content-Type': opts.mime,
                        'Content-Length': opts.size
                    },
                    process: function process(r) {
                        output.pipe(prg).pipe(r);
                    }
                }).then(function () {
                    d.resolve();
                }, function (err) {
                    d.reject(err);
                });

                return d.promise;
            });
        }

        // Remove the release

    }, {
        key: 'destroy',
        value: function destroy() {
            return this.del('/');
        }
    }]);

    return Release;
}(Resource);

module.exports = Release;