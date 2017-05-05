import { Component, Input, OnInit, ViewChild  }         from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                         from '@angular/common';

import { Answer,Question,Section,Sentence,Questionnaire, FileModel } from '../../data-model';
import { ImageUploadComponent } from '../common/image-upload/image-upload.component';
import { QuestionnaireService } from '../../services/questionnaire.service'
import { SentenceService } from '../../services/sentence.service'
import { FileUploadService } from '../../services/file-upload.service'

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
  @ViewChild('modalFileUpload')
  modalFileUpload: ModalComponent;
  @ViewChild('infoModal')
  infoModal: ModalComponent;

  @ViewChild('uploadImageComponent')
  uploadImageComponent: ImageUploadComponent;

  questionnaire: Questionnaire = new Questionnaire();
  newSentences: Sentence[];
  infoModalMessage: string = "";
  questionToAssociateImage: Question;

  // Upload modal
  imageUploaded: boolean = false;
  uploadingImage: boolean = false;
  imageToUpload: File = null;

  constructor(
    private questionnaireService: QuestionnaireService,
    private sentenceService: SentenceService,
    private fileUploadService: FileUploadService,
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
    if (questionnaire.Sections==null) questionnaire.Sections= [];
    questionnaire.Sections.push(new Section())
  }

  addQuestion(section: Section): void {
    if (section.Questions==null) section.Questions= [];
    section.Questions.push(new Question())
  }

  addAnswer(question: Question): void {
    if (question.Answers==null) question.Answers = [];
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
      {
        this.questionnaire = this.updateSentenceId(this.questionnaire,sentences);
        return this.questionnaireService.update(this.questionnaire).then(q=>{
          this.questionnaire = q;
          this.modalSaved.open();
      })
      }
    );
  }

  updateSentenceId(questionnaire: Questionnaire, sentences: Sentence[]):Questionnaire{
    questionnaire.Sections.forEach(section => {
      if (section.Questions!=null)
      {
        section.Questions.forEach(question => {
          if (question.Sentence !=null && question.Sentence.Id===undefined){
            if (sentences!= null){
              sentences.forEach(s => {
                let sentenceText: any = question.Sentence;
                if (s.Text == sentenceText){
                  question.Sentence = new Sentence();
                  question.Sentence.Text = sentenceText;
                  question.Sentence.Id = s.Id;
                }
              });
            }
          }
          if (question.Answers!=null) 
          {
            question.Answers.forEach(answer => {
              if (answer.Sentence !=null && answer.Sentence.Id===undefined){
                  if (sentences!=null){
                    sentences.forEach(s => {
                    let sentenceText: any = answer.Sentence;
                    if (s.Text == sentenceText){
                      answer.Sentence = new Sentence();
                      answer.Sentence.Text = sentenceText;
                      answer.Sentence.Id = s.Id;
                    }
                  });
                }
              } 
            });
          }
        });
      }
    });
    return questionnaire;
  }

  getNewSentences(questionnaire: Questionnaire):Sentence[]{
    let newSentences = [];
    questionnaire.Sections.forEach(section => {
      if (section.Questions!=null){
        section.Questions.forEach(question => {
          if (!question.Deleted && question.Sentence !=null && question.Sentence.Id===undefined){
            let sentence = new Sentence();
              // I know that if it's new it is a string
              let temp:any;
              temp = question.Sentence;
              sentence.Text = temp;
              sentence.Id = 0;
              //--------------------------------
              newSentences.push(sentence);
          } else if (question.Sentence!=null && question.Sentence.Text===""){
            question.Sentence = null;
          }
          if (question.Answers!=null)
          {
            question.Answers.forEach(answer => {
              if (!answer.Deleted && answer.Sentence !=null && answer.Sentence.Id===undefined){
                let sentence = new Sentence();
                // I know that if it's new it is a string
                let temp:any;
                temp = answer.Sentence;
                sentence.Text = temp;
                sentence.Id = 0;
                //--------------------------------
                newSentences.push(sentence);
              } else if (answer.Sentence!=null && answer.Sentence.Text===""){
                answer.Sentence = null;
              }
            });
          }
        });
      }
    });
    return newSentences;
  }

  //############  Upload stuffs
  uploadImageForQuestion(question:Question):void{
    this.uploadImageComponent.reset();
    this.modalFileUpload.open();
    this.questionToAssociateImage = question;
    this.imageToUpload = null;
  }
  uploadFinished(success:boolean, argument: any){
    if (success){
      let file = argument as FileModel;
      this.questionToAssociateImage.FileId = file.Id;
      this.modalFileUpload.dismiss();
      this.imageUploaded = true;
    } else {
      this.infoModalMessage = "Couldn't upload the file\n"+argument
      this.infoModal.open()
      this.imageUploaded = false;      
    }
    this.uploadingImage = false;
  }
  uploadStarted():void{
    this.imageUploaded = false;
    this.uploadingImage = true;
  }
  
  
}