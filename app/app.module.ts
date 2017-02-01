import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { QuestionnaireListComponent } from './components/questionnaires-list/questionnaires-list.component'
import { QuestionnaireEditComponent } from './components/questionnaire-edit/questionnaire-edit.component';
import { SentenceEditComponent } from './components/sentence-edit/sentence-edit.component';
import { QuestionnaireViewComponent } from './components/questionnaire-view/questionnaire-view.component'; 
import { SentencesListComponent } from './components/sentences-list/sentences-list.component'; 

import { QuestionnaireService } from './services/questionnaire.service'
import { SentenceService } from './services/sentence.service'



import { AppRoutingModule }     from './app-routing.module';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryQuestionnairesData }  from './mockupdb/in-memory-questionnaires.service';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';



@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryQuestionnairesData),
    Ng2AutoCompleteModule,
    Ng2Bs3ModalModule,
  ],
  declarations: [ 
    AppComponent,
    QuestionnaireListComponent,
    QuestionnaireEditComponent,
    QuestionnaireViewComponent,
    SentenceEditComponent,
    SentencesListComponent ],
  providers: [QuestionnaireService,SentenceService],
  bootstrap: 	[ AppComponent ]
})
export class AppModule { }
