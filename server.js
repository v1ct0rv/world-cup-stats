'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');

// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);

// Start server
app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

// Start Scraper
var scraperWiki = require('./lib/modules/scraper-wikipedia.js');
scraperWiki.start();

// Expose app
exports = module.exports = app;
