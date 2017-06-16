import { NgModule }                 from '@angular/core'
import { RouterModule, Routes }     from '@angular/router'
  

import { QuestionnaireListComponent } from 'app/components/questionnaires-list/questionnaires-list.component';
import { QuestionnaireEditComponent } from 'app/components/questionnaire-edit/questionnaire-edit.component'; 
import { SentencesListComponent } from 'app/components/sentences-list/sentences-list.component'; 
import { QuestionnaireViewComponent } from 'app/components/questionnaire-view/questionnaire-view.component';
import { LoginComponent } from 'app/components/login/login.component';
import { ErrorComponent } from 'app/components/error/error.component';
import { SandboxComponent } from 'app/components/common/sandbox/sandbox.component';
import { TranslationComponent } from 'app/components/translation/translation.component';


const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: QuestionnaireListComponent },
  { path: 'edit/:id', component: QuestionnaireEditComponent },
  { path: 'sentences', component: SentencesListComponent },
  { path: 'view/:id', component: QuestionnaireViewComponent },
  { path: 'login/:logout', component: LoginComponent },
  { path: 'sandbox', component: SandboxComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'translation', component: TranslationComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}