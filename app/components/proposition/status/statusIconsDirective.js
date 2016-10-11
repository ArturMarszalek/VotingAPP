'use strict';
angular.module('VotingApp')
    .directive('statusIcons', function () {
        return {
            restrict: 'E',
            templateUrl: "components/proposition/status/statusIconsTemplate.html",
            scope: {
                status : "=",
            }
        }
    })
;

