'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource = require('./resource');

/**
 * Resource to model a git ref.
 * https://developer.github.com/v3/git/refs/
 *
 * @type {Resource}
 */

var GitRef = function (_Resource) {
    _inherits(GitRef, _Resource);

    function GitRef(client, repo, name) {
        _classCallCheck(this, GitRef);

        var _this = _possibleConstructorReturn(this, (GitRef.__proto__ || Object.getPrototypeOf(GitRef)).call(this, client));

        _this.repo = repo;
        _this.name = name;
        return _this;
    }

    /**
     * Return API endpoint for this ref.
     */


    _createClass(GitRef, [{
        key: 'url',
        value: function url() {
            var _repo;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_repo = this.repo).url.apply(_repo, ['git/refs/' + this.name].concat(args));
        }

        /**
         * Get details about the commit.
         * https://developer.github.com/v3/git/refs/#get-a-reference
         * @return {Promise<JSON>}
         */

    }, {
        key: 'info',
        value: function info() {
            return this.get('').get('body');
        }

        /**
         * Update a Reference
         * https://developer.github.com/v3/git/refs/#update-a-reference
         * @param  {Object} params
         * @return {Promise<JSON>}
         */

    }, {
        key: 'edit',
        value: function edit(params) {
            return this.patch('', params).get('body');
        }

        /**
         * Delete a Reference
         * https://developer.github.com/v3/git/refs/#delete-a-reference
         * @return {Promise<JSON>}
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            return this.del('').get('body');
        }
    }]);

    return GitRef;
}(Resource);

module.exports = GitRef;