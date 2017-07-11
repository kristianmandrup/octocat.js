'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource = require('./resource');

// https://developer.github.com/v3/integrations/
//
// To access the integration API, we must provide a custom media type in the
// Accept header.
var DEFAULT_HEADERS = {
    Accept: 'application/vnd.github.machine-man-preview+json'
};

/**
 * Model to represent an installation.
 * @type {Resource}
 */

var Installation = function (_Resource) {
    _inherits(Installation, _Resource);

    function Installation() {
        _classCallCheck(this, Installation);

        return _possibleConstructorReturn(this, (Installation.__proto__ || Object.getPrototypeOf(Installation)).apply(this, arguments));
    }

    _createClass(Installation, [{
        key: 'url',


        /**
         * Return API endpoint for this application
         */
        value: function url() {
            var _get2;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_get2 = _get(Installation.prototype.__proto__ || Object.getPrototypeOf(Installation.prototype), 'url', this)).call.apply(_get2, [this, 'installation'].concat(args));
        }

        /**
         * List repositroy for an user or all.
         * @param  {String} userID?
         * @return {Authorization}
         */

    }, {
        key: 'repos',
        value: function repos(userID) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var params = {};
            if (userID) {
                params.user_id = userID;
            }

            return this.page('repositories', params, _extends({}, options, {
                headers: DEFAULT_HEADERS
            }));
        }
    }]);

    return Installation;
}(Resource);

module.exports = Installation;