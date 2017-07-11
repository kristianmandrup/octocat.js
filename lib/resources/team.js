'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource = require('./resource');
/**
 * Model to represent a a repository.
 * @type {Resource}
 */
module.exports = function (_Resource) {
    _inherits(Team, _Resource);

    function Team(client, github, id) {
        _classCallCheck(this, Team);

        var _this = _possibleConstructorReturn(this, (Team.__proto__ || Object.getPrototypeOf(Team)).call(this, client, {
            preview: true
        }));

        _this.id = id;
        return _this;
    }

    /**
     * Return API endpoint for this application
     */


    _createClass(Team, [{
        key: 'url',
        value: function url() {
            var _get2;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_get2 = _get(Team.prototype.__proto__ || Object.getPrototypeOf(Team.prototype), 'url', this)).call.apply(_get2, [this, 'teams/' + this.id].concat(args));
        }

        /**
         * Resources
         */

        /**
         * Get team members
         * https://developer.github.com/v3/orgs/teams/#list-team-members
         * @param {String} role
         * @return {Promise<Page>}
         */

    }, {
        key: 'members',
        value: function members(params, options) {
            return this.page('members', params, options);
        }

        /**
         * List repositories for this team.
         * https://developer.github.com/v3/orgs/teams/#list-team-repos
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
         * List of pending invitations for this team
         * https://developer.github.com/v3/orgs/teams/#list-pending-team-invitations
         *
         * @param  {Object} options
         * @return {Promise<Page>}
         */

    }, {
        key: 'invitations',
        value: function invitations(options) {
            return this.page('invitations', {}, options);
        }

        /**
         * Check if a team manages a repository
         * https://developer.github.com/v3/orgs/teams/#check-if-a-team-manages-a-repository
         * @param {String} owner
         * @param {String} repoName
         * @param {Object} options
         * @return {Promise<JSON>}
         */

    }, {
        key: 'managesRepo',
        value: function managesRepo(owner, repoName, options) {
            return this.get('repos/' + owner + '/' + repoName, {}, options).get('body');
        }

        /**
         * Add or update team membership
         * https://developer.github.com/v3/orgs/teams/#add-or-update-team-membership
         * @param {String} username
         * @param {Object} options
         * @return {Promise<JSON>}
         */

    }, {
        key: 'addMember',
        value: function addMember(username, options) {
            return this.put('memberships/' + username, {}, options).get('body');
        }

        /**
         * Remove team membership
         * https://developer.github.com/v3/orgs/teams/#remove-team-membership
         * @param  {String} username
         * @param {Object} options
         * @return {Promise<JSON>}
         */

    }, {
        key: 'removeMember',
        value: function removeMember(username) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return this.del('memberships/' + username, {}, options);
        }

        /**
         * Add or update team membership
         * https://developer.github.com/v3/orgs/teams/#add-or-update-team-membership
         * @param {String} orgName
         * @param {String} repoName
         * @param {Object} params
         *  {String} permission
         * @param {Object} options
         * @return {Promise<JSON>}
         */

    }, {
        key: 'addRepo',
        value: function addRepo(orgName, repoName, params, options) {
            return this.put('repos/' + orgName + '/' + repoName, params, options).get('body');
        }

        /**
         * Remove team membership
         * https://developer.github.com/v3/orgs/teams/#remove-team-membership
         * @param  {String} owner
         * @param  {String} repoName
         * @param {Object} options
         * @return {Promise<JSON>}
         */

    }, {
        key: 'removeRepo',
        value: function removeRepo(owner, repoName) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            return this.del('repos/' + owner + '/' + repoName, {}, options);
        }
    }]);

    return Team;
}(Resource);