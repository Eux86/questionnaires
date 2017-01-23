import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryQuestionnairesData implements InMemoryDbService {
  createDb() {
    let questionnaires = [
      { // Questionnaire level
        Id: 1,
        Description: 'Questionnaire n.1',
        Sections: [
          { 
            Id: 1,
            Description: 'Section 1',
            questions: [{
              Id: 1,
              Sentence: {
                Id: 1,
                Text: 'adapted. Numerous ladyship so raillery humoured goodness received an. So narrow formal length my '
              },
              answers: [
                {
                  Id: 1,
                  Sentence: {
                    Id: 2,
                    Text: 'sentence 2'
                  },
                  IsCorrect: true
                },
                {
                  Id: 2,
                  Sentence: {
                    Id: 3,
                    Text: 'sentence 3'
                  },
                  IsCorrect: false
                }
              ]
            },{
              Id: 2,
              Sentence: {
                Id: 1,
                Text: 'sentence 2123'
              },
              answers: [
                {
                  Id: 1,
                  Sentence: {
                    Id: 2,
                    Text: 'sentence 123213'
                  },
                  IsCorrect: true
                },
                {
                  Id: 2,
                  Sentence: {
                    Id: 3,
                    Text: 'sentence 234234'
                  },
                  IsCorrect: false
                }
              ]
            }]
          },
        ]
      },
      {
        Id: 2,
        Description: 'second questionnaire (empty)',
        Sections: []
      }
    ];
    let sentences = [
      { Id: '1', Text: 'adapted. Numerous ladyship so raillery humoured goodness received an. So narrow formal length my ' },
      { Id: '2', Text: 'Pretty merits waited six talked pulled you. Conduct replied off led whether any shortly why arrived  ' },
      { Id: '3', Text: 'Surrounded to me occasional pianoforte alteration unaffected impossible ye. For saw half than cold. ' },
      { Id: '4', Text: 'highly longer afford oh. Tall neat he make or at dull ye. ' },
      { Id: '5', Text: 'Sociable on as carriage my position weddings raillery consider. Peculiar trifling absolute' },
      { Id: '6', Text: 'vicinity property yet. The and collecting motionless difficulty son. His hearing staying ten colonel' },
      { Id: '7', Text: 'Sex drew six easy four dear cold deny. Moderate children at of outweigh it. Unsatiable it considered' },
      { Id: '8', Text: 'invitation he travelling insensible. Consulted admitting oh mr up as described acuteness' },
      { Id: '9', Text: 'Attachment apartments in delightful by motionless it no. And now she burst sir learn total' },
      { Id: '10', Text: 'hearted shewing own ask. Solicitude uncommonly use her motionless not collecting age' },
      { Id: '11', Text: 'servants required mistaken outlived bed and. Remainder admitting neglected is he belonging' },
    ];
    return {questionnaires,sentences};
  }
}
