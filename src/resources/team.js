const Resource = require('./resource');
/**
 * Model to represent a a repository.
 * @type {Resource}
 */
module.exports = class Team extends Resource {
    constructor(client, github, id, opts = {}) {
        super(client, opts);
        this.id = id;
    }

    /**
     * Return API endpoint for this application
     */
    url(...args) {
        return super.url(`teams/${this.id}`, ...args);
    }

    /**
     * Resources
     */

    /**
     * Get team members
     * https://developer.github.com/v3/orgs/teams/#list-team-members
     * @param {String} role
     * @return {Promise<Page>}
     */
    members(params, options) {
        return this.page('members', params, options);
    }

    /**
     * List repositories for this team.
     * https://developer.github.com/v3/orgs/teams/#list-team-repos
     *
     * @param  {Object} options
     * @return {Promise<Page>}
     */
    repos(options) {
        return this.page('repos', {}, options);
    }

    /**
     * List of pending invitations for this team
     * https://developer.github.com/v3/orgs/teams/#list-pending-team-invitations
     *
     * @param  {Object} options
     * @return {Promise<Page>}
     */
    invitations(options) {
        return this.page('invitations', {}, options);
    }

    /**
     * Check if a team manages a repository
     * https://developer.github.com/v3/orgs/teams/#check-if-a-team-manages-a-repository
     * @param {String} owner
     * @param {String} repoName
     * @param {Object} options
     * @return {Promise<JSON>}
     */
    managesRepo(owner, repoName, options) {
        return this.get(`repos/${owner}/${repoName}`, {}, options)
            .get('body');
    }

    /**
     * Add or update team membership
     * https://developer.github.com/v3/orgs/teams/#add-or-update-team-membership
     * @param {String} username
     * @param {Object} options
     * @return {Promise<JSON>}
     */
    addMember(username, options) {
        return this.put(`memberships/${username}`, {}, options)
            .get('body');
    }

    /**
     * Remove team membership
     * https://developer.github.com/v3/orgs/teams/#remove-team-membership
     * @param  {String} username
     * @param {Object} options
     * @return {Promise<JSON>}
     */
    removeMember(username, options = {}) {
        return this.del(`memberships/${username}`, {}, options);
    }

    /**
     * Add or update team membership
     * https://developer.github.com/v3/orgs/teams/#add-or-update-team-membership
     * @param {String} orgName
     * @param {String} repoName
     * @param {Object} params
     *  {String} permission
     * @param {Object} options
     * @return {Promise<JSON>}
     */
    addRepo(orgName, repoName, params, options) {
        return this.put(`repos/${orgName}/${repoName}`, params, options)
            .get('body');
    }

    /**
     * Remove team membership
     * https://developer.github.com/v3/orgs/teams/#remove-team-membership
     * @param  {String} owner
     * @param  {String} repoName
     * @param {Object} options
     * @return {Promise<JSON>}
     */
    removeRepo(owner, repoName, options = {}) {
        return this.del(`repos/${owner}/${repoName}`, {}, options);
    }
};
