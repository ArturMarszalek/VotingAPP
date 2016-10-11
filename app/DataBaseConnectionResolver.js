/**
 * TO REMOVE AFTER BACKEND WORKS
 * Its simulate backend requests...
 */
var DataBaseConnectionResolver = {};
var SERVER_TIME_OUT = 800;

DataBaseConnectionResolver.createResponseForUrl = function (url) {
    console.log("sent HTTP request for URL: " + url);
    if (url == "/proposition/list") {
        return this.listProposition();
    }
    if (url.indexOf("/proposition/getPropositionWithAnswers/") > -1) {
        return this.returnPropositionWithAnswers()
    }
    return {
        then: function () {
            console.log("No matching pattern for URL: " + url);
        }
    }
};

DataBaseConnectionResolver.createBackendResponse = function (dataToReturn) {
    var promise = {};
    promise.then = function (callback) {
        setTimeout(function () {
            callback({data: dataToReturn});
        }, SERVER_TIME_OUT);
    }
    return promise;
};

DataBaseConnectionResolver.listProposition = function () {
    var propositions = [
        {
            id: 1,
            description: "First proposition description",
            status: PropositionStatus.IN_PROGRESS
        },
        {
            id: 2,
            description: "W przeciwieństwie do rozpowszechnionych opinii, Lorem Ipsum nie jest tylko przypadkowym tekstem. Ma ono korzenie w klasycznej łacińskiej literaturze z 45 roku przed Chrystusem, czyli ponad 2000 lat temu! Richard McClintock, wykładowca łaciny na uniwersytecie Hampden-Sydney w Virginii, przyjrzał się uważniej jednemu z najbardziej niejasnych słów w Lorem Ipsum – consectetur – i po wielu poszukiwaniach odnalazł niezaprzeczalne źródło: Lorem Ipsum pochodzi z fragmentów (1.10.32 i 1.10.33) „de Finibus Bonorum et Malorum”, czyli „O granicy dobra i zła”, napisanej właśnie w 45 p.n.e. przez Cycerona. Jest to bardzo popularna w czasach renesansu rozprawa na temat etyki. Pierwszy wiersz Lorem Ipsum, „Lorem ipsum dolor sit amet...” pochodzi właśnie z sekcji 1.10.32.",
            status: PropositionStatus.REJECTED
        },
        {
            id: 3,
            description: "Third proposition description",
            status: PropositionStatus.APPROVED
        }
    ];
    return this.createBackendResponse(propositions);
};

DataBaseConnectionResolver.returnPropositionWithAnswers = function () {
    var proposition = {
        answers: [
            {id: 1, userId: 1, userName: "Ralph", status: PropositionStatus.APPROVED},
            {id: 2, userId: 2, userName: "Viraj", status: PropositionStatus.APPROVED},
            {id: 3, userId: 3, userName: "Manisha", status: PropositionStatus.IN_PROGRESS}
        ]
    };
    return this.createBackendResponse(proposition);
};


