"use strict";
var InMemoryQuestionnairesData = (function () {
    function InMemoryQuestionnairesData() {
    }
    InMemoryQuestionnairesData.prototype.createDb = function () {
        var questionnaires = [
            {
                id: 1,
                description: 'Questionnaire n.1',
                sections: [
                    {
                        id: 1,
                        description: 'Section 1',
                        questions: [{
                                id: 1,
                                sentence: {
                                    id: 1,
                                    text: 'adapted. Numerous ladyship so raillery humoured goodness received an. So narrow formal length my '
                                },
                                answers: [
                                    {
                                        id: 1,
                                        sentence: {
                                            id: 2,
                                            text: 'sentence 2'
                                        },
                                        isCorrect: true
                                    },
                                    {
                                        id: 2,
                                        sentence: {
                                            id: 3,
                                            text: 'sentence 3'
                                        },
                                        isCorrect: false
                                    }
                                ]
                            }, {
                                id: 2,
                                sentence: {
                                    id: 1,
                                    text: 'sentence 2123'
                                },
                                answers: [
                                    {
                                        id: 1,
                                        sentence: {
                                            id: 2,
                                            text: 'sentence 123213'
                                        },
                                        isCorrect: true
                                    },
                                    {
                                        id: 2,
                                        sentence: {
                                            id: 3,
                                            text: 'sentence 234234'
                                        },
                                        isCorrect: false
                                    }
                                ]
                            }]
                    },
                ]
            },
            {
                id: 2,
                description: 'second questionnaire (empty)',
                sections: []
            }
        ];
        var sentences = [
            { id: '1', text: 'adapted. Numerous ladyship so raillery humoured goodness received an. So narrow formal length my ' },
            { id: '2', text: 'Pretty merits waited six talked pulled you. Conduct replied off led whether any shortly why arrived  ' },
            { id: '3', text: 'Surrounded to me occasional pianoforte alteration unaffected impossible ye. For saw half than cold. ' },
            { id: '4', text: 'highly longer afford oh. Tall neat he make or at dull ye. ' },
            { id: '5', text: 'Sociable on as carriage my position weddings raillery consider. Peculiar trifling absolute' },
            { id: '6', text: 'vicinity property yet. The and collecting motionless difficulty son. His hearing staying ten colonel' },
            { id: '7', text: 'Sex drew six easy four dear cold deny. Moderate children at of outweigh it. Unsatiable it considered' },
            { id: '8', text: 'invitation he travelling insensible. Consulted admitting oh mr up as described acuteness' },
            { id: '9', text: 'Attachment apartments in delightful by motionless it no. And now she burst sir learn total' },
            { id: '10', text: 'hearted shewing own ask. Solicitude uncommonly use her motionless not collecting age' },
            { id: '11', text: 'servants required mistaken outlived bed and. Remainder admitting neglected is he belonging' },
        ];
        return { questionnaires: questionnaires, sentences: sentences };
    };
    return InMemoryQuestionnairesData;
}());
exports.InMemoryQuestionnairesData = InMemoryQuestionnairesData;
//# sourceMappingURL=in-memory-questionnaires.service.js.map