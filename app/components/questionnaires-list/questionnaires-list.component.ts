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
  test: Questionnaire = new Questionnaire();

  ngOnInit(): void {
    this.getList();

    // COPIA IN QUESTIONNAIRE-EDIT
    this.questionnaireService.getQuestionnaires().then(qs=>{
      this.test = (qs.find(q=> q.id == 2));
    });
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
    let _this = this;
    BootstrapDialog.show({
            title: 'Deleting questionnaire',
            message: 'Are you sure you want to delete questionnaire: \n('+questionnaire.id+') '+questionnaire.description,
            buttons: [{
                label: 'Yes',
                action: function(d) {
                  d.close();
                  _this.questionnaireService.delete(questionnaire.id).then(()=>{
                    var index = _this.questionnaires.indexOf(questionnaire, 0);
                    if (index > -1) {
                      _this.questionnaires.splice(index, 1);
                    }
                  });
                }
            }, {
                label: 'No',
                action: function(d) {
                  d.close();
                }
            }]
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


