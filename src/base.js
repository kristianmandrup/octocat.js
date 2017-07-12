const Loggable = require('./loggable')

const preview = {
    members: {
        accept: 'korra-preview'
    },
    projects: {
        accept: 'inertia-preview'
    }
}

class Base extends Loggable {
    constructor(name, opts = {}) {
        super(name || 'Base', opts)
    }

    _previewAccept(name) {
        const {
            accept
        } = preview[name] || {}
        if (!accept) {
            return this.warn(`Invalid preview api: ${name}`)
        }
        this.log('configurePreview', {
            accept
        })
        const acceptStr = `application/vnd.github.${accept}+json`
        return acceptStr;
    }
}

module.exports = {
    preview,
    Base
}
