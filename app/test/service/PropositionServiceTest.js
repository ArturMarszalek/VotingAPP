'use strict';

describe('propositionService', function () {

    var testedService, httpBaseServiceMock;

    beforeEach(module('VotingApp'));
    beforeEach(function () {
            inject(function (propositionService, httpBaseService) {
                httpBaseServiceMock = httpBaseService;
                testedService = propositionService;
            })
        }
    );


    it('should send request to base service -getPropositionsList', function () {
        //given
        spyOn(httpBaseServiceMock, "sendGet").and.returnValue("baseServicePromise");;
        //when
        var result = testedService.getPropositionsList();
        //then
        expect(httpBaseServiceMock.sendGet).toHaveBeenCalledWith('proposition', 'list');
        expect(result).toEqual('baseServicePromise');
    });

    it('should send request to base service -getPropositionWithAnswers', function () {
        //given
        spyOn(httpBaseServiceMock, "sendGet").and.returnValue("baseServicePromise");;
        var propositionID = 15;
        //when
        var result = testedService.getPropositionWithAnswers(propositionID);
        //then
        expect(httpBaseServiceMock.sendGet).toHaveBeenCalledWith('proposition', 'getPropositionWithAnswers', 15);
        expect(result).toEqual('baseServicePromise');
    });




});