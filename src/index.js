const deprecate = require('deprecate');
const {
    Resource,
    Repository,
    User,
    Team,
    Organization,
    Application,
    Installation
} = require('./resources');

const APIClient = require('./client');

class GitHub extends Resource {
    constructor(options) {
        super(new APIClient(options));
    }

    /**
     * Resources
     */
    me(opts) {
        return this.resource(User, null, opts);
    }
    repo(id, opts) {
        return this.resource(Repository, id, opts);
    }
    user(id, opts) {
        return this.resource(User, id, opts);
    }
    team(id, opts) {
        return this.resource(Team, id, opts);
    }
    org(id, opts) {
        return this.resource(Organization, id);
    }
    app(id, opts) {
        return this.resource(Application, id);
    }
    installation(opts) {
        return this.resource(Installation, opts);
    }

    /**
     * Return API limits
     * @return {Promise<Number>}
     */
    limit() {
        return this.get('/rate_limit')
            .get('body')
            .get('rate');
    }

    /**
     * List all public repositories.
     * https://developer.github.com/v3/repos/
     *
     * @param  {Object} options
     * @return {Promise<Page>}
     */
    repos(options) {
        return this.page('repositories', {}, options);
    }

    // Create a new repository
    // https://developer.github.com/v3/repos/#create
    createRepo(info) {
        deprecate('"github.addUserEmails" is deprecated, use "github.me().createRepo()"');
        return this.post('/user/repos', info)
            .get('body');
    }

    // Add email address(es)
    // https://developer.github.com/v3/users/emails/#add-email-addresses
    addUserEmails(emails) {
        deprecate('"github.addUserEmails" is deprecated, use "github.me().addEmails()"');
        return this.post('/user/emails', emails)
            .get('body');
    }

    // Delete email address(es)
    // https://developer.github.com/v3/users/emails/#delete-email-addresses
    deleteUserEmails(emails) {
        deprecate('"github.deleteUserEmails" is deprecated, use "github.me().deleteEmails()"');
        return this.del('/user/emails', emails)
            .get('body');
    }
}

module.exports = GitHub;
