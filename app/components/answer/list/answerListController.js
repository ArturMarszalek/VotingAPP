'use strict';
angular.module('VotingApp')
    .controller('answerListController', ["$scope", "userSessionModel", function ($scope, userSessionModel) {
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

        $scope.onReject = function (answer) {
            answer.status = PropositionStatus.REJECTED;
        };

        $scope.onApprove = function (answer) {
            answer.status = PropositionStatus.APPROVED;
        };

    }]);

