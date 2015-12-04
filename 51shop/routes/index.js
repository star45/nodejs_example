
var users= require('./users');
module.exports = function ( app ) {
    app.use('/', require('./login'));
    app.use('/', require('./home'));
    app.use('/', require('./logout'));
    app.use('/', require('./register'));
    app.use('/', require('./cart'));
    app.use('/users', users);

};