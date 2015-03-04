var mongoose = require('mongoose'),
    config = require('../config'),
    logger = require('./logger');

mongoose.connect(config.db.uri);
var connection = mongoose.connection;

connection.on('open', function(){logger.info('Success connect to DataBase!')});
connection.on('error', function(err){
    logger.error(err.message);
});

module.exports = mongoose;