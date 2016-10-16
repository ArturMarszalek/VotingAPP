'use strict';
var DataBaseConnectionResolver = {};
(function () {

    var _$q;
    angular.module('VotingApp', ['ngMaterial', 'ngAnimate', 'ngMessages'])
        .run(function ($log, $q) {
            _$q = $q;
            $log.debug("starterApp VotingApp!!");
        });
    ;

    /**
     * TO REMOVE AFTER BACKEND WORKS
     * Its simulate backend requests...
     */
    'use strict'
    var SERVER_TIME_OUT = 600;
    var _propositionIdCounter = 1000;
    var _answerIdCounteer = 8000;
    DataBaseConnectionResolver.createGetResponseForUrl = function (url) {
        console.log("sent HTTP GET request for URL: " + url);
        if (url == "/proposition/list") {
            return this.listProposition();
        }
        if (url.indexOf("/proposition/getPropositionWithAnswers/") > -1) {
            return this.returnPropositionWithAnswers(url.split('/')[3])
        }
        return {
            then: function () {
                console.log("No matching pattern for URL: " + url);
            }
        }
    };

    DataBaseConnectionResolver.createPostResponseForUrl = function (url, content) {
        console.log("sent HTTP POST request for URL: " + url);
        if (url == "/proposition/create") {
            return this.returnCreatedProposition(content);
        }
        if (url == "/proposition/update") {
            return this.createBackendResponse({});
        }
        return this.createBackendResponse().finally(function () {
                console.log("No matching pattern for URL: " + url);
            }
        )
    };

    DataBaseConnectionResolver.returnCreatedProposition = function (content) {
        var proposition = {
            id: _propositionIdCounter++,
            description: content.description,
            answers: [
                {id: _answerIdCounteer++, user: availableUsersList[0], status: PropositionStatus.IN_PROGRESS, comment:""},
                {id: _answerIdCounteer++, user: availableUsersList[1], status: PropositionStatus.IN_PROGRESS, comment:""},
                {id: _answerIdCounteer++, user: availableUsersList[2], status: PropositionStatus.IN_PROGRESS, comment:""}
            ],
            status: PropositionStatus.IN_PROGRESS,
            owner: content.owner,
        };
        return this.createBackendResponse(proposition);
    };

    DataBaseConnectionResolver.createBackendResponse = function (dataToReturn) {
        var deferred = _$q.defer();

        setTimeout(function () {
            deferred.resolve({data: dataToReturn});
        }, SERVER_TIME_OUT);

        return deferred.promise;
    };

    DataBaseConnectionResolver.listProposition = function () {
        var propositions = mockedDataList;
        return this.createBackendResponse(propositions);
    };

    DataBaseConnectionResolver.returnPropositionWithAnswers = function (propositionId) {
        for (var index = 0; index < mockedDataList.length; index++) {
            if (mockedDataList[index].id == propositionId) {
                return this.createBackendResponse(mockedDataList[index]);
            }
        }
        return this.createBackendResponse({});
    };
    var availableUsersList = [
        {name: "Artur", id: 1},
        {name: "Monika", id: 2},
        {name: "Ritka", id: 3}
    ];
    var mockedDataList = [
        {
            id: 1,
            description: "I want to buy 100 computers and monitors. I know its expensive but we can try..",
            status: PropositionStatus.IN_PROGRESS,
            owner: availableUsersList[0],
            answers: [
                {id: 1, user: availableUsersList[0], status: PropositionStatus.REJECTED,  comment:"I cant agree with that, sorry."},
                {id: 2, user: availableUsersList[1], status: PropositionStatus.IN_PROGRESS,  comment: ""},
                {id: 3, user: availableUsersList[2], status: PropositionStatus.APPROVED, comment:"Ok! good idea!"}
            ]
        },
        {
            id: 2,
            description: "I want to create a group. That group will include all developers from the word!!",
            status: PropositionStatus.REJECTED,
            owner: availableUsersList[1],
            answers: [
                {id: 1, user: availableUsersList[0], status: PropositionStatus.REJECTED, comment:"I cant agree with that, sorry."},
                {id: 2, user: availableUsersList[1], status: PropositionStatus.APPROVED, comment:"From my view, that has a sense."},
                {id: 3, user: availableUsersList[2], status: PropositionStatus.REJECTED,  comment:"You can try it by yourself. Im off."}
            ]
        },
        {
            id: 3,
            description: "I want to eat dinner every day. Please let me do that. Lets vote!",
            status: PropositionStatus.APPROVED,
            owner: availableUsersList[2],
            answers: [
                {id: 1, user: availableUsersList[0], status: PropositionStatus.APPROVED, comment:"Ok"},
                {id: 2, user: availableUsersList[1], status: PropositionStatus.REJECTED, comment:"Sorry, cant do that."},
                {id: 3, user: availableUsersList[2], status: PropositionStatus.APPROVED, comment:"Great idea. Go ahead."}
            ]
        }
    ]

    DataBaseConnectionResolver.availableUsersList = availableUsersList;

})
();

