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
var app_routing_module_1 = require("./app-routing.module");
// Imports for loading & configuring the in-memory web api
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var in_memory_questionnaires_service_1 = require("./mockupdb/in-memory-questionnaires.service");
var ng2_auto_complete_1 = require("ng2-auto-complete");
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
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_questionnaires_service_1.InMemoryQuestionnairesData),
            ng2_auto_complete_1.Ng2AutoCompleteModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            questionnaires_list_component_1.QuestionnaireListComponent,
            questionnaire_edit_component_1.QuestionnaireEditComponent,
            questionnaire_view_component_1.QuestionnaireViewComponent,
            sentence_edit_component_1.SentenceEditComponent,
            sentences_list_component_1.SentencesListComponent
        ],
        providers: [questionnaire_service_1.QuestionnaireService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map