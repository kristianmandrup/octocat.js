'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource = require('./resource');

/**
 * Resource to model an oauth authorization.
 * https://developer.github.com/v3/oauth_authorizations
 *
 * @type {Resource}
 */

var Authorization = function (_Resource) {
    _inherits(Authorization, _Resource);

    function Authorization(client, app, tokenID) {
        _classCallCheck(this, Authorization);

        var _this = _possibleConstructorReturn(this, (Authorization.__proto__ || Object.getPrototypeOf(Authorization)).call(this, client));

        _this.app = app;
        _this.token = tokenID;
        return _this;
    }

    /**
     * Return API endpoint for this authorization
     */


    _createClass(Authorization, [{
        key: 'url',
        value: function url() {
            var _app;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_app = this.app).url.apply(_app, ['tokens/' + this.token].concat(args));
        }

        /**
         * Get a token resource for this application.
         * @param  {String} tokenID
         * @return {Authorization}
         */

    }, {
        key: 'token',
        value: function token(tokenID) {
            return this.resource(Authorization, tokenID);
        }

        /**
         * Get details about the authorization
         * https://developer.github.com/v3/oauth_authorizations/#check-an-authorization
         * @return {Promise<JSON>}
         */

    }, {
        key: 'info',
        value: function info() {
            return this.get('').get('body');
        }

        /**
         * Reset an authorization
         * https://developer.github.com/v3/oauth_authorizations/#reset-an-authorization
         * @return {Promise<JSON>}
         */

    }, {
        key: 'reset',
        value: function reset() {
            return this.post('').get('body');
        }

        /**
         * Revoke an authorization for an application
         * https://developer.github.com/v3/oauth_authorizations/#revoke-an-authorization-for-an-application
         * @return {Promise<JSON>}
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            return this.del('').get('body');
        }
    }]);

    return Authorization;
}(Resource);

module.exports = Authorization;