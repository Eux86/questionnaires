import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app/app.component';

// Pages
import { QuestionnaireListComponent } from 'app/components/questionnaires-list/questionnaires-list.component'
import { QuestionnaireEditComponent } from 'app/components/questionnaire-edit/questionnaire-edit.component';
import { QuestionnaireViewComponent } from 'app/components/questionnaire-view/questionnaire-view.component'; 
import { SentencesListComponent } from 'app/components/sentences-list/sentences-list.component'; 
import { LoginComponent } from 'app/components/login/login.component';


// Commons
import { SentenceEditComponent } from 'app/components/sentence-edit/sentence-edit.component';
import { ImageUploadComponent } from 'app/components/common/image-upload/image-upload.component';
import { SandboxComponent } from 'app/components/common/sandbox/sandbox.component';

// Services
import { QuestionnaireService } from 'app/services/questionnaire.service'
import { SentenceService } from 'app/services/sentence.service'
import { AuthenticationService } from 'app/services/authentication.service'
import { FileUploadService } from 'app/services/file-upload.service'




import { AppRoutingModule }     from './app-routing.module';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryQuestionnairesData }  from './mockupdb/in-memory-questionnaires.service';

import { NguiAutoCompleteModule  } from '@ngui/auto-complete';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';



@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryQuestionnairesData),
    NguiAutoCompleteModule,
    Ng2Bs3ModalModule,
  ],
  declarations: [ 
    AppComponent,
    QuestionnaireListComponent,
    QuestionnaireEditComponent,
    QuestionnaireViewComponent,
    SentenceEditComponent,
    SentencesListComponent,
    LoginComponent,
    ImageUploadComponent,
    SandboxComponent ],
  providers: [QuestionnaireService,SentenceService,AuthenticationService,FileUploadService],
  bootstrap: 	[ AppComponent ]
})
export class AppModule { }
