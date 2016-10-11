'use strict';
angular.module('VotingApp')
    .controller('propositionListController', ["$scope", "propositionService", function ($scope, propositionService) {
        $scope.propositions = [];
        $scope.currentProposition = {};
        propositionService.getPropositionsList().then(function (promise) {
            $scope.propositions = promise.data;
            $scope.$digest();
        });

        $scope.propositionClick = function (proposition) {
            if ($scope.currentProposition && $scope.currentProposition.id === proposition.id) {
                $scope.currentProposition = {};
            } else {
                propositionService.getPropositionWithAnswers(proposition.id).then(function (promise) {
                    proposition.answers = promise.data.answers;
                    $scope.currentProposition = proposition;
                    $scope.$digest();
                });
            }
        }

    }]);

