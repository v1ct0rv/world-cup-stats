'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  app.route('/api/scraper/groups')
    .get(api.groups);

  app.route('/api/scraper/squads')
    .get(api.squads);

  app.route('/api/scraper/matches')
    .get(api.matches);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};