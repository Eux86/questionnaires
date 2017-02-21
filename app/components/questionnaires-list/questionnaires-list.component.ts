import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Answer,Question,Section,Sentence,Questionnaire } from '../../data-model';
import { QuestionnaireService } from '../../services/questionnaire.service';

declare var BootstrapDialog: any;

@Component({
  moduleId: module.id,
  selector: 'questionnaires-list',
  templateUrl: 'questionnaires-list.component.html',
  styleUrls: ['questionnaires-list.component.css'],
})

export class QuestionnaireListComponent implements OnInit {
  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router
  ) 
  {
    
  }

  questionnaires: Questionnaire[];
  selected: Questionnaire[] =[];
  isDeleteEnabled: boolean = false;
  isEditEnabled: boolean = false;

  isAdmin: Boolean = true;

  ngOnInit(): void {
    this.getList();

    // COPIA IN QUESTIONNAIRE-EDIT
  }

  getList(): void {
    this.questionnaireService.getQuestionnaires().then(
      questionnaires => {
        this.questionnaires = questionnaires;
      }
    )
  }

  createQuestionnaire(){
    this.questionnaireService.create().then(
      newQuest => {
        this.router.navigate(['/edit/',newQuest.Id]);
      }
    )
  }


  confirmDelete (): void{
    this.questionnaireService.deleteList(this.selected).then(()=>{
      this.getList();
      this.selected=[];
    });
  }

  gotoEdit(questionnaire: Questionnaire){
    this.router.navigate(['/edit',questionnaire.Id]);
  }

  gotoView(questionnaire: Questionnaire){
    this.router.navigate(['/view',questionnaire.Id]);
  }

  onSelectionChange(questionnaire:Questionnaire){
    let q: any = questionnaire;
    if (!q.Selected){
      this.selected.push(questionnaire);
    } else {
      let index = -1;
      for(let i=0; i< this.selected.length; i++){
        if (this.selected[i].Id==questionnaire.Id){
          index=i;
          break;
        }
      }
      if (index!=-1){
        this.selected.splice(index,1);
      }
    }
    this.isEditEnabled = this.selected.length==1;
    this.isDeleteEnabled = this.selected.length>0;
  }


}


