'use strict';

var scraperWikipedia = function() {
  var request = require('request'),
    cheerio = require('cheerio'),
    S = require('string'),
    moment = require('moment'),
    groups = [],
    matches = [],
    squads = [];

  var updateData = function() {

    var url = 'http://en.wikipedia.org/wiki/2014_FIFA_World_Cup';
    console.log('Starting world cup scrapper, url %s', url);
    request(url, function(error, response, html) {

      // First we'll check to make sure no errors occurred when making the request
      if (!error) {
        // Clear previous
        matches = [];

        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
        var $ = cheerio.load(html);

        var len = $('h3').length;
        // Search for matches
        $('h3').each(function(i, elem) {
          if (S($(this).text().toLowerCase()).startsWith('group')) {


            // Group Matches
            var group =  $(this).text().toLowerCase().replace('group', '').toUpperCase().trim();
            var groupMatches = $(this).nextAll('div.vevent');
            for (var j = 0; j < 6; j++) {
              var tables = $(groupMatches.get(j)).children('table');
              var match = {};
              match.group = group;

              // Match Date
              var dateString = S($(tables[0]).text().trim()).collapseWhitespace().s;
              var matchDate = moment(dateString, 'D MMM YYYY HH:mm').utc();
              match.dateMillis = matchDate.valueOf();
              match.date = matchDate.format("YYYY-MM-DDTHH:mm");

              // Match Details
              var teams = $($(tables[1]).children('tr')[0]).children();
              match.homeTeam = $(teams[0]).text().trim();
              match.awayTeam = $(teams[2]).text().trim();
              if(S($(teams[1]).text().trim().toLowerCase()).startsWith('match')) {
                match.result = [];
              } else {
                match.result = $(teams[1]).text().trim().split('\u2013');
              }

              // Match venue
              match.venue = $(tables[2]).text().trim();

              // Add Match
              matches.push(match);
            }
          }

          //Last iteration, reorder the items and set the id.
          if (i === len - 1) {
            matches.sort(function(match1, match2) {
              return match1.dateMillis - match2.dateMillis; //to reverse b.dateMillis-a.dateMillis
            });

            for (var index = 0; index < matches.length; index++) {
              matches[index].id = index + 1;
              matches[index].name = "Match " + matches[index].id;
              delete matches[index].dateMillis;
            }
          }
        });
      } else {
        console.error('Error scrapping url (%s), error %s', url, error);
      }
    });
  };

  var start = function() {
    // Run each minute
    var updateServerIntervalId = setInterval(function() {
      console.log(new Date() + ": refresing data");
      updateData();
    }, 60 * 1000);

    console.log(new Date() + ": refresing data");
    updateData();
  };

  return {
    getGroups: function() {
      return groups;
    },
    getMatches: function() {
      return matches;
    },
    getSquads: function() {
      return squads;
    },
    updateData: updateData,
    start: start
  };
};

module.exports = scraperWikipedia();