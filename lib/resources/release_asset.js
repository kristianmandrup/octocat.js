'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var is = require('is');
var Promise = require('q');
var fs = require('fs');
var Resource = require('./resource');

/**
 * Model to represent an asset in an release.
 * @type {Resource}
 */

var ReleaseAsset = function (_Resource) {
    _inherits(ReleaseAsset, _Resource);

    function ReleaseAsset(client, release, id) {
        _classCallCheck(this, ReleaseAsset);

        var _this = _possibleConstructorReturn(this, (ReleaseAsset.__proto__ || Object.getPrototypeOf(ReleaseAsset)).call(this, client));

        _this.release = release;
        _this.id = id;
        _this._infos = null;
        return _this;
    }

    /**
     * Return API endpoint for this asset.
     */


    _createClass(ReleaseAsset, [{
        key: 'url',
        value: function url() {
            return this.release.repo.url('releases/assets/' + this.id);
        }

        // Get details about this asset

    }, {
        key: 'info',
        value: function info() {
            return this.get('').get('body');
        }

        /**
         * Download this asset into a file "output"
         * @param  {String|Stream} output
         * @return {Promise}
         */

    }, {
        key: 'download',
        value: function download(output) {
            var d = Promise.defer();

            // Normalize to a stream
            if (is.string(output)) {
                output = fs.createReadStream(output);
            }

            output.on('error', function (err) {
                d.reject(err);
            });

            this.client.get(this.url(), {}, {
                json: false,
                headers: {
                    'Accept': 'application/octet-stream'
                },
                process: function process(r) {
                    r.pipe(output);
                }
            }).then(function () {
                d.resolve();
            }, function (err) {
                d.reject(err);
            });

            return d.promise;
        }
    }]);

    return ReleaseAsset;
}(Resource);

module.exports = ReleaseAsset;