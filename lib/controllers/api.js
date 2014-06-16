'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    scraperWiki = require('../modules/scraper-wikipedia.js');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
    return Thing.find(function(err, things) {
        if (!err) {
            return res.json(things);
        } else {
            return res.send(err);
        }
    });
};

exports.groups = function(req, res) {
    return res.json(scraperWiki.getGroups());
};

exports.squads = function(req, res) {
    return res.json(scraperWiki.getSquads());
};

exports.matches = function(req, res) {
    return res.json(scraperWiki.getMatches());
};