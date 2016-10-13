'use strict';
angular.module('VotingApp')
    .controller('userSelectController', ["$scope", "userSessionModel", function ($scope, userSessionModel) {
        initializeElement();

        function initializeElement() {
            $scope.users = DataBaseConnectionResolver.availableUsersList;
            var defaultValue = $scope.users[0];
            $scope.selectedUser = defaultValue;
            userSessionModel.setCurrentUser(defaultValue);
        }

        $scope.setCurrentUserInModel= function(){
            userSessionModel.setCurrentUser($scope.selectedUser);
        }
    }]);

