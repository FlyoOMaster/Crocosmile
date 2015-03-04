module.exports = {
    server:{
        domain:'https://yarcho.herokuapp.com',
        port:3000
    },
    db:{
        uri:'mongodb://mylab:qwerty@ds049171.mongolab.com:49171/mylab'
    },
    logger:function(winston){
            var loggerOptons = {
                transports:[
                    new (winston.transports.Console)({
                        colorize:true
                    }),
                    new (winston.transports.File)({
                        name: 'error-file',
                        filename: 'logs/error.log',
                        level: 'error'
                    })
                ]};
        var logger = new (winston.Logger)(loggerOptons);
        return logger;
    },
    session:{
        secret:'hahaha_secret',
        resave:false,
        saveUninitialized:false,
        cookie:{
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: null
        }

    },
    locals:{
        title:'WebChat'
    }
}