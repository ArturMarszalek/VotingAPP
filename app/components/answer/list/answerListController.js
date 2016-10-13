'use strict';
angular.module('VotingApp')
    .controller('answerListController', ["$scope", "userSessionModel", "answerService", "$mdToast", function ($scope, userSessionModel, answerService, $mdToast) {
        $scope.currentUserId = userSessionModel.getCurrentUserId();
        initializeCurrentUserChangesHandler();

        function initializeCurrentUserChangesHandler() {
            $scope.$on("$destroy", function () {
                userSessionModel.unregisterObserver($scope);
            });
            userSessionModel.registerObserver($scope);
            $scope.currentUserChangeHandler = function (user) {
                $scope.currentUserId = user.id;
            }
        }

        function updateAnswer(answer) {
            answerService.update(answer).then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Answer updated!')
                        .position('top right')
                        .hideDelay(1500)
                );
            });
        }

        $scope.onReject = function (answer) {
            answer.status = PropositionStatus.REJECTED;
            updateAnswer(answer);
        };

        $scope.onApprove = function (answer) {
            answer.status = PropositionStatus.APPROVED;
            updateAnswer(answer);
        };

    }]);

