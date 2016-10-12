'use strict';

describe('userSelectController ', function () {

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


    it('should initialize scope data', function () {
        //given

        //when
        testedController = $controllerManager('userSelectController', {$scope: currentScope});
        //then
        expect(currentScope.users.length).toBeGreaterThan(0);
        expect(currentScope.selectedUser).not.toEqual({});
    });

    it('should set default user to userSessionModel', function () {
        //given
        spyOn(userSessionModelMock, 'setCurrentUser');
        //when
        testedController = $controllerManager('userSelectController', {$scope: currentScope});
        //then
        expect(userSessionModelMock.setCurrentUser).not.toHaveBeenCalledWith({});
        expect(userSessionModelMock.setCurrentUser).toHaveBeenCalled();
    });

    it('should set current user', function () {
        //given
        testedController = $controllerManager('userSelectController', {$scope: currentScope});
        spyOn(userSessionModelMock, 'setCurrentUser');
        currentScope.selectedUser = {name:"Elizabeth"};
        //when
        currentScope.setCurrentUserInModel();
        //then
        expect(userSessionModelMock.setCurrentUser).toHaveBeenCalledWith({name:"Elizabeth"});
    });

});