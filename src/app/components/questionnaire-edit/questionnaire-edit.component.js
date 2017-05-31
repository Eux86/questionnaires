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
const image_upload_component_1 = require("../common/image-upload/image-upload.component");
const questionnaire_service_1 = require("../../services/questionnaire.service");
const sentence_service_1 = require("../../services/sentence.service");
const file_upload_service_1 = require("../../services/file-upload.service");
const ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
let QuestionnaireEditComponent = class QuestionnaireEditComponent {
    constructor(questionnaireService, sentenceService, fileUploadService, route, location) {
        this.questionnaireService = questionnaireService;
        this.sentenceService = sentenceService;
        this.fileUploadService = fileUploadService;
        this.route = route;
        this.location = location;
        this.questionnaire = new data_model_1.Questionnaire();
        this.infoModalMessage = "";
        // Upload modal
        this.imageUploaded = false;
        this.uploadingImage = false;
        this.imageToUpload = null;
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
    addSection(questionnaire) {
        if (questionnaire.Sections == null)
            questionnaire.Sections = [];
        questionnaire.Sections.push(new data_model_1.Section());
    }
    addQuestion(section) {
        if (section.Questions == null)
            section.Questions = [];
        section.Questions.push(new data_model_1.Question());
    }
    addAnswer(question) {
        if (question.Answers == null)
            question.Answers = [];
        question.Answers.push(new data_model_1.Answer());
    }
    delete(deletable) {
        deletable.Deleted = true;
    }
    // DO NOT USE! USE DELETE
    remove(array, index) {
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    update() {
        this.newSentences = this.getNewSentences(this.questionnaire);
        this.modalNewSentences.open();
        // if (this.confirmNewSentencesCreation(newSentences)){
        //   this.questionnaireService.update(this.questionnaire).then(q=>{
        //     this.questionnaire = q;
        //     this.onUpdate(q);
        //   });
        // }
    }
    updateConfirm() {
        this.sentenceService.createMany(this.newSentences).then(sentences => {
            this.questionnaire = this.updateSentenceId(this.questionnaire, sentences);
            return this.questionnaireService.update(this.questionnaire).then(q => {
                this.questionnaire = q;
                this.modalSaved.open();
            });
        });
    }
    updateSentenceId(questionnaire, sentences) {
        questionnaire.Sections.forEach(section => {
            if (section.Questions != null) {
                section.Questions.forEach(question => {
                    if (question.Sentence != null && question.Sentence.Id === undefined) {
                        if (sentences != null) {
                            sentences.forEach(s => {
                                let sentenceText = question.Sentence;
                                if (s.Text == sentenceText) {
                                    question.Sentence = new data_model_1.Sentence();
                                    question.Sentence.Text = sentenceText;
                                    question.Sentence.Id = s.Id;
                                }
                            });
                        }
                    }
                    if (question.Answers != null) {
                        question.Answers.forEach(answer => {
                            if (answer.Sentence != null && answer.Sentence.Id === undefined) {
                                if (sentences != null) {
                                    sentences.forEach(s => {
                                        let sentenceText = answer.Sentence;
                                        if (s.Text == sentenceText) {
                                            answer.Sentence = new data_model_1.Sentence();
                                            answer.Sentence.Text = sentenceText;
                                            answer.Sentence.Id = s.Id;
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
        return questionnaire;
    }
    getNewSentences(questionnaire) {
        let newSentences = [];
        questionnaire.Sections.forEach(section => {
            if (section.Questions != null) {
                section.Questions.forEach(question => {
                    if (!question.Deleted && question.Sentence != null && question.Sentence.Id === undefined) {
                        let sentence = new data_model_1.Sentence();
                        // I know that if it's new it is a string
                        let temp;
                        temp = question.Sentence;
                        sentence.Text = temp;
                        sentence.Id = 0;
                        //--------------------------------
                        newSentences.push(sentence);
                    }
                    else if (question.Sentence != null && question.Sentence.Text === "") {
                        question.Sentence = null;
                    }
                    if (question.Answers != null) {
                        question.Answers.forEach(answer => {
                            if (!answer.Deleted && answer.Sentence != null && answer.Sentence.Id === undefined) {
                                let sentence = new data_model_1.Sentence();
                                // I know that if it's new it is a string
                                let temp;
                                temp = answer.Sentence;
                                sentence.Text = temp;
                                sentence.Id = 0;
                                //--------------------------------
                                newSentences.push(sentence);
                            }
                            else if (answer.Sentence != null && answer.Sentence.Text === "") {
                                answer.Sentence = null;
                            }
                        });
                    }
                });
            }
        });
        return newSentences;
    }
    //############  Upload stuffs
    uploadImageForQuestion(question) {
        this.uploadImageComponent.reset();
        this.modalFileUpload.open();
        this.questionToAssociateImage = question;
        this.imageToUpload = null;
    }
    uploadFinished(success, argument) {
        if (success) {
            let file = argument;
            this.questionToAssociateImage.FileId = file.Id;
            this.modalFileUpload.dismiss();
            this.imageUploaded = true;
        }
        else {
            this.infoModalMessage = "Couldn't upload the file\n" + argument;
            this.infoModal.open();
            this.imageUploaded = false;
        }
        this.uploadingImage = false;
    }
    uploadStarted() {
        this.imageUploaded = false;
        this.uploadingImage = true;
    }
};
__decorate([
    core_1.ViewChild('modalSaved'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], QuestionnaireEditComponent.prototype, "modalSaved", void 0);
__decorate([
    core_1.ViewChild('modalNewSentences'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], QuestionnaireEditComponent.prototype, "modalNewSentences", void 0);
__decorate([
    core_1.ViewChild('modalFileUpload'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], QuestionnaireEditComponent.prototype, "modalFileUpload", void 0);
__decorate([
    core_1.ViewChild('infoModal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], QuestionnaireEditComponent.prototype, "infoModal", void 0);
__decorate([
    core_1.ViewChild('uploadImageComponent'),
    __metadata("design:type", image_upload_component_1.ImageUploadComponent)
], QuestionnaireEditComponent.prototype, "uploadImageComponent", void 0);
QuestionnaireEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'questionnaire-edit',
        templateUrl: 'questionnaire-edit.component.html',
        styleUrls: ['questionnaire-edit.component.css'],
    }),
    __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService,
        sentence_service_1.SentenceService,
        file_upload_service_1.FileUploadService,
        router_1.ActivatedRoute,
        common_1.Location])
], QuestionnaireEditComponent);
exports.QuestionnaireEditComponent = QuestionnaireEditComponent;
//# sourceMappingURL=questionnaire-edit.component.js.map