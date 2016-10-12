'use strict';

describe('answerListController', function () {

    var testedController, currentScope, $controllerManager, userSessionModelMock

    beforeEach(module('VotingApp'));
    beforeEach(function () {
            inject(function (_$controller_, $rootScope, userSessionModel) {
                userSessionModelMock = userSessionModel;
                currentScope = $rootScope.$new();
                $controllerManager = _$controller_;
            })
        }
    );


    it('should initialize current user id', function () {
        //given
        spyOn(userSessionModelMock, "getCurrentUserId").and.returnValue(5);
        //when
        testedController = $controllerManager('answerListController', {$scope: currentScope});
        //then
        expect(currentScope.currentUserId).toEqual(5);
    });

    it('should register as observer for sessionUserModel observers list ', function () {
        //given
        spyOn(userSessionModelMock, "registerObserver");
        //when
        testedController = $controllerManager('answerListController', {$scope: currentScope});
        //then
        expect(userSessionModelMock.registerObserver).toHaveBeenCalledWith(currentScope);
    });

    it('should initialize scope on destroy event to unregister from observers list', function () {
        //given
        var registerOnEventName;
        spyOn(userSessionModelMock, "unregisterObserver");
        spyOn(currentScope, "$on").and.callFake(function (eventName, callbackFunction) {
            registerOnEventName = eventName;
            callbackFunction();
        });
        //when
        testedController = $controllerManager('answerListController', {$scope: currentScope});
        //then
        expect(userSessionModelMock.unregisterObserver).toHaveBeenCalledWith(currentScope);
        expect(registerOnEventName).toEqual("$destroy");
    });

    it('should set answer status as rejected', function () {
        //given
        testedController = $controllerManager('answerListController', {$scope: currentScope});
        var answer = {};
        //when
        currentScope.onReject(answer)
        //then
        expect(answer.status).toEqual(PropositionStatus.REJECTED);
    });

    it('should set answer status as approved', function () {
        //given
        testedController = $controllerManager('answerListController', {$scope: currentScope});
        var answer = {};
        //when
        currentScope.onApprove(answer)
        //then
        expect(answer.status).toEqual(PropositionStatus.APPROVED);
    });

});