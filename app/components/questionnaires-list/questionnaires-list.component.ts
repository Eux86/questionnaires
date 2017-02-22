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

  // Paging
  startIndex:number = 0;
  quantity:number = 10;
  totalNumber:number = 0;
  currentPage:number = 1;
  pages: Page[] = [];

  isAdmin: Boolean = true;

  ngOnInit(): void {
    this.getList();

    // COPIA IN QUESTIONNAIRE-EDIT
  }

  getList(): void {
    this.questionnaireService.getQuestionnaires(this.startIndex,this.quantity).then(
      questionnaires => {
        this.questionnaires = questionnaires;
      }
    )
    this.getTotalNumber();
  }

  calculatePaging():void{
    let numberOfPages = this.totalNumber/this.quantity;
    this.pages = [];
    for (let i=0;i<numberOfPages;i++){
      this.pages.push({ Text: (i+1)+"", Link:"#"});
    }
  }

  getTotalNumber():void{
    this.questionnaireService.getTotalNumber().then(
      total=> 
      {
        this.totalNumber=total;
        this.calculatePaging();
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



export class Page{
  Link: string = "";
  Text: string = "";
}