'use strict';

describe('UserSessionModel', function () {

    var testedModel;

    beforeEach(module('VotingApp'));
    beforeEach(function () {
            inject(function (propositionService, userSessionModel) {
                testedModel = userSessionModel;
            })
        }
    );


    it('should set current user', function () {
        //given
        testedModel.setCurrentUser({id: 5});
        //when
        var currentUserId = testedModel.getCurrentUserId();
        //then
        expect(currentUserId).toEqual(5);
    });

    it('should notify register observers', function () {
        //given
        var userHandlerUser;
        testedModel.registerObserver({currentUserChangeHandler: function(user){
            userHandlerUser = user
        }})
        //when
        testedModel.setCurrentUser({id:2})
        //then
        expect(userHandlerUser.id).toEqual(2);
    });

    it('should unregister observers', function () {
        //given
        var userHandlerUser;
        var observer = {
            currentUserChangeHandler: function (user) {
                userHandlerUser = user
            }
        };
        testedModel.registerObserver(observer)
        //when
        testedModel.unregisterObserver(observer);
        testedModel.setCurrentUser({id:2})
        //then
        expect(userHandlerUser).toEqual(undefined);
    });

    it('should return copied user object', function () {
        //given
        var userInModel = {id: 2};
        testedModel.setCurrentUser(userInModel)
        //when
        var copiedUser = testedModel.getCopiedUser();
        //then
        expect(copiedUser===userInModel).toBeFalsy();
    });

});