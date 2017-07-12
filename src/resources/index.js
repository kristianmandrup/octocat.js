const Resource = require('./resource');
const Repository = require('./repository');
const User = require('./user');
const Team = require('./team');
const Organization = require('./organization');
const Application = require('./application');
const Installation = require('./installation');

const clazzMap = {
    Resource,
    Repository,
    User,
    Team,
    Organization,
    Application,
    Installation
};

module.exports = clazzMap;
