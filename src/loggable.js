const helpers = require('./helpers');
const {
    isObject,
    toArray
} = helpers;

module.exports = class Loggable {
    constructor(name, opts = {}) {
        this.opts = opts
        this.io = opts.io || console
        this.name = name || opts.name
        this.configureLogging(opts.logging)
    }

    configureLogging(logging) {
        this.logging = !!logging
        this.logIgnore = []
        this.logOnly = []
        if (isObject(logging)) {
            this.logOnly = toArray(logging.only || [])
            this.logIgnore = toArray(logging.ignore || [])
        }
    }

    handleError(err, value, data) {
        this.error(err, value, data)
        if (this.notify) {
            this.notify('error', value)
        }
        throw err
    }

    configError(msg, value, data) {
        // console.log(msg, data)
        this.handleError(msg, value, data)
    }

    notYetImplemented(msg, data) {
        msg = `Not yet implemented: ${msg}`
        this.handleError(msg)
    }

    deprecationWarning(msg, data) {
        msg = `Deprecated: ${msg}`
        this.warn(msg, data)
    }

    pretty(obj) {
        return JSON.stringify(obj, null, 2)
    }

    enableLog() {
        this.logging = true
        return this
    }

    disableLog() {
        this.logging = false
        return this
    }

    label(lv) {
        lv = lv.toUpperCase()
        return `[${this.name}] ${lv}:`
    }

    _writeMsg(label, msg) {
        return this.io.log(label, msg)
    }

    _writeData(label, msg, data) {
        return this.io.log(label, msg, data)
    }

    _writeLogMsg(label, msg, data) {
        const writer = (data ? this._writeData : this._writeMsg).bind(this)
        return writer(this.label(label), msg, data)
    }

    warn(msg, data) {
        if (this.logging) {
            return this._writeLogMsg('warning', msg, data)
        }
    }

    get ignoreLog() {
        return this.logIgnore.indexOf(this.name) >= 0 || this._notInOnlyLog
    }

    get _notInOnlyLog() {
        return this.logOnly.length > 0 && this.logOnly.indexOf(this.name) < 0
    }

    log(msg, data) {
        if (this.logging) {
            if (this.ignoreLog) return
            return this._writeLogMsg('info', msg, data)
        }
    }

    // you can provide optional data (context) for better debugging
    error(msg, value, data) {
        if (this.logging) {
            if (data) {
                this._writeLogMsg('data', data)
            }
            return this._writeLogMsg('error', msg, value)
        }
    }
}
