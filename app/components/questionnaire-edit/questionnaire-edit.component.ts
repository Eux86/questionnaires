import { Component, Input, OnInit }         from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                         from '@angular/common';

import { Answer,Question,Section,Sentence,Questionnaire } from '../../data-model';
import { QuestionnaireService } from '../../services/questionnaire.service'

@Component({
  moduleId: module.id,
  selector: 'questionnaire-edit',
  templateUrl: 'questionnaire-edit.component.html',
  styleUrls: ['questionnaire-edit.component.css'],
})
export class QuestionnaireEditComponent implements OnInit {
  //@Input()
  questionnaire: Questionnaire = new Questionnaire();

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

  addSection(questionnaire: Questionnaire): void {
    questionnaire.sections.push(new Section())
  }

  addQuestion(section: Section): void {
    section.questions.push(new Question())
  }

  addAnswer(question: Question): void {
    question.answers.push(new Answer())
  }
  
  remove(array,index):void{
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  update():void{
    let newSentences = this.getNewSentences(this.questionnaire);
    if (this.confirmNewSentencesCreation(newSentences)){
      this.questionnaireService.update(this.questionnaire).then(q=>{
        this.questionnaire = q;
        this.onUpdate(q);
      });
    }
  }

  onUpdate(q: Questionnaire):void{
    alert('Updated: '+q.sections[0].description);
  }

  getNewSentences(questionnaire: Questionnaire):Sentence[]{
    let newSentences = [];
    questionnaire.sections.forEach(section => {
      section.questions.forEach(question => {
        if (question.sentence.id===undefined){
          newSentences.push(question.sentence);
        }
        question.answers.forEach(answer => {
          if (answer.sentence.id===undefined){
            newSentences.push(answer.sentence);
          } 
        });
      });
    });
    return newSentences;
  }

  confirmNewSentencesCreation(sentences: Sentence[]):boolean{
    if (sentences!==undefined && sentences.length>0){
      let message: String = 'New sentences will be created: do you want to procede?';
      let i = 1;
      sentences.forEach(sentence => {
        message+='\n'+i++ +') '+sentence; // When it is a new sentence, the autocomplete field registers the sentence as a string, not as a Sentence
      });
      alert(message)
    }
    return true;
  }
}