'use strict';

describe('propositionListController ', function () {

    var testedController, currentScope, $controllerManager, propositionServiceMock;

    beforeEach(module('VotingApp'));
    beforeEach(function () {
            inject(function (_$controller_, $rootScope, propositionService) {
                propositionServiceMock = propositionService
                currentScope = $rootScope.$new();
                $controllerManager = _$controller_;
            })
        }
    );


    it('propositionListController should be defined', function () {
        //given

        //when
        testedController = $controllerManager('propositionListController', {$scope: currentScope});
        //then
        expect(testedController).toBeDefined();
    });

    it('should initialize scope objects', function () {
        //given

        //when
        testedController = $controllerManager('propositionListController', {$scope: currentScope});
        //then
        expect(currentScope.propositions).toEqual([]);
        expect(currentScope.currentProposition).toEqual({});
    });

    it('should sent request to baseService at initialize, then set propositionList from response', function () {
        //given
        spyOn(propositionServiceMock, "getPropositionsList").and.returnValue({
            then: function (callBack) {
                callBack({data: ["propositionList"]});
            }
        });

        //when
        testedController = $controllerManager('propositionListController', {$scope: currentScope});
        //then
        expect(currentScope.propositions).toEqual(["propositionList"]);
    });

    it('should sent request to baseService when current proposition is not same as clicked, then set proposition answers from response', function () {
        //given
        testedController = $controllerManager('propositionListController', {$scope: currentScope});
        spyOn(propositionServiceMock, "getPropositionWithAnswers").and.returnValue({
            then: function (callBack) {
                callBack({
                    data: {
                        answers: ["answerList"]
                    }
                });
            }
        });
        var proposition = {id: 15};
        //when
        currentScope.propositionClick(proposition);
        //then
        expect(currentScope.currentProposition).toEqual(proposition);
        expect(currentScope.currentProposition.answers).toEqual(["answerList"]);
    });

    it('should set current propostion to empty object when user click same proposition', function () {
        //given
        testedController = $controllerManager('propositionListController', {$scope: currentScope});
        currentScope.currentProposition = {id: 15};
        var proposition = {id: 15};
        //when
        currentScope.propositionClick(proposition);
        //then
        expect(currentScope.currentProposition).toEqual({});
    });

});