'use strict'
angular.module('VotingApp')
    .factory('httpBaseService', ['$http', function ($http) {
        var service = {};

        service.sendGet = function (serviceUrl, method, arg1, arg2, arg3) {
            var url = '';
            for (var i = 0; i < arguments.length; i++) {
                url += '/' + arguments[i];
            }
            //TO REMOVE AFTER BACKEND WORKS  -- START //TODO
            return DataBaseConnectionResolver.createResponseForUrl(url);
            return $http({
                method: 'GET',
                url: url
            });
        }

        return service;
    }]);