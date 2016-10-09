'use strict';
angular.module('VotingApp')
    .directive('banner', function () {
        return {
            restrict: 'E',
            templateUrl: "components/banner/bannerTemplate.html"
        }
    });

