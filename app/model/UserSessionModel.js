'use strict'
angular.module('VotingApp')
    .factory('userSessionModel', [function () {
        var userSessionModel = function () {
            var currentUser = {};
            var observers = [];
            this.setCurrentUser = function (user) {
                currentUser = user;
                notifyObserversAboutChange(currentUser);
            };

            function notifyObserversAboutChange() {
                angular.forEach(observers, function (observer) {
                    observer.currentUserChangeHandler(currentUser);
                })
            }

            this.registerObserver = function (observer) {
                observers.push(observer);
            };

            this.unregisterObserver = function (observer) {
                var observerIndex = observers.indexOf(observer);
                observers.splice(observerIndex, 1);
            };

            this.getCurrentUserId = function () {
                return currentUser.id;
            };
        }
        return new userSessionModel();
    }]);