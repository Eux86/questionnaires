import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Answer,Question,Section,Sentence,Questionnaire } from '../../data-model';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { AuthenticationService } from '../../services/authentication.service';


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
    private router: Router,
    private authService: AuthenticationService,
  ) 
  {
    
  }

  questionnaires: Questionnaire[];
  selected: Questionnaire[] =[];
  isDeleteEnabled: boolean = false;
  isEditEnabled: boolean = false;

  // Search
  searchQuery: string = "";
  isShowingSearchResult: boolean = false;

  // Paging
  currentIndex:number = 0;
  quantity:number = 10;
  totalNumber:number = 0;
  pages: Page[] = [];
  isPreviousEnabled: boolean = false;
  isNextEnabled: boolean = true;

  isAdmin: Boolean = true;

  ngOnInit(): void {
    this.getList();
    this.isAdmin = this.authService.isAdmin();
  }

  getList(): void {
    this.questionnaireService.getQuestionnaires(this.currentIndex*this.quantity,this.quantity).subscribe(
      questionnaires => this.questionnaires = questionnaires,
      ()=>{}, // error
      ()=>{} // completed
    )
    this.getTotalNumber();
  }

  calculatePaging():void{
    let numberOfPages = this.totalNumber/this.quantity;
    this.pages = [];
    for (let i=0;i<numberOfPages;i++){
      this.pages.push({ Text: (i+1)+"", Index:i});
    }
  }

  gotoPage(index:number):void{
    this.currentIndex = index;
    if (index<1) 
      this.isPreviousEnabled=false;
    else
      this.isPreviousEnabled=true;
    if (index>(this.totalNumber/this.quantity)-1)
      this.isNextEnabled=false;
    else
      this.isNextEnabled=true;
    this.getList();
  }
  gotoPreviousPage():void{
    if (this.currentIndex<0) return;
    this.gotoPage(this.currentIndex-1);
  }
  gotoNextPage():void{
    if (this.currentIndex>this.totalNumber) return;
    this.gotoPage(this.currentIndex+1);
  }

  confirmSearch():void{
    this.questionnaireService.getQuestionnaireBySearchText(this.searchQuery).then(
      res=> 
      {
        this.questionnaires = res;
      }
    )
    this.isShowingSearchResult = true;
  }
  onChangeSearchQuery():void{
    if (this.searchQuery==""){
      this.isShowingSearchResult = false;
    }
  }
  clearSearch():void{
    this.searchQuery="";
    this.isShowingSearchResult=false;
    this.getList();
  }

  getTotalNumber():void{
    this.questionnaireService.getTotalNumber().subscribe(
      total=> 
      {
        this.totalNumber=total;
        this.calculatePaging();
      },
      ()=>{}, // Error
      ()=>{} // Complete
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

  editSelected(){
    this.router.navigate(['/edit',this.selected[0].Id]);
  }

  gotoView(questionnaire: Questionnaire){
    this.router.navigate(['/view',questionnaire.Id]);
  }

  onSelectionChange(questionnaire:Questionnaire){
    let q: any = questionnaire;
    if (q.Selected){
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
  Text: string = "";
  Index: number = 0;
}