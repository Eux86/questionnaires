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
const data_model_1 = require("../../data-model");
const sentence_service_1 = require("../../services/sentence.service");
let SentenceEditComponent = class SentenceEditComponent {
    constructor(sentenceService, router) {
        this.sentenceService = sentenceService;
        this.router = router;
        this.sentenceValue = new data_model_1.Sentence();
        this.sentenceChange = new core_1.EventEmitter();
    }
    get sentence() {
        return this.sentenceValue;
    }
    set sentence(val) {
        this.sentenceValue = val;
        this.sentenceChange.emit(val);
    }
    ngOnInit() {
        this.sentenceService.getAll().then(sentences => {
            this.sentences = sentences;
        });
        // this.selected=this.sentence;
    }
    ngOnChanges(changes) {
        this.isNew = typeof this.sentenceValue === 'string';
    }
    goToSentenceManagement() {
        this.router.navigate(['/sentences']);
    }
    myListFormatter(data) {
        return data.Text;
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
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
    __metadata("design:paramtypes", [sentence_service_1.SentenceService,
        router_1.Router])
], SentenceEditComponent);
exports.SentenceEditComponent = SentenceEditComponent;
//# sourceMappingURL=sentence-edit.component.js.map