"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const questionnaires_list_component_1 = require("./components/questionnaires-list/questionnaires-list.component");
const questionnaire_edit_component_1 = require("./components/questionnaire-edit/questionnaire-edit.component");
const sentences_list_component_1 = require("./components/sentences-list/sentences-list.component");
const questionnaire_view_component_1 = require("./components/questionnaire-view/questionnaire-view.component");
const login_component_1 = require("./components/login/login.component");
const sandbox_component_1 = require("./components/common/sandbox/sandbox.component");
const routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: questionnaires_list_component_1.QuestionnaireListComponent },
    { path: 'edit/:id', component: questionnaire_edit_component_1.QuestionnaireEditComponent },
    { path: 'sentences', component: sentences_list_component_1.SentencesListComponent },
    { path: 'view/:id', component: questionnaire_view_component_1.QuestionnaireViewComponent },
    { path: 'login/:logout', component: login_component_1.LoginComponent },
    { path: 'sandbox', component: sandbox_component_1.SandboxComponent },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map