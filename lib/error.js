'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var is = require('is');

/**
 * API error object.
 * @type {Class}
 */

var GitHubError = function (_Error) {
    _inherits(GitHubError, _Error);

    function GitHubError(message) {
        _classCallCheck(this, GitHubError);

        var _this = _possibleConstructorReturn(this, (GitHubError.__proto__ || Object.getPrototypeOf(GitHubError)).call(this, message));

        _this.name = 'GitHubError';
        _this.message = message;
        _this.statusCode = 0;
        _this.code = 0;
        _this.statusType = '0xx';
        _this.response = null;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, _this.constructor);
        } else {
            _this.stack = new Error(message).stack;
        }
        return _this;
    }

    /**
     * Create an error object for a fetch response.
     * @param  {Response} response
     * @return {GitHubError} error
     */


    _createClass(GitHubError, null, [{
        key: 'createForResponse',
        value: function createForResponse(opts) {
            var message = 'Error ' + opts.statusCode;
            var errors = void 0,
                documentationUrl = void 0;

            if (is.object(opts.body) && opts.body.message) {
                message = opts.body.message || opts.message;
            }

            var err = new GitHubError(message);

            Object.defineProperty(err, 'response', {
                value: opts.response,
                enumerable: false
            });

            err.statusCode = opts.statusCode;
            err.code = err.statusCode;
            err.statusType = opts.statusType;
            err.body = opts.body;
            err.headers = opts.headers;
            err.documentationUrl = documentationUrl;
            err.errors = errors || [];

            return err;
        }
    }]);

    return GitHubError;
}(Error);

module.exports = GitHubError;