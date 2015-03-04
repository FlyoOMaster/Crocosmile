var express = require('express'),
    Router = express.Router,
    glob = require('../glob'),
    auth = require('./auth'),
    user = require('./user'),
    index = require('./index');

var router = Router();
router.all('*',user.loadUser);

var publicRoutes = Router();
    publicRoutes.route('/auth')
        .get(auth.init)
        .post(auth.registration);
    publicRoutes.route('/logout')
        .get(user.logout);


var privateRoutes = Router();
    privateRoutes.use(user.checkAuth);

    privateRoutes.route('/')
        .get(index.init)

router.use(publicRoutes);
router.use(privateRoutes);
module.exports = router;