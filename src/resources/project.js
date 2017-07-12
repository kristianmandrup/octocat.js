const Resource = require('./resource');
/**
 * Model to represent a a repository.
 * @type {Resource}
 */
module.exports = class Project extends Resource {
    constructor(client, github, id, opts = {}) {
        super(client, Object.assign({
            preview: 'project'
        }, opts));
        this.id = id;
    }

    /**
     * Return API endpoint for this application
     */
    url(...args) {
        return super.url(`projects/${this.id}`, ...args);
    }

    /**
     * Resources
     */
}
