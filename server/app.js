
/**
 * Module dependencies.
 */

var express 	= require('express');
var path 		= require('path');
var config 		= require('./config/config.json');
var mongoose 	= require('mongoose');
var app 		= express();

if('production' == app.settings.env) {
	var config = require('./config/config.prod.json');
}

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

/**
 * Development Settings
 */

if ('development' == app.settings.env) {
	// This will change in production since we'll be using the dist folder
	// This covers serving up the index page
	app.use(express.static(path.join(__dirname, '../client/.tmp')));
	app.use(express.static(path.join(__dirname, '../client/app')));
	app.use(express.errorHandler());
}

/**
 * Production Settings
 */
if('production' == app.settings.env) {
	app.use(express.static(path.join(__dirname, '/dist/client')));
}

/**
 * JSON API
 */

var gogoRoutes = require('./routes/gogoRoute.js');

app.get('/api/info/:projectID', gogoRoutes.getInfo);

app.listen(config.port, function(){
  console.log("Express server listening on port %d in %s mode", config.port, app.settings.env);
});