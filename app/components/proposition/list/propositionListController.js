'use strict';
angular.module('VotingApp')
    .controller('propositionListController', ["$scope", "propositionService", "userSessionModel", "$mdToast", function ($scope, propositionService, userSessionModel, $mdToast) {
        $scope.propositions = [];
        $scope.currentProposition = {};
        propositionService.getPropositionsList().then(function (promise) {
            $scope.propositions = promise.data;
        });

        $scope.propositionClick = function (proposition) {
            if ($scope.currentProposition && $scope.currentProposition.id === proposition.id) {
                $scope.currentProposition = {};
            } else {
                propositionService.getPropositionWithAnswers(proposition.id).then(function (promise) {
                    proposition.answers = promise.data.answers;
                    $scope.currentProposition = proposition;
                });
            }
        }

        $scope.allowToModify = function (proposition) {
            return userSessionModel.getCurrentUserId() == proposition.owner.id && proposition.status == PropositionStatus.IN_PROGRESS;
        }

        $scope.onApprove = function (proposition) {
            proposition.status = PropositionStatus.APPROVED;
            update(proposition);
        }

        $scope.onReject = function (proposition) {
            proposition.status = PropositionStatus.REJECTED;
            update(proposition)
        }

        function update(proposition) {
            propositionService.update(proposition).then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Proposition updated!')
                        .position('top right')
                        .hideDelay(1500)
                );
            });
        }
    }]);

