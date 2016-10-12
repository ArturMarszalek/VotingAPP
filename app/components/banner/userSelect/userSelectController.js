'use strict';
angular.module('VotingApp')
    .controller('userSelectController', ["$scope", "userSessionModel", function ($scope, userSessionModel) {
        initializeElement();

        function initializeElement() {
            $scope.users = [
                {name: "Artur", id: 1},
                {name: "Monika", id: 2},
                {name: "Ritka", id: 3}
            ];
            var defaultValue = $scope.users[0];
            $scope.selectedUser = defaultValue;
            userSessionModel.setCurrentUser(defaultValue);
        }

        $scope.setCurrentUserInModel= function(){
            userSessionModel.setCurrentUser($scope.selectedUser);
        }
    }]);

