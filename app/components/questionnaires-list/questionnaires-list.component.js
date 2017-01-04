"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_model_1 = require("../../data-model");
var questionnaire_service_1 = require("../../services/questionnaire.service");
var QuestionnaireListComponent = (function () {
    function QuestionnaireListComponent(questionnaireService, router) {
        this.questionnaireService = questionnaireService;
        this.router = router;
        this.test = new data_model_1.Questionnaire();
    }
    QuestionnaireListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getList();
        // COPIA IN QUESTIONNAIRE-EDIT
        this.questionnaireService.getQuestionnaires().then(function (qs) {
            _this.test = (qs.find(function (q) { return q.id == 2; }));
        });
    };
    QuestionnaireListComponent.prototype.getList = function () {
        var _this = this;
        this.questionnaireService.getQuestionnaires().then(function (questionnaires) {
            _this.questionnaires = questionnaires;
        });
    };
    QuestionnaireListComponent.prototype.createQuestionnaire = function () {
        var _this = this;
        this.questionnaireService.create().then(function (newQuest) {
            _this.router.navigate(['/edit/', newQuest.id]);
        });
    };
    QuestionnaireListComponent.prototype.delete = function (questionnaire) {
        var _this = this;
        // BootstrapDialog.show({
        //         title: 'Deleting questionnaire',
        //         message: 'Are you sure you want to delete questionnaire: \n('+questionnaire.id+') '+questionnaire.description,
        //         buttons: [{
        //             label: 'Yes',
        //             action: function(d) {
        //               d.close();
        //               _this.questionnaireService.delete(questionnaire.id).then(()=>{
        //                 var index = _this.questionnaires.indexOf(questionnaire, 0);
        //                 if (index > -1) {
        //                   _this.questionnaires.splice(index, 1);
        //                 }
        //               });
        //             }
        //         }, {
        //             label: 'No',
        //             action: function(d) {
        //               d.close();
        //             }
        //         }]
        //     });
    };
    QuestionnaireListComponent.prototype.gotoEdit = function (questionnaire) {
        this.router.navigate(['/edit', questionnaire.id]);
    };
    QuestionnaireListComponent.prototype.gotoView = function (questionnaire) {
        this.router.navigate(['/view', questionnaire.id]);
    };
    return QuestionnaireListComponent;
}());
QuestionnaireListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'questionnaires-list',
        templateUrl: 'questionnaires-list.component.html',
        styleUrls: ['questionnaires-list.component.css'],
    }),
    __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService,
        router_1.Router])
], QuestionnaireListComponent);
exports.QuestionnaireListComponent = QuestionnaireListComponent;
//# sourceMappingURL=questionnaires-list.component.js.map