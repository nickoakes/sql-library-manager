/*
  SQL Library Manager
  app.js
*/

//dependencies

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const router = require('./routes/books');
var methodOverride = require('method-override');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  var err = new Error('Sorry, the book you were looking for could not be found');
  err.statusCode = 404;
  next(err);
});

// error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.statusCode || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    console.log(err);
  });
}

app.use(function(err, req, res, next) {
  res.status(err.statusCode || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;