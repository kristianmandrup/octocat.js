'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var helpers = require('./helpers');
var isObject = helpers.isObject,
    toArray = helpers.toArray;


module.exports = function () {
    function Loggable(name) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Loggable);

        this.opts = opts;
        this.io = opts.io || console;
        this.name = name || opts.name;
        this.configureLogging(opts.logging);
    }

    _createClass(Loggable, [{
        key: 'configureLogging',
        value: function configureLogging(logging) {
            this.logging = !!logging;
            this.logIgnore = [];
            this.logOnly = [];
            if (isObject(logging)) {
                this.logOnly = toArray(logging.only || []);
                this.logIgnore = toArray(logging.ignore || []);
            }
        }
    }, {
        key: 'handleError',
        value: function handleError(err, value, data) {
            this.error(err, value, data);
            if (this.notify) {
                this.notify('error', value);
            }
            throw err;
        }
    }, {
        key: 'configError',
        value: function configError(msg, value, data) {
            // console.log(msg, data)
            this.handleError(msg, value, data);
        }
    }, {
        key: 'notYetImplemented',
        value: function notYetImplemented(msg, data) {
            msg = 'Not yet implemented: ' + msg;
            this.handleError(msg);
        }
    }, {
        key: 'deprecationWarning',
        value: function deprecationWarning(msg, data) {
            msg = 'Deprecated: ' + msg;
            this.warn(msg, data);
        }
    }, {
        key: 'pretty',
        value: function pretty(obj) {
            return JSON.stringify(obj, null, 2);
        }
    }, {
        key: 'enableLog',
        value: function enableLog() {
            this.logging = true;
            return this;
        }
    }, {
        key: 'disableLog',
        value: function disableLog() {
            this.logging = false;
            return this;
        }
    }, {
        key: 'label',
        value: function label(lv) {
            lv = lv.toUpperCase();
            return '[' + this.name + '] ' + lv + ':';
        }
    }, {
        key: '_writeMsg',
        value: function _writeMsg(label, msg) {
            return this.io.log(label, msg);
        }
    }, {
        key: '_writeData',
        value: function _writeData(label, msg, data) {
            return this.io.log(label, msg, data);
        }
    }, {
        key: '_writeLogMsg',
        value: function _writeLogMsg(label, msg, data) {
            var writer = (data ? this._writeData : this._writeMsg).bind(this);
            return writer(this.label(label), msg, data);
        }
    }, {
        key: 'warn',
        value: function warn(msg, data) {
            if (this.logging) {
                return this._writeLogMsg('warning', msg, data);
            }
        }
    }, {
        key: 'log',
        value: function log(msg, data) {
            if (this.logging) {
                if (this.ignoreLog) return;
                return this._writeLogMsg('info', msg, data);
            }
        }

        // you can provide optional data (context) for better debugging

    }, {
        key: 'error',
        value: function error(msg, value, data) {
            if (this.logging) {
                if (data) {
                    this._writeLogMsg('data', data);
                }
                return this._writeLogMsg('error', msg, value);
            }
        }
    }, {
        key: 'ignoreLog',
        get: function get() {
            return this.logIgnore.indexOf(this.name) >= 0 || this._notInOnlyLog;
        }
    }, {
        key: '_notInOnlyLog',
        get: function get() {
            return this.logOnly.length > 0 && this.logOnly.indexOf(this.name) < 0;
        }
    }]);

    return Loggable;
}();