"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require("./rxjs-extensions");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var questionnaires_list_component_1 = require("./components/questionnaires-list/questionnaires-list.component");
var questionnaire_edit_component_1 = require("./components/questionnaire-edit/questionnaire-edit.component");
var sentence_edit_component_1 = require("./components/sentence-edit/sentence-edit.component");
var questionnaire_view_component_1 = require("./components/questionnaire-view/questionnaire-view.component");
var sentences_list_component_1 = require("./components/sentences-list/sentences-list.component");
var questionnaire_service_1 = require("./services/questionnaire.service");
var sentence_service_1 = require("./services/sentence.service");
var app_routing_module_1 = require("./app-routing.module");
// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryQuestionnairesData }  from './mockupdb/in-memory-questionnaires.service';
var ng2_auto_complete_1 = require("ng2-auto-complete");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpModule,
            // InMemoryWebApiModule.forRoot(InMemoryQuestionnairesData),
            ng2_auto_complete_1.Ng2AutoCompleteModule,
            ng2_bs3_modal_1.Ng2Bs3ModalModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            questionnaires_list_component_1.QuestionnaireListComponent,
            questionnaire_edit_component_1.QuestionnaireEditComponent,
            questionnaire_view_component_1.QuestionnaireViewComponent,
            sentence_edit_component_1.SentenceEditComponent,
            sentences_list_component_1.SentencesListComponent
        ],
        providers: [questionnaire_service_1.QuestionnaireService, sentence_service_1.SentenceService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map