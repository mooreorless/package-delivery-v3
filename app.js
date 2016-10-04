var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');

// Load api models and auth
require('./app_api/models/db');
require('./app_api/config/passport');

// Load api endpoints
var routesApi = require('./app_api/routes/index');

var app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serves static assets
app.use(express.static(path.join(__dirname, 'public')));
// Serves angular
app.use(express.static(path.join(__dirname, 'client')));

// Begin authentication service before loading routes
app.use(passport.initialize());

// Prefix database routes
app.use('/api', routesApi);

// Default route
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Handle auth errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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


module.exports = app;
