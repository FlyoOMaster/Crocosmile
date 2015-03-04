var winston = require('winston'),
    config = require('../config');

module.exports = config.logger(winston);