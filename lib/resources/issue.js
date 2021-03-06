'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource = require('./resource');

/**
 * Resource to model an issue.
 * https://developer.github.com/v3/repos/issues/
 *
 * @type {Resource}
 */

var Issue = function (_Resource) {
    _inherits(Issue, _Resource);

    function Issue(client, repo, id) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _classCallCheck(this, Issue);

        var _this = _possibleConstructorReturn(this, (Issue.__proto__ || Object.getPrototypeOf(Issue)).call(this, client, opts));

        _this.repo = repo;
        _this.id = id;
        return _this;
    }

    /**
     * Return API endpoint for this hook.
     */


    _createClass(Issue, [{
        key: 'url',
        value: function url() {
            var _repo;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_repo = this.repo).url.apply(_repo, ['issues/' + this.id].concat(args));
        }

        /**
         * Get a single issue.
         * @return {Promise<JSON>}
         */

    }, {
        key: 'info',
        value: function info() {
            return this.get('').get('body');
        }

        /**
         * Edit an issue
         * @param  {Object} params
         * @return {Promise<JSON>}
         */

    }, {
        key: 'edit',
        value: function edit(params) {
            return this.patch('', params).get('body');
        }
    }]);

    return Issue;
}(Resource);

module.exports = Issue;