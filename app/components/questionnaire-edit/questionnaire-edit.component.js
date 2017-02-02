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
var sentence_service_1 = require("../../services/sentence.service");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var QuestionnaireEditComponent = (function () {
    function QuestionnaireEditComponent(questionnaireService, sentenceService, route, location) {
        this.questionnaireService = questionnaireService;
        this.sentenceService = sentenceService;
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
    QuestionnaireEditComponent.prototype.delete = function (deletable) {
        deletable.Deleted = true;
    };
    // DO NOT USE! USE DELETE
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
        this.sentenceService.createMany(this.newSentences).then(function (sentences) {
            _this.questionnaire = _this.updateSentenceId(_this.questionnaire, sentences);
            return _this.questionnaireService.update(_this.questionnaire).then(function (q) {
                _this.questionnaire = q;
                _this.modalSaved.open();
            });
        });
    };
    QuestionnaireEditComponent.prototype.updateSentenceId = function (questionnaire, sentences) {
        questionnaire.Sections.forEach(function (section) {
            section.Questions.forEach(function (question) {
                if (question.Sentence != null && question.Sentence.Id === undefined) {
                    if (sentences != null) {
                        sentences.forEach(function (s) {
                            var sentenceText = question.Sentence;
                            if (s.Text == sentenceText) {
                                question.Sentence = new data_model_1.Sentence();
                                question.Sentence.Text = sentenceText;
                                question.Sentence.Id = s.Id;
                            }
                        });
                    }
                }
                question.Answers.forEach(function (answer) {
                    if (answer.Sentence != null && answer.Sentence.Id === undefined) {
                        if (sentences != null) {
                            sentences.forEach(function (s) {
                                var sentenceText = answer.Sentence;
                                if (s.Text == sentenceText) {
                                    answer.Sentence = new data_model_1.Sentence();
                                    answer.Sentence.Text = sentenceText;
                                    answer.Sentence.Id = s.Id;
                                }
                            });
                        }
                    }
                });
            });
        });
        return questionnaire;
    };
    QuestionnaireEditComponent.prototype.getNewSentences = function (questionnaire) {
        var newSentences = [];
        questionnaire.Sections.forEach(function (section) {
            section.Questions.forEach(function (question) {
                if (!question.Deleted && question.Sentence != null && question.Sentence.Id === undefined) {
                    var sentence = new data_model_1.Sentence();
                    // I know that if it's new it is a string
                    var temp = void 0;
                    temp = question.Sentence;
                    sentence.Text = temp;
                    sentence.Id = 0;
                    //--------------------------------
                    newSentences.push(sentence);
                }
                else if (question.Sentence != null && question.Sentence.Text === "") {
                    question.Sentence = null;
                }
                question.Answers.forEach(function (answer) {
                    if (!answer.Deleted && answer.Sentence != null && answer.Sentence.Id === undefined) {
                        var sentence = new data_model_1.Sentence();
                        // I know that if it's new it is a string
                        var temp = void 0;
                        temp = answer.Sentence;
                        sentence.Text = temp;
                        sentence.Id = 0;
                        //--------------------------------
                        newSentences.push(sentence);
                    }
                    else if (answer.Sentence.Text === "") {
                        answer.Sentence = null;
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
        sentence_service_1.SentenceService,
        router_1.ActivatedRoute,
        common_1.Location])
], QuestionnaireEditComponent);
exports.QuestionnaireEditComponent = QuestionnaireEditComponent;
//# sourceMappingURL=questionnaire-edit.component.js.map