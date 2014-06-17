'use strict';

var scraperWiki = require('../modules/scraper-wikipedia.js');

/**
 * Get groups
 */
exports.groups = function(req, res) {
    return res.jsonp(scraperWiki.getGroups());
};

/**
 * Get squads
 */
exports.squads = function(req, res) {
    return res.jsonp(scraperWiki.getSquads());
};

/**
 * Get matches
 */
exports.matches = function(req, res) {
    return res.jsonp(scraperWiki.getMatches());
};