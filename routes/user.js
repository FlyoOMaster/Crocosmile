
var glob = require('../glob'),
io = require('../bin/www').io,
	UserModel = glob.m.user;

var User = {
	loadUser:function(req, res, next){
		res.locals.user = null;
		var userId = req.session.userId;

		if (!userId) return next();
		UserModel.findOne({_id:userId}, function(err, user){
			if (err) return next(err);
			if (user){
				res.locals.user = user.toSafeObject();
			}
			next();
		});
	},
    checkAuth : function (req, res, next){
        if(!req.session.userId) return res.redirect('auth');
        next();
    },
    logout : function (req, res, next){
    	//var io = req.app.get('io');
    	var sid = req.session.userId;
        req.session.destroy(function(err){
        	if (err) return next(err);
			var clients = ioConf.sockets.sockets;
			var client;
			console.log('in reload, clients: '+clients.length);
			clients.forEach(function(client){
				if(client.userId != sid) return;
				client.disconnect();
				res.redirect('/');
			});
        });
    }
}

module.exports = User;