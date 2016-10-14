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
            return DataBaseConnectionResolver.createGetResponseForUrl(url);
            return $http({
                method: 'GET',
                url: url
            });
        }

        service.sendPost = function (serviceUrl, method, content) {
            var url = "/" + serviceUrl + "/" + method;
            //TO REMOVE AFTER BACKEND WORKS  -- START //TODO
            return DataBaseConnectionResolver.createPostResponseForUrl(url, content);
            return $http({
                method: 'POST',
                url: url,
                data: angular.toJson(content)
            });
        };

        return service;
    }]);