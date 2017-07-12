'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Promise = require('q');
var Resource = require('./resource');

/**
 * Model to represent an organization.
 * @type {Resource}
 */

var Organization = function (_Resource) {
    _inherits(Organization, _Resource);

    function Organization(client, github, id) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _classCallCheck(this, Organization);

        var _this = _possibleConstructorReturn(this, (Organization.__proto__ || Object.getPrototypeOf(Organization)).call(this, client, Object.assign({
            preview: true
        }, opts)));

        _this.id = id;
        return _this;
    }

    /**
     * Return API endpoint for this organization
     */


    _createClass(Organization, [{
        key: 'url',
        value: function url() {
            var _get2;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_get2 = _get(Organization.prototype.__proto__ || Object.getPrototypeOf(Organization.prototype), 'url', this)).call.apply(_get2, [this, 'orgs/' + this.id].concat(args));
        }

        // Get a single organization

    }, {
        key: 'info',
        value: function info() {
            return this.get('').get('body');
        }

        // Edit this organization

    }, {
        key: 'edit',
        value: function edit(params) {
            return this.patch('', params).get('body');
        }

        // Check membership
        // https://developer.github.com/v3/orgs/members/#check-membership

    }, {
        key: 'isMember',
        value: function isMember(user) {
            return this.get('members/' + user).then(function () {
                return true;
            }, function () {
                return Promise(false);
            });
        }

        /**
         * Get organisation members
         * https://developer.github.com/v3/orgs/members/#members-list
         * @param {Object} params
         *   {String} filter (2fa_disabled, all)
         *   {String} role (all, admin, member)
         * @param {Object} options
         * @return {Promise<Page>}
         */

    }, {
        key: 'members',
        value: function members(params, options) {
            return this.page('members', params, options);
        }

        // Public members
        // https://developer.github.com/v3/orgs/members/#members-list

    }, {
        key: 'publicMembers',
        value: function publicMembers(options) {
            return this.page('public_members', {}, options);
        }

        /**
         * List repositories for this organization.
         * https://developer.github.com/v3/repos/#list-organization-repositories
         *
         * @param  {Object} options
         * @return {Promise<Page>}
         */

    }, {
        key: 'repos',
        value: function repos(options) {
            return this.page('repos', {}, options);
        }

        // Create a new repository
        // https://developer.github.com/v3/repos/#create

    }, {
        key: 'createRepo',
        value: function createRepo(info) {
            return this.post('repos', info).get('body');
        }
    }]);

    return Organization;
}(Resource);

module.exports = Organization;