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
  selected: Questionnaire = new Questionnaire();

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
        this.router.navigate(['/edit/',newQuest.id]);
      }
    )
  }


  delete (questionnaire: Questionnaire): void{
    this.questionnaireService.delete(questionnaire.id).then(()=>{
      var index = this.questionnaires.indexOf(questionnaire, 0);
      if (index > -1) {
        this.questionnaires.splice(index, 1);
      }
    });
  }

  gotoEdit(questionnaire: Questionnaire){
    this.router.navigate(['/edit',questionnaire.id]);
  }

  gotoView(questionnaire: Questionnaire){
    this.router.navigate(['/view',questionnaire.id]);
  }

//   onSelect(hero: Hero): void {
//     this.selectedHero = hero;
//   }

//   gotoDetail(): void {
//     this.router.navigate(['/detail',this.selectedHero.id]);
//   }

//   add(name: string): void {
//     name = name.trim();
//     if (!name) {return; }
//     this.heroService.create(name)
//       .then(hero=>{
//         this.heroes.push(hero);
//         this.selectedHero = null;
//       });
//   }

//   delete (hero: Hero): void{
//     this.heroService
//         .delete(hero.id).then(()=> {
//           this.heroes = this.heroes.filter(h=>h !== hero);
//           if (this.selectedHero === hero) {
//             this.selectedHero = null;
//           }
//         });
//   }

}


