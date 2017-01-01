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
var SentenceEditComponent = (function () {
    function SentenceEditComponent(questionnaireService, router) {
        this.questionnaireService = questionnaireService;
        this.router = router;
        this.sentenceValue = new data_model_1.Sentence();
        this.sentenceChange = new core_1.EventEmitter();
    }
    Object.defineProperty(SentenceEditComponent.prototype, "sentence", {
        get: function () {
            return this.sentenceValue;
        },
        set: function (val) {
            this.sentenceValue = val;
            this.sentenceChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    SentenceEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.questionnaireService.getSentences().then(function (sentences) {
            _this.sentences = sentences;
        });
        // this.selected=this.sentence;
    };
    SentenceEditComponent.prototype.goToSentenceManagement = function () {
        this.router.navigate(['/sentences']);
    };
    return SentenceEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SentenceEditComponent.prototype, "sentence", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SentenceEditComponent.prototype, "sentenceChange", void 0);
SentenceEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sentence-edit',
        templateUrl: 'sentence-edit.component.html',
        styleUrls: ['sentence-edit.component.css'],
    }),
    __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService,
        router_1.Router])
], SentenceEditComponent);
exports.SentenceEditComponent = SentenceEditComponent;
//# sourceMappingURL=sentence-edit.component.js.map