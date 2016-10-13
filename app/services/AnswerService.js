'use strict'
angular.module('VotingApp')
    .factory('answerService', ['httpBaseService', function (httpBaseService) {
        var service = {};
        service.url = "answer";
        service.update = function (answer) {
            return httpBaseService.sendPost(this.url, "update", answer);
        };

        return service;
    }]);