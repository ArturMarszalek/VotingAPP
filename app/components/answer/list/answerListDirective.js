'use strict';
angular.module('VotingApp')
    .directive('answerList', function () {
        return {
            restrict: 'E',
            templateUrl: "components/answer/list/answerListTemplate.html",
            scope: {
                answers: "=",
            }
        }
    });

