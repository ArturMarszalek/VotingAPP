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

        service.add = function (propostion) {
            return httpBaseService.sendPost(this.url, "create", propostion);
        };

        service.update = function (propostion) {
            return httpBaseService.sendPost(this.url, "update", propostion);
        }

        return service;
    }]);