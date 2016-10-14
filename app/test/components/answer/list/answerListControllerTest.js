'use strict';

describe('answerListController', function () {

    var testedController, currentScope, $controllerManager, userSessionModelMock, answerServiceMock;

    beforeEach(module('VotingApp'));
    beforeEach(function () {
            inject(function (_$controller_, $rootScope, userSessionModel, answerService) {
                answerServiceMock = answerService;
                userSessionModelMock = userSessionModel;
                currentScope = $rootScope.$new();
                $controllerManager = _$controller_;
            })
            spyOn(answerServiceMock, 'update').and.returnValue({then:function(){

            }});
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
        expect(answerServiceMock.update).toHaveBeenCalledWith(answer);
    });

    it('should set answer status as approved', function () {
        //given
        testedController = $controllerManager('answerListController', {$scope: currentScope});
        var answer = {};
        //when
        currentScope.onApprove(answer);
        //then
        expect(answer.status).toEqual(PropositionStatus.APPROVED);
        expect(answerServiceMock.update).toHaveBeenCalledWith(answer);
    });

    it('should allow to modify when current user answer is same like user and status is work in progress', function () {
        //given
        testedController = $controllerManager('answerListController', {$scope: currentScope});
        currentScope.currentUserId=15;
        var answer = {user:{id:15}, status: PropositionStatus.IN_PROGRESS};
        //when
        var result = currentScope.allowToModify(answer);
        //then
        expect(result).toBeTruthy();
    });

    it('should not allow to modify when current user answer is same like user and status is NOT work in progress', function () {
        //given
        testedController = $controllerManager('answerListController', {$scope: currentScope});
        currentScope.currentUserId=15;
        var answer = {user:{id:15}, status: PropositionStatus.REJECTED};
        //when
        var result = currentScope.allowToModify(answer);
        //then
        expect(result).toBeFalsy();
    });

    it('should not allow to modify when current user answer is NOT same like user and status is work in progress', function () {
        //given
        testedController = $controllerManager('answerListController', {$scope: currentScope});
        currentScope.currentUserId=14;
        var answer = {user:{id:15}, status: PropositionStatus.IN_PROGRESS};
        //when
        var result = currentScope.allowToModify(answer);
        //then
        expect(result).toBeFalsy();
    });

});