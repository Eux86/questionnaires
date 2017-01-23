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
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var QuestionnaireEditComponent = (function () {
    function QuestionnaireEditComponent(questionnaireService, route, location) {
        this.questionnaireService = questionnaireService;
        this.route = route;
        this.location = location;
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
        questionnaire.Sections.push(new data_model_1.Section());
    };
    QuestionnaireEditComponent.prototype.addQuestion = function (section) {
        section.Questions.push(new data_model_1.Question());
    };
    QuestionnaireEditComponent.prototype.addAnswer = function (question) {
        question.Answers.push(new data_model_1.Answer());
    };
    QuestionnaireEditComponent.prototype.remove = function (array, index) {
        if (index > -1) {
            array.splice(index, 1);
        }
    };
    QuestionnaireEditComponent.prototype.update = function () {
        this.newSentences = this.getNewSentences(this.questionnaire);
        this.modalNewSentences.open();
        // if (this.confirmNewSentencesCreation(newSentences)){
        //   this.questionnaireService.update(this.questionnaire).then(q=>{
        //     this.questionnaire = q;
        //     this.onUpdate(q);
        //   });
        // }
    };
    QuestionnaireEditComponent.prototype.updateConfirm = function () {
        var _this = this;
        this.questionnaireService.update(this.questionnaire).then(function (q) {
            _this.questionnaire = q;
            _this.modalSaved.open();
        });
    };
    QuestionnaireEditComponent.prototype.getNewSentences = function (questionnaire) {
        var newSentences = [];
        questionnaire.Sections.forEach(function (section) {
            section.Questions.forEach(function (question) {
                if (question.Sentence.Id === undefined) {
                    newSentences.push(question.Sentence);
                }
                question.Answers.forEach(function (answer) {
                    if (answer.Sentence.Id === undefined) {
                        newSentences.push(answer.Sentence);
                    }
                });
            });
        });
        return newSentences;
    };
    return QuestionnaireEditComponent;
}());
__decorate([
    core_1.ViewChild('modalSaved'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], QuestionnaireEditComponent.prototype, "modalSaved", void 0);
__decorate([
    core_1.ViewChild('modalNewSentences'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], QuestionnaireEditComponent.prototype, "modalNewSentences", void 0);
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