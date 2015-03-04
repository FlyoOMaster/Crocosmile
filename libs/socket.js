var socketIO = require('socket.io'),
    async = require('async'),
    User = require('../models/user').User,
    log = require('../libs/logger');

function loadUser(userId, cb){
    async.waterfall([
        function(cb){
            User.findOne({_id:userId}, cb)
        }
    ], function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
};

module.exports = (function(){
    var io;
    return {
        ioConf: function (server) {
            io = require('socket.io').listen(server);
            io.set('logger', log);
            //io.set('origins', 'localhost



            io.on('session:reload', function(sid){
                var clients = io.sockets.clients();

                console.log('in reload, clients: '+clients.length);
                clients.forEach(function(client){
                    if(client.handshake.userId != sid) return;
                    client.disconnect();
                });
            })
            return io;
        },
        sessionConf: function (sessionSockets) {
            var clients = {};
            sessionSockets.on('connection', function (err, socket, session) {

                if (session.userId) {
                    console.log('user id: '+session.userId)
                    loadUser(session.userId, function (err, user) {
                        if (err) socket.emit('auth error', err);
                        if(user) {
                            socket.userId = user._id;
                            socket.user = user;
                            socket.disconnected = false;
                            if (!clients[user._id]) {
                                clients[socket.userId] = socket;
                                io.emit('auth', user);
                            } else {
                                clients[user._id].disconnected = false;
                            }
                        }else{
                            socket.emit('auth', null);
                            socket.disconnect();
                        }
                    });
                }
                socket.on('message', function (msg, cb) {

                    console.log('new message from: '+socket.user.username)
                    socket.broadcast.emit('message',msg);
                    cb();
                });
                socket.on('disconnect', function () {
                    clients[session.userId].disconnected = true;
                    setTimeout(function(){
                        if(clients[session.userId].disconnected) {
                            console.log(socket.user.username+' disconnected');
                            io.emit('disconnected');
                            delete clients[session.userId];

                        }
                    },1000);
                });
            });
        }
    }
})()