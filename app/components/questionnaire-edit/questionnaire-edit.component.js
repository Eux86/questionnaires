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
var QuestionnaireEditComponent = (function () {
    function QuestionnaireEditComponent(questionnaireService, route, location) {
        this.questionnaireService = questionnaireService;
        this.route = route;
        this.location = location;
        //@Input()
        this.questionnaire = new data_model_1.Questionnaire();
    }
    QuestionnaireEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = params['id'];
                //TODO: check if ID is numeric
                _this.questionnaireService.getQuestionnaire(+id).then(function (q) { return _this.questionnaire = q; });
            }
        });
    };
    QuestionnaireEditComponent.prototype.addSection = function (questionnaire) {
        questionnaire.sections.push(new data_model_1.Section());
    };
    QuestionnaireEditComponent.prototype.addQuestion = function (section) {
        section.questions.push(new data_model_1.Question());
    };
    QuestionnaireEditComponent.prototype.addAnswer = function (question) {
        question.answers.push(new data_model_1.Answer());
    };
    QuestionnaireEditComponent.prototype.remove = function (array, index) {
        if (index > -1) {
            array.splice(index, 1);
        }
    };
    QuestionnaireEditComponent.prototype.update = function () {
        var _this = this;
        var newSentences = this.getNewSentences(this.questionnaire);
        if (this.confirmNewSentencesCreation(newSentences)) {
            this.questionnaireService.update(this.questionnaire).then(function (q) {
                _this.questionnaire = q;
                _this.onUpdate(q);
            });
        }
    };
    QuestionnaireEditComponent.prototype.onUpdate = function (q) {
        alert('Updated: ' + q.sections[0].description);
    };
    QuestionnaireEditComponent.prototype.getNewSentences = function (questionnaire) {
        var newSentences = [];
        questionnaire.sections.forEach(function (section) {
            section.questions.forEach(function (question) {
                if (question.sentence.id === undefined) {
                    newSentences.push(question.sentence);
                }
                question.answers.forEach(function (answer) {
                    if (answer.sentence.id === undefined) {
                        newSentences.push(answer.sentence);
                    }
                });
            });
        });
        return newSentences;
    };
    QuestionnaireEditComponent.prototype.confirmNewSentencesCreation = function (sentences) {
        if (sentences !== undefined && sentences.length > 0) {
            var message_1 = 'New sentences will be created: do you want to procede?';
            var i_1 = 1;
            sentences.forEach(function (sentence) {
                message_1 += '\n' + i_1++ + ') ' + sentence; // When it is a new sentence, the autocomplete field registers the sentence as a string, not as a Sentence
            });
            alert(message_1);
        }
        return true;
    };
    return QuestionnaireEditComponent;
}());
QuestionnaireEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'questionnaire-edit',
        templateUrl: 'questionnaire-edit.component.html',
        styleUrls: ['questionnaire-edit.component.css'],
    }),
    __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService,
        router_1.ActivatedRoute,
        common_1.Location])
], QuestionnaireEditComponent);
exports.QuestionnaireEditComponent = QuestionnaireEditComponent;
//# sourceMappingURL=questionnaire-edit.component.js.map