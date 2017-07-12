'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource = require('./resource');
var Issue = require('./issue');
var Release = require('./release');
var Hook = require('./hook');
var Commit = require('./commit');
var Branch = require('./branch');
var GitRef = require('./git_ref');
var GitCommit = require('./git_commit');
var GitBlob = require('./git_blob');

/**
 * Model to represent a a repository.
 * @type {Resource}
 */

var Repository = function (_Resource) {
    _inherits(Repository, _Resource);

    function Repository(client, github, id, opts) {
        _classCallCheck(this, Repository);

        var _this = _possibleConstructorReturn(this, (Repository.__proto__ || Object.getPrototypeOf(Repository)).call(this, client, opts));

        _this.id = id;
        return _this;
    }

    /**
     * Return API endpoint for this application
     */


    _createClass(Repository, [{
        key: 'url',
        value: function url() {
            var _get2;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_get2 = _get(Repository.prototype.__proto__ || Object.getPrototypeOf(Repository.prototype), 'url', this)).call.apply(_get2, [this, 'repos/' + this.id].concat(args));
        }

        /**
         * Resources
         */

    }, {
        key: 'issue',
        value: function issue(id) {
            return this.resource(Issue, id);
        }
    }, {
        key: 'release',
        value: function release(id) {
            return this.resource(Release, id);
        }
    }, {
        key: 'hook',
        value: function hook(id) {
            return this.resource(Hook, id);
        }
    }, {
        key: 'commit',
        value: function commit(id) {
            return this.resource(Commit, id);
        }
    }, {
        key: 'branch',
        value: function branch(id) {
            return this.resource(Branch, id);
        }
    }, {
        key: 'gitCommit',
        value: function gitCommit(id) {
            return this.resource(GitCommit, id);
        }
    }, {
        key: 'gitRef',
        value: function gitRef(id) {
            return this.resource(GitRef, id);
        }
    }, {
        key: 'gitBlob',
        value: function gitBlob(id) {
            return this.resource(GitBlob, id);
        }

        // Get details about the repository

    }, {
        key: 'info',
        value: function info() {
            return this.get('').get('body');
        }

        // Return list of releases

    }, {
        key: 'releases',
        value: function releases(opts) {
            return this.page('releases', {}, opts);
        }

        // Return list of issues

    }, {
        key: 'issues',
        value: function issues(opts) {
            return this.page('issues', {}, opts);
        }

        // Return list of hooks

    }, {
        key: 'hooks',
        value: function hooks(opts) {
            return this.page('hooks', {}, opts);
        }

        // Return list of branches
        // https://developer.github.com/v3/repos/#list-branches

    }, {
        key: 'branches',
        value: function branches(opts) {
            return this.page('branches', {}, opts);
        }

        // List Tags
        // https://developer.github.com/v3/repos/#list-tags

    }, {
        key: 'tags',
        value: function tags(opts) {
            return this.page('tags', {}, opts);
        }

        // List Teams
        // https://developer.github.com/v3/repos/#list-teams

    }, {
        key: 'teams',
        value: function teams(opts) {
            return this.page('teams', {}, opts);
        }

        // List Contributors
        // https://developer.github.com/v3/repos/#list-teams

    }, {
        key: 'contributors',
        value: function contributors(opts) {
            return this.page('contributors', {}, opts);
        }
        // Compare two commits
        // https://developer.github.com/v3/repos/commits/#compare-two-commits

    }, {
        key: 'compare',
        value: function compare(base, head) {
            return this.get('compare/' + base + '...' + head).get('body');
        }

        // Perform a merge
        // https://developer.github.com/v3/repos/merging/

    }, {
        key: 'merge',
        value: function merge(params) {
            return this.client.post(this.url('merges'), params).get('body');
        }

        // Create a new release

    }, {
        key: 'createRelease',
        value: function createRelease(params) {
            return this.client.post(this.url('releases'), params).get('body');
        }

        // Create an issue

    }, {
        key: 'createIssue',
        value: function createIssue(params) {
            return this.client.post(this.url('issues'), params).get('body');
        }

        // Create a hook
        // https://developer.github.com/v3/repos/hooks/#create-a-hook

    }, {
        key: 'createHook',
        value: function createHook(params) {
            return this.client.post(this.url('hooks'), params).get('body');
        }

        // Create a status
        // https://developer.github.com/v3/repos/statuses/#create-a-status

    }, {
        key: 'createStatus',
        value: function createStatus(sha, params) {
            return this.client.post(this.url('statuses', sha), params).get('body');
        }

        // Remove the repository

    }, {
        key: 'destroy',
        value: function destroy() {
            return this.del('');
        }
    }]);

    return Repository;
}(Resource);

module.exports = Repository;