'use strict';
angular.module('VotingApp')
    .controller('addPropositionController', ["$scope", "propositionService", "$mdToast", "userSessionModel", function ($scope, propositionService, $mdToast, userSessionModel) {
        $scope.propositionToAdd = {};
        $scope.state = "readyToAdd";
        $scope.onAddButtonClick = function () {
            $scope.state = "adding";
        };
        $scope.addProposition = function () {
            $scope.propositionToAdd.owner = userSessionModel.getCopiedUser();
            propositionService.add($scope.propositionToAdd).then(function (promise) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Proposition created!')
                        .position('top right')
                        .hideDelay(1500)
                );
                $scope.state = "readyToAdd";
                $scope.propositionToAdd = {};
                $scope.propositions.splice(0, 0, promise.data)
            });
        };

    }]);

