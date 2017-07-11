'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource = require('./resource');

/**
 * Model to represent an user.
 * @type {Resource}
 */

var User = function (_Resource) {
    _inherits(User, _Resource);

    function User(client, github, id) {
        _classCallCheck(this, User);

        var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, client, {
            preview: true
        }));

        _this.id = id;
        return _this;
    }

    /**
     * Return API endpoint for this user
     */


    _createClass(User, [{
        key: 'url',
        value: function url() {
            var _get2;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_get2 = _get(User.prototype.__proto__ || Object.getPrototypeOf(User.prototype), 'url', this)).call.apply(_get2, [this, this.id ? 'users/' + this.id : 'user'].concat(args));
        }
        // Get a single user

    }, {
        key: 'info',
        value: function info() {
            return this.get('').get('body');
        }

        // Edit authenticated user

    }, {
        key: 'edit',
        value: function edit(params) {
            return this.patch('', params).get('body');
        }

        /**
         * List repositories for this user.
         * https://developer.github.com/v3/repos/#list-your-repositories
         *
         * @param  {Object} options
         * @return {Promise<Page>}
         */

    }, {
        key: 'repos',
        value: function repos(options) {
            return this.page('repos', {}, options);
        }

        /**
         * List teams for this user.
         * https://developer.github.com/v3/orgs/teams/#list-user-teams
         *
         * @param  {Object} options
         * @return {Promise<Page>}
         */

    }, {
        key: 'teams',
        value: function teams(options) {
            return this.page('teams', {}, options);
        }

        /**
         * List organizations for this user.
         * https://developer.github.com/v3/orgs/#list-your-organizations
         *
         * @param  {Object} options
         * @return {Promise<Page>}
         */

    }, {
        key: 'orgs',
        value: function orgs(options) {
            return this.page('orgs', {}, options);
        }

        // Create a new repository
        // https://developer.github.com/v3/repos/#create

    }, {
        key: 'createRepo',
        value: function createRepo(info) {
            return this.post('repos', info).get('body');
        }

        // Add email address(es)
        // https://developer.github.com/v3/users/emails/#add-email-addresses

    }, {
        key: 'addUserEmails',
        value: function addUserEmails(emails) {
            return this.post('emails', emails).get('body');
        }

        // Delete email address(es)
        // https://developer.github.com/v3/users/emails/#delete-email-addresses

    }, {
        key: 'deleteUserEmails',
        value: function deleteUserEmails(emails) {
            return this.del('emails', emails).get('body');
        }

        // Check a membership
        // https://developer.github.com/v3/orgs/members/#get-your-organization-membership

    }, {
        key: 'getOrgMembership',
        value: function getOrgMembership(org) {
            return this.get('memberships/orgs/' + org).get('body');
        }

        // List current user's memberships to all of his organizations
        // https://developer.github.com/v3/orgs/members/#list-your-organization-memberships

    }, {
        key: 'getOrgsMemberships',
        value: function getOrgsMemberships(params, options) {
            return this.page('memberships/orgs', params, options);
        }
    }]);

    return User;
}(Resource);

module.exports = User;