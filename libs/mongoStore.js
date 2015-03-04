var session = require('express-session'),
	mongoose = require('./mongoose');
    
    //var store = new MongoStore({ mongooseConnection: mongoose.connection });
module.exports = (function(){
	var MongoStore = require('connect-mongo')(session);
	return new MongoStore({ mongooseConnection: mongoose.connection })
})();