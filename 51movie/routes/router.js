/**
 * [index description]
 * @type {[type]}
 */
var index = require('./index');
var movie = require('./movie');
var admin = require('./admin');
var user  = require('./user');

module.exports = function(app){
    //pre handle user 预处理用户登录
    app.use(function(req,res,next){
        app.locals.user = req.session.user;   //将session中保存的用户名存储到本地变量中
        next();
    });
    app.use('/', index);
    app.use('/movie', movie);
    app.use('/admin', admin);
    app.use('/user', user);
};