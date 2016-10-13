'use strict';

describe('answerService', function () {

    var testedService, httpBaseServiceMock;

    beforeEach(module('VotingApp'));
    beforeEach(function () {
            inject(function (answerService, httpBaseService) {
                httpBaseServiceMock = httpBaseService;
                testedService = answerService;
            })
        }
    );


    it('should send POST request to base service -update', function () {
        //given
        spyOn(httpBaseServiceMock, "sendPost").and.returnValue("baseServicePromise");;
        var answer = "answerContent";
        //when
        var result = testedService.update(answer);
        //then
        expect(httpBaseServiceMock.sendPost).toHaveBeenCalledWith('answer', 'update', answer);
        expect(result).toEqual('baseServicePromise');
    });


});