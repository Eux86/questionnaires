import { NgModule }                 from '@angular/core'
import { RouterModule, Routes }     from '@angular/router'


import { QuestionnaireListComponent } from './components/questionnaires-list/questionnaires-list.component';
import { QuestionnaireEditComponent } from './components/questionnaire-edit/questionnaire-edit.component'; 
import { SentencesListComponent } from './components/sentences-list/sentences-list.component'; 
import { QuestionnaireViewComponent } from './components/questionnaire-view/questionnaire-view.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: QuestionnaireListComponent },
  { path: 'edit/:id', component: QuestionnaireEditComponent },
  { path: 'sentences', component: SentencesListComponent },
  { path: 'view/:id', component: QuestionnaireViewComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}