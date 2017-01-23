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
var common_1 = require("@angular/common");
var data_model_1 = require("../../data-model");
var questionnaire_service_1 = require("../../services/questionnaire.service");
var QuestionnaireViewComponent = (function () {
    function QuestionnaireViewComponent(questionnaireService, route, location) {
        this.questionnaireService = questionnaireService;
        this.route = route;
        this.location = location;
        this.questionnaire = new data_model_1.Questionnaire();
        this.showCheckResults = false;
    }
    QuestionnaireViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = params['id'];
                //TODO: check if ID is numeric
                _this.questionnaireService.getQuestionnaire(+id).then(function (q) { return _this.questionnaire = q; });
            }
        });
    };
    QuestionnaireViewComponent.prototype.checkAnswers = function (questionnaire) {
        this.questionnaireService.checkQuestionnaire(questionnaire).then(function (correct) {
            questionnaire.Sections.forEach(function (section, sectionIndex) {
                section.Questions.forEach(function (question, questionIndex) {
                    question.Answers.forEach(function (answer, answerIndex) {
                        answer.IsCorrect = correct.Sections[sectionIndex]
                            .Questions[questionIndex]
                            .Answers[answerIndex].IsCorrect;
                    });
                });
            });
        });
        this.showCheckResults = true;
    };
    QuestionnaireViewComponent.prototype.isRighAnswer = function (answer) {
        return answer.IsCorrect && this.showCheckResults;
    };
    QuestionnaireViewComponent.prototype.isWrongAnswer = function (answer) {
        return answer.Selected && !answer.IsCorrect && this.showCheckResults;
    };
    return QuestionnaireViewComponent;
}());
QuestionnaireViewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'questionnaire-view',
        templateUrl: 'questionnaire-view.component.html',
        styleUrls: ['questionnaire-view.component.css'],
    }),
    __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService,
        router_1.ActivatedRoute,
        common_1.Location])
], QuestionnaireViewComponent);
exports.QuestionnaireViewComponent = QuestionnaireViewComponent;
//# sourceMappingURL=questionnaire-view.component.js.map