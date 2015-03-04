var glob = require('../glob');

var Index = {
    init:function(req, res, next){
        res.render('index');
    }
}

module.exports = Index;