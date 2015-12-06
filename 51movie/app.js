var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');  //session依赖cookie模块
var mongoStore = require('connect-mongo')(session);//用来对session进行持久化
var mongoose = require('mongoose');

var app = express();

var dbUrl = 'mongodb://114.215.155.89:27017/movie';
global.db = mongoose.connect(dbUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret:'51movie',
    resave: false,
    saveUninitialized: true,
    //使用mongo对session进行持久化，将session存储进数据库中
    store: new mongoStore({
      url:dbUrl,
      collection:'session'
    })
}));

app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

require('./routes/router')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  //在屏幕上将信息打印出来
  app.set('showStackError',true);
  //显示的信息
  app.use(logger(':method :url :status'));
  //源码格式化，不要压缩
  app.locals.pretty = true;
  mongoose.set('debug',true);

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000);
// module.exports = app;
