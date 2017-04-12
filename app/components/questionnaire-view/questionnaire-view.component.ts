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
  isShowingResults: boolean = false;

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
      questionnaire.Sections.forEach((section,sectionIndex) => {
        section.Questions.forEach((question,questionIndex) => {
          question.IsCorrect = false;
          question.Answers.forEach((answer,answerIndex) => {
            answer.IsCorrect = correct.Sections[sectionIndex]
                                      .Questions[questionIndex]
                                      .Answers[answerIndex].IsCorrect;
            if (answer.IsCorrect && answer.Selected){
              question.IsCorrect = true;
            } 
          });
        });
      });
      this.calculateReport();
    });
    this.isShowingResults = true;
  }

  calculateReport():void{
    var totalQuesitons = 0;
    var totalCorrectQuestions = 0;
    this.questionnaire.Sections.forEach((section,sectionIndex) => {
      var correctQuestions: number = 0;
      section.Questions.forEach((question,questionIndex) => {
        if (question.IsCorrect){
          correctQuestions+=1;
          totalCorrectQuestions+=1;
        }
        totalQuesitons +=1;
      });
      section.Score = correctQuestions/section.Questions.length*100;
    });
    this.questionnaire.Score = totalCorrectQuestions/totalQuesitons*100;
  }

  isRighAnswer(answer: Answer):boolean{
    return answer.IsCorrect && this.isShowingResults;
  }
  isWrongAnswer(answer: Answer):boolean{
    return answer.Selected && !answer.IsCorrect && this.isShowingResults;
  }
}

export class SectionScore {
  SectionDescription: string;
  Score: number;
}