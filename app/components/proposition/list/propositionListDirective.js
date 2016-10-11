'use strict';
angular.module('VotingApp')
    .directive('propositionList', function () {
        return {
            restrict: 'E',
            templateUrl: "components/proposition/list/propositionListTemplate.html",
            controller: "propositionListController as ctrl"
        }
    });

