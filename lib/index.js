'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var deprecate = require('deprecate');

var _require = require('./resources'),
    Resource = _require.Resource,
    Repository = _require.Repository,
    User = _require.User,
    Team = _require.Team,
    Organization = _require.Organization,
    Application = _require.Application,
    Installation = _require.Installation;

var APIClient = require('./client');

var GitHub = function (_Resource) {
    _inherits(GitHub, _Resource);

    function GitHub(config, options) {
        _classCallCheck(this, GitHub);

        return _possibleConstructorReturn(this, (GitHub.__proto__ || Object.getPrototypeOf(GitHub)).call(this, new APIClient(config, options)));
    }

    /**
     * Resources
     */


    _createClass(GitHub, [{
        key: 'me',
        value: function me(opts) {
            return this.resource(User, null, opts);
        }
    }, {
        key: 'repo',
        value: function repo(id, opts) {
            return this.resource(Repository, id, opts);
        }
    }, {
        key: 'user',
        value: function user(id, opts) {
            return this.resource(User, id, opts);
        }
    }, {
        key: 'team',
        value: function team(id, opts) {
            return this.resource(Team, id, opts);
        }
    }, {
        key: 'org',
        value: function org(id, opts) {
            return this.resource(Organization, id);
        }
    }, {
        key: 'app',
        value: function app(id, opts) {
            return this.resource(Application, id);
        }
    }, {
        key: 'installation',
        value: function installation(opts) {
            return this.resource(Installation, opts);
        }

        /**
         * Return API limits
         * @return {Promise<Number>}
         */

    }, {
        key: 'limit',
        value: function limit() {
            return this.get('/rate_limit').get('body').get('rate');
        }

        /**
         * List all public repositories.
         * https://developer.github.com/v3/repos/
         *
         * @param  {Object} options
         * @return {Promise<Page>}
         */

    }, {
        key: 'repos',
        value: function repos(options) {
            return this.page('repositories', {}, options);
        }

        // Create a new repository
        // https://developer.github.com/v3/repos/#create

    }, {
        key: 'createRepo',
        value: function createRepo(info) {
            deprecate('"github.addUserEmails" is deprecated, use "github.me().createRepo()"');
            return this.post('/user/repos', info).get('body');
        }

        // Add email address(es)
        // https://developer.github.com/v3/users/emails/#add-email-addresses

    }, {
        key: 'addUserEmails',
        value: function addUserEmails(emails) {
            deprecate('"github.addUserEmails" is deprecated, use "github.me().addEmails()"');
            return this.post('/user/emails', emails).get('body');
        }

        // Delete email address(es)
        // https://developer.github.com/v3/users/emails/#delete-email-addresses

    }, {
        key: 'deleteUserEmails',
        value: function deleteUserEmails(emails) {
            deprecate('"github.deleteUserEmails" is deprecated, use "github.me().deleteEmails()"');
            return this.del('/user/emails', emails).get('body');
        }
    }]);

    return GitHub;
}(Resource);

module.exports = GitHub;