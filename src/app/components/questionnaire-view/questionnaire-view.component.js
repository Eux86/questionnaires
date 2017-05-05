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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const data_model_1 = require("../../data-model");
const questionnaire_service_1 = require("../../services/questionnaire.service");
const file_upload_service_1 = require("../../services/file-upload.service");
let QuestionnaireViewComponent = class QuestionnaireViewComponent {
    constructor(questionnaireService, route, location, fileUploadService) {
        this.questionnaireService = questionnaireService;
        this.route = route;
        this.location = location;
        this.fileUploadService = fileUploadService;
        this.questionnaire = new data_model_1.Questionnaire();
        this.isShowingResults = false;
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = params['id'];
                //TODO: check if ID is numeric
                this.questionnaireService.getQuestionnaire(+id).then(q => this.questionnaire = q);
                //this.questionnaireService.getQuestionnaire(+id).then(q=>console.log(JSON.stringify(q)));
            }
        });
    }
    checkAnswers(questionnaire) {
        this.questionnaireService.checkQuestionnaire(questionnaire).then(correct => {
            questionnaire.Sections.forEach((section, sectionIndex) => {
                section.Questions.forEach((question, questionIndex) => {
                    question.IsCorrect = false;
                    question.Answers.forEach((answer, answerIndex) => {
                        answer.IsCorrect = correct.Sections[sectionIndex]
                            .Questions[questionIndex]
                            .Answers[answerIndex].IsCorrect;
                        if (answer.IsCorrect && answer.Selected) {
                            question.IsCorrect = true;
                        }
                    });
                });
            });
            this.calculateReport();
        });
        this.isShowingResults = true;
    }
    calculateReport() {
        var totalQuesitons = 0;
        var totalCorrectQuestions = 0;
        this.questionnaire.Sections.forEach((section, sectionIndex) => {
            var correctQuestions = 0;
            section.Questions.forEach((question, questionIndex) => {
                if (question.IsCorrect) {
                    correctQuestions += 1;
                    totalCorrectQuestions += 1;
                }
                totalQuesitons += 1;
            });
            section.Score = correctQuestions / section.Questions.length * 100;
        });
        this.questionnaire.Score = totalCorrectQuestions / totalQuesitons * 100;
    }
    isRighAnswer(answer) {
        return answer.IsCorrect && this.isShowingResults;
    }
    isWrongAnswer(answer) {
        return answer.Selected && !answer.IsCorrect && this.isShowingResults;
    }
};
QuestionnaireViewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'questionnaire-view',
        templateUrl: 'questionnaire-view.component.html',
        styleUrls: ['questionnaire-view.component.css'],
    }),
    __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService,
        router_1.ActivatedRoute,
        common_1.Location,
        file_upload_service_1.FileUploadService])
], QuestionnaireViewComponent);
exports.QuestionnaireViewComponent = QuestionnaireViewComponent;
class SectionScore {
}
exports.SectionScore = SectionScore;
//# sourceMappingURL=questionnaire-view.component.js.map