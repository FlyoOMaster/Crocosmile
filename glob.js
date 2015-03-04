var mongoose = require('./libs/mongoose'),
    config = require('./config'),
    logger = require('./libs/logger'),
    async = require('async'),
    crypto = require('crypto'),
    io = require('./libs/socket');

var glob = {
    mongoose: mongoose,
    config: config,
    logger: logger,
    async: async,
    crypto: crypto,
    io:io
};
module.exports = glob;
glob.e = {
    AuthError:require('./models/user').AuthError
}
glob.m = {
    user:require('./models/user').User
};



