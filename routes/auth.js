
var glob = require('../glob'),
    AuthError = glob.e.AuthError,
    User = glob.m.user;

var Auth = {
  init:function(req, res, next){
    backURL=req.header('Referer') || '/';
    if (req.session.userId) return res.redirect(backURL);
    res.render('auth');
  },
  registration:function(req, res, next){
    var username = req.body.username,
        password = req.body.password;
    User.Auth(username, password, function(err, user){
      if(err){
        if(err instanceof AuthError){
          next(err);
        }else{
          next(err);
        }
      }else{
        var us = user.toObject();
        user.rememberId(req);
        glob.logger.info('Auth is success for %s',username);
        res.send({
          status:200,
          redirectTo:'/'
        });
      }
    });
  }
}

module.exports = Auth;