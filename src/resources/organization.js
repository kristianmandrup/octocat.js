const Promise = require('q');
const Resource = require('./resource');

/**
 * Model to represent an organization.
 * @type {Resource}
 */
class Organization extends Resource {
    constructor(client, github, id, opts = {}) {
        super(client, opts);
        this.id = id;
    }

    /**
     * Return API endpoint for this organization
     */
    url(...args) {
        return super.url(`orgs/${this.id}`, ...args);
    }

    // Get a single organization
    info() {
        return this.get('')
            .get('body');
    }


    // Edit this organization
    edit(params) {
        return this.patch('', params)
            .get('body');
    }

    // Check membership
    // https://developer.github.com/v3/orgs/members/#check-membership
    isMember(user) {
        return this.get(`members/${user}`)
            .then(() => {
                return true;
            }, () => {
                return Promise(false);
            });
    }

    /**
     * Get organisation members
     * https://developer.github.com/v3/orgs/members/#members-list
     * @param {Object} params
     *   {String} filter (2fa_disabled, all)
     *   {String} role (all, admin, member)
     * @param {Object} options
     * @return {Promise<Page>}
     */
    members(params, options) {
        return this.page('members', params, options);
    }

    // Public members
    // https://developer.github.com/v3/orgs/members/#members-list
    publicMembers(options) {
        return this.page('public_members', {}, options);
    }

    /**
     * List repositories for this organization.
     * https://developer.github.com/v3/repos/#list-organization-repositories
     *
     * @param  {Object} options
     * @return {Promise<Page>}
     */
    repos(options) {
        return this.page('repos', {}, options);
    }

    /**
     * List projects for this organization.
     * https://developer.github.com/v3/projects/#list-organization-projects
     *
     * @param  {Object} options
     * @return {Promise<Page>}
     */
    projects(options) {
        return this.page('projects', {}, options);
    }

    // Create a new project
    createProject(params) {
        return this.post(this.url('projects'), params)
            .get('body');
    }

    // Create a new repository
    // https://developer.github.com/v3/repos/#create
    createRepo(info) {
        return this.post('repos', info)
            .get('body');
    }
}

module.exports = Organization;
