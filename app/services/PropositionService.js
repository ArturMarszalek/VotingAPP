'use strict'
angular.module('VotingApp')
    .factory('propositionService', ['httpBaseService', function (httpBaseService) {
        var service = {};
        service.url = "proposition";
        service.getPropositionsList = function () {
            return httpBaseService.sendGet(this.url, "list");
        };

        service.getPropositionWithAnswers = function (propositionId) {
            return httpBaseService.sendGet(this.url, "getPropositionWithAnswers", propositionId);
        };

        return service;
    }]);