var util = require('util'),
    mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    async = require('async'),
    crypto = require('crypto');

var UserSchema = new Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
    hashPassword:{
        type:String,
        require:true
    },
    salt:{
        type:String,
        default:0
    }
});
UserSchema.virtual('password').set(function(password){
    this._plainPassword = password;
    this.salt = Math.random()+'';
    this.hashPassword = this.encryptPassword(password);
}).get(function(){
    return this._plainPassword;
});

UserSchema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}
UserSchema.methods.checkPassword = function(password){
    return this.hashPassword === this.encryptPassword(password);
}
UserSchema.methods.rememberId = function(req){
    req.session.userId = this._id;
}
UserSchema.methods.toSafeObject = function(){
    return{
        _id:this._id,
        username:this.username
    }
}

UserSchema.statics.Auth = function(username, password, cb){
    var User = this;
    async.waterfall([
        function(cb){
            User.findOne({username:username}, cb);
        },
        function(user, cb){
            if(!user){
                var user = new User({username:username, password:password});
                user.save(function(err){
                    if(err) cb(err);
                    cb(null, user);
                });
            }else{
                if(user.checkPassword(password))
                    cb(null, user);
                else{
                    cb(new AuthError(403, 'Неверный логин или пароль'));
                }
            }
        }
    ],function(err, user){
        if(err) return cb(err);
        cb(null, user);
    });
};

function AuthError(status, message){
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);
    this.status = status;
    this.message = message;
}
util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';

exports.User = mongoose.model('User', UserSchema);
exports.AuthError = AuthError;