'use strict';
angular.module('VotingApp')
    .directive('addProposition', function () {
        return {
            restrict: 'E',
            templateUrl: "components/proposition/add/addPropositionTemplate.html",
            controller: "addPropositionController as ctrl"
        }
    });

