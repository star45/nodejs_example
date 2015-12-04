/**
 * [总路由文件]
 */
var index = require('./index');
var login = require('./login');
var home = require('./home');
var logout = require('./logout');

module.exports = function(app){
    app.use('/', index);
    app.use('/', login);
    app.use('/', home);
    app.use('/', logout);
}
