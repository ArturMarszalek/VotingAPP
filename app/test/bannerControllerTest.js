'use strict';

describe('bannerControllerTest', function () {

    var controller, $scope;

    beforeEach(module('VotingApp'));

    beforeEach(inject(function (_$controller_, $rootScope) {
        $scope = $rootScope.$new();
        controller = _$controller_('bannerController', {
            $scope: $scope
        });
    }));


    it('bannerController should be defined', function () {
        //given

        //when
        //then
        expect(controller).toBeDefined();
    });

});