'use strict';
angular.module('VotingApp')
    .directive('main', function () {
        return {
            restrict: 'E',
            templateUrl: "components/main/mainTemplate.html"
        }
    });

