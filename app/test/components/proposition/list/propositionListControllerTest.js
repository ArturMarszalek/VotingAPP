'use strict';

describe('propositionListController ', function () {

    var testedController, currentScope, $controllerManager, propositionServiceMock, mdToastMock;

    beforeEach(module('VotingApp'));
    beforeEach(function () {
            inject(function (_$controller_, $rootScope, propositionService, $mdToast) {
                mdToastMock = $mdToast;
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

    it('should set current proposition to empty object when user click same proposition', function () {
        //given
        testedController = $controllerManager('propositionListController', {$scope: currentScope});
        currentScope.currentProposition = {id: 15};
        var proposition = {id: 15};
        //when
        currentScope.propositionClick(proposition);
        //then
        expect(currentScope.currentProposition).toEqual({});
    });

    it('should change status to approved and update proposition', function () {
        //given
        testedController = $controllerManager('propositionListController', {$scope: currentScope});
        var proposition = {id: 15};
        spyOn(propositionServiceMock, "update").and.returnValue({
            then: function () {
            }
        })
        //when
        currentScope.onApprove(proposition);
        //then
        expect(proposition.status).toEqual(PropositionStatus.APPROVED);
        expect(propositionServiceMock.update).toHaveBeenCalledWith(proposition);
    });

    it('should change status to rejected and update proposition', function () {
        //given
        testedController = $controllerManager('propositionListController', {$scope: currentScope});
        var proposition = {id: 15};
        spyOn(propositionServiceMock, "update").and.returnValue({
            then: function () {
            }
        })
        //when
        currentScope.onReject(proposition);
        //then
        expect(proposition.status).toEqual(PropositionStatus.REJECTED);
        expect(propositionServiceMock.update).toHaveBeenCalledWith(proposition);
    });

    it('should show toast about proposition updated after successfully data change', function () {
        //given
        testedController = $controllerManager('propositionListController', {$scope: currentScope});
        spyOn(propositionServiceMock, "update").and.returnValue({
            then: function (callBack) {
                callBack();
            }
        });
        spyOn(mdToastMock, "show");
        //when
        currentScope.onReject({id: 15});
        //then
        expect(mdToastMock.show).toHaveBeenCalledWith(mdToastMock.simple()
                .textContent('Proposition updated!')
                .position('top right')
                .hideDelay(1500)
        );
    });
});