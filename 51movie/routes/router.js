/**
 * [index description]
 * @type {[type]}
 */
var index = require('./index');
var movie = require('./movie');
var users = require('./users');
var admin = require('./admin');

module.exports = function(app){
    app.use('/', index);
    app.use('/movie', movie);
    app.use('/users', users);
    app.use('/admin', admin);
}