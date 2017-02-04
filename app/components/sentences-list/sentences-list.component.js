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
var data_model_1 = require("../../data-model");
var sentence_service_1 = require("../../services/sentence.service");
var SentencesListComponent = (function () {
    function SentencesListComponent(sentenceService) {
        this.sentenceService = sentenceService;
        this.selected = new data_model_1.Sentence();
        this.searchText = "";
    }
    SentencesListComponent.prototype.ngOnInit = function () {
        this.getAllSentences();
    };
    SentencesListComponent.prototype.getAllSentences = function () {
        var _this = this;
        this.sentenceService.getAll().then(function (sentences) {
            _this.sentences = sentences;
        });
    };
    SentencesListComponent.prototype.onChange = function (model) {
        var _this = this;
        if (model == "" || model == null) {
            this.getAllSentences();
        }
        else {
            this.sentenceService.getByText(model).then(function (sentences) {
                _this.sentences = sentences;
            });
        }
    };
    return SentencesListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SentencesListComponent.prototype, "sentences", void 0);
SentencesListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sentences-list',
        templateUrl: 'sentences-list.component.html',
        styleUrls: ['sentences-list.component.css'],
    }),
    __metadata("design:paramtypes", [sentence_service_1.SentenceService])
], SentencesListComponent);
exports.SentencesListComponent = SentencesListComponent;
//# sourceMappingURL=sentences-list.component.js.map