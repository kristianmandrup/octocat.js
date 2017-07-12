'use strict';

var Resource = require('./resource');
var Repository = require('./repository');
var User = require('./user');
var Team = require('./team');
var Project = require('./project');
var Organization = require('./organization');
var Application = require('./application');
var Installation = require('./installation');

var clazzMap = {
    Resource: Resource,
    Repository: Repository,
    User: User,
    Team: Team,
    Project: Project,
    Organization: Organization,
    Application: Application,
    Installation: Installation
};

module.exports = clazzMap;