'use strict';
angular.module('VotingApp')
    .directive('userSelect', function () {
        return {
            restrict: 'E',
            templateUrl: "components/banner/userSelect/userSelectTemplate.html",
            controller: "userSelectController as ctrl"
        }
    });

