'use strict';
angular.module('VotingApp')
    .controller('addPropositionController', ["$scope", "propositionService", "$mdToast", "userSessionModel", "$mdDialog", function ($scope, propositionService, $mdToast, userSessionModel, $mdDialog) {
        $scope.propositionToAdd = {};
        $scope.onAddButtonClick = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'components/proposition/add/addPropositionDialogTemplate.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
            })
                .then(function (description) {
                    $scope.addProposition(description);
                });
        };
        $scope.addProposition = function (description) {
            $scope.propositionToAdd.owner = userSessionModel.getCopiedUser();
            $scope.propositionToAdd.description = description;
            propositionService.add($scope.propositionToAdd).then(function (promise) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Proposition created!')
                        .position('top right')
                        .hideDelay(1500)
                );
                $scope.propositionToAdd = {};
                $scope.propositions.splice(0, 0, promise.data)
            });
        };

        function DialogController($scope, $mdDialog) {
            $scope.addPropositionOnDialog = function (description) {
                $mdDialog.hide(description);
            };
        }
    }]);

