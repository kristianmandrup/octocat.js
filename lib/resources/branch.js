'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource = require('./resource');

/**
 * Resource to model a git branch.
 * https://developer.github.com/v3/repos/
 *
 * @type {Resource}
 */

var Branch = function (_Resource) {
    _inherits(Branch, _Resource);

    function Branch(client, repo, ref) {
        _classCallCheck(this, Branch);

        var _this = _possibleConstructorReturn(this, (Branch.__proto__ || Object.getPrototypeOf(Branch)).call(this, client));

        _this.repo = repo;
        _this.ref = ref;
        return _this;
    }

    /**
     * Return API endpoint for this branch
     */


    _createClass(Branch, [{
        key: 'url',
        value: function url() {
            var _repo;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_repo = this.repo).url.apply(_repo, ['branches/' + this.ref].concat(args));
        }

        /**
         * Get details about the branch
         * https://developer.github.com/v3/repos/#get-branch
         * @return {Promise<JSON>}
         */

    }, {
        key: 'info',
        value: function info() {
            return this.get('').get('body');
        }
    }]);

    return Branch;
}(Resource);

module.exports = Branch;