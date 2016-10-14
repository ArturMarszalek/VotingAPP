'use strict';

describe('addPropositionController ', function () {

    var testedController, currentScope, $controllerManager, propositionServiceMock, $mdToastMock;

    beforeEach(module('VotingApp'));
    beforeEach(function () {
            inject(function (_$controller_, $rootScope, propositionService, $mdToast) {
                propositionServiceMock = propositionService
                $mdToastMock = $mdToast
                currentScope = $rootScope.$new();
                $controllerManager = _$controller_;
            })
            currentScope.propositions = [];
        }
    );


    it('propositionAddController should be defined', function () {
        //given

        //when
        testedController = $controllerManager('addPropositionController', {$scope: currentScope});
        //then
        expect(testedController).toBeDefined();
    });

    it('should initialize scope objects', function () {
        //given

        //when
        testedController = $controllerManager('addPropositionController', {$scope: currentScope});
        //then
        expect(currentScope.propositionToAdd).toEqual({});
        expect(currentScope.state).toEqual("readyToAdd");
        expect(currentScope.onAddButtonClick).toBeDefined();
        expect(currentScope.addProposition).toBeDefined();
    });

    it('should change state to adding', function () {
        //given
        testedController = $controllerManager('addPropositionController', {$scope: currentScope});
        //when
        currentScope.onAddButtonClick();
        //then
        expect(currentScope.state).toEqual("adding");
    });

    it('should add proposition using propositionService', function () {
        //given
        testedController = $controllerManager('addPropositionController', {$scope: currentScope});
        var proposition = {id: 200};
        currentScope.propositionToAdd = proposition;
        spyOn(propositionServiceMock, 'add').and.returnValue({
            then: function () {
            }
        });
        //when
        currentScope.addProposition();
        //then
        expect(propositionServiceMock.add).toHaveBeenCalledWith(proposition);
    });

    it('should add proposition to list of propositions', function () {
        //given
        testedController = $controllerManager('addPropositionController', {$scope: currentScope});
        var propositionToAdd = {};

        spyOn(propositionServiceMock, 'add').and.returnValue({
            then: function (callBack) {
                callBack({data: propositionToAdd});
            }
        });
        //when
        currentScope.addProposition();
        //then
        expect(currentScope.propositions).toEqual([propositionToAdd]);
    });

    it('should change state state to default state', function () {
        //given
        testedController = $controllerManager('addPropositionController', {$scope: currentScope});
        currentScope.propositionToAdd = {someObject:"data"}
        currentScope.state = "wrongState";
        spyOn(propositionServiceMock, 'add').and.returnValue({
            then: function (callBack) {
                callBack({data:{}})
            }
        });
        //when
        currentScope.addProposition();
        //then
        expect(currentScope.state).toEqual("readyToAdd");
        expect(currentScope.propositionToAdd).toEqual({});
    });

    it('should show toast to user', function () {
        //given
        testedController = $controllerManager('addPropositionController', {$scope: currentScope});
        spyOn(propositionServiceMock, 'add').and.returnValue({
            then: function (callback) {
                callback({data: {}});
            }
        });
        spyOn($mdToastMock, 'show');
        //when
        currentScope.addProposition();
        //then
        expect($mdToastMock.show).toHaveBeenCalledWith(
                 $mdToastMock.simple()
                .textContent('Proposition created!')
                .position('top right')
                .hideDelay(1500)
        );
    });

});