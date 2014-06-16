'use strict'

angular.module('worldCupStatsApp')
  .factory 'Session', ($resource) ->
    $resource '/api/session/'
