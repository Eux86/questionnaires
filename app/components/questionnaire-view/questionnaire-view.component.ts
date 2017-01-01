import { Component, Input, OnInit }         from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                         from '@angular/common';

import { Answer,Question,Section,Sentence,Questionnaire } from '../../data-model';
import { QuestionnaireService } from '../../services/questionnaire.service'

@Component({
  moduleId: module.id,
  selector: 'questionnaire-view',
  templateUrl: 'questionnaire-view.component.html',
  styleUrls: ['questionnaire-view.component.css'],
})
export class QuestionnaireViewComponent implements OnInit {
  questionnaire: Questionnaire = new Questionnaire();
  showCheckResults: boolean = false;

  constructor(
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
	private location: Location
  ) { }
  

  ngOnInit(): void {
    this.route.params.subscribe(params => 
    {
      if (params['id'] !== undefined) {
        let id: string = params['id'];
                                            //TODO: check if ID is numeric
        this.questionnaireService.getQuestionnaire(+id).then(q=>this.questionnaire=q);
        //this.questionnaireService.getQuestionnaire(+id).then(q=>console.log(JSON.stringify(q)));
      }
	  })
  }

  checkAnswers(questionnaire: Questionnaire):void{
    this.questionnaireService.checkQuestionnaire(questionnaire).then(correct=>{
      questionnaire.sections.forEach((section,sectionIndex) => {
        section.questions.forEach((question,questionIndex) => {
          question.answers.forEach((answer,answerIndex) => {
            answer.isCorrect = correct.sections[sectionIndex]
                                      .questions[questionIndex]
                                      .answers[answerIndex].isCorrect;
          });
        });
      });
    });
    this.showCheckResults = true;
  }

  isRighAnswer(answer: Answer):boolean{
    return answer.isCorrect && this.showCheckResults;
  }
  isWrongAnswer(answer: Answer):boolean{
    return answer.selected && !answer.isCorrect && this.showCheckResults;
  }
}