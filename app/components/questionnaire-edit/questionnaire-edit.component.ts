import { Component, Input, OnInit, ViewChild  }         from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                         from '@angular/common';

import { Answer,Question,Section,Sentence,Questionnaire } from '../../data-model';
import { QuestionnaireService } from '../../services/questionnaire.service'
import { SentenceService } from '../../services/sentence.service'

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'questionnaire-edit',
  templateUrl: 'questionnaire-edit.component.html',
  styleUrls: ['questionnaire-edit.component.css'],
})
export class QuestionnaireEditComponent implements OnInit {
  
  @ViewChild('modalSaved')
  modalSaved: ModalComponent;
  @ViewChild('modalNewSentences')
  modalNewSentences: ModalComponent;

  questionnaire: Questionnaire = new Questionnaire();
  newSentences: Sentence[];

  constructor(
    private questionnaireService: QuestionnaireService,
    private sentenceService: SentenceService,
    private route: ActivatedRoute,
		private location: Location
  ) { 
  }
  

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
    questionnaire.Sections.push(new Section())
  }

  addQuestion(section: Section): void {
    section.Questions.push(new Question())
  }

  addAnswer(question: Question): void {
    question.Answers.push(new Answer())
  }

  delete(deletable:any){
    deletable.Deleted = true;
  }
  
  // DO NOT USE! USE DELETE
  remove(array,index):void{
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  update():void{
    this.newSentences = this.getNewSentences(this.questionnaire);
    this.modalNewSentences.open();
    // if (this.confirmNewSentencesCreation(newSentences)){
    //   this.questionnaireService.update(this.questionnaire).then(q=>{
    //     this.questionnaire = q;
    //     this.onUpdate(q);
    //   });
    // }
  }
  updateConfirm():void{
    this.sentenceService.createMany(this.newSentences).then(sentences=>
      this.questionnaireService.update(this.questionnaire).then(q=>{
        this.questionnaire = q;
        this.modalSaved.open();
      })
    );
  }

  getNewSentences(questionnaire: Questionnaire):Sentence[]{
    let newSentences = [];
    questionnaire.Sections.forEach(section => {
      section.Questions.forEach(question => {
        if (!question.Deleted && question.Sentence !=null && question.Sentence.Id===undefined){
          newSentences.push(question.Sentence);
        }
        question.Answers.forEach(answer => {
          if (!answer.Deleted && answer.Sentence !=null && answer.Sentence.Id===undefined){
            newSentences.push(answer.Sentence);
          } 
        });
      });
    });
    return newSentences;
  }

  // confirmNewSentencesCreation(sentences: Sentence[]):boolean{
  //   if (sentences!==undefined && sentences.length>0){
  //     let message: String = 'New sentences will be created: do you want to procede?';
  //     let i = 1;
  //     sentences.forEach(sentence => {
  //       message+='\n'+i++ +') '+sentence; // When it is a new sentence, the autocomplete field registers the sentence as a string, not as a Sentence
  //     });
  //     alert(message)
  //   }
  //   return true;
  // }
}