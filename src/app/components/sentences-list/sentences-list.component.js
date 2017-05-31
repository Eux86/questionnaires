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
const sentence_service_1 = require("../../services/sentence.service");
let SentencesListComponent = class SentencesListComponent {
    constructor(sentenceService) {
        this.sentenceService = sentenceService;
        this.searchText = "";
    }
    ngOnInit() {
        this.getAllSentences();
    }
    getAllSentences() {
        this.sentenceService.getAll().then(sentences => {
            this.sentences = sentences;
        });
    }
    // selectionChange(sentence:Sentence):void{
    //     let found = false;
    //     let selected:Sentence[] = [];
    //     this.sentences.forEach(sentence => {
    //         let s:any = sentence;
    //         if (s.Selected == true){
    //             selected.push(sentence);
    //         }
    //     }); 
    //     selected.some((el)=>{
    //         found = el.Id == sentence.Id;
    //         return found;
    //     });
    //     if (found){
    //         let index =selected.indexOf(sentence, 0);
    //         if (index > -1) {
    //             selected.splice(index, 1);
    //         }
    //     } else {
    //         selected.push(sentence);
    //     }
    //     let sentences = "";
    //     selected.forEach(sentence => {
    //         sentences+=sentence.Text+"\n";
    //     });
    // }
    selectAll(value) {
        this.sentences.forEach(sentence => {
            let s = sentence;
            s.Selected = value;
        });
    }
    getSelected() {
        let selected = [];
        this.sentences.forEach(sentence => {
            let s = sentence;
            if (s.Selected == true) {
                selected.push(sentence);
            }
        });
        return selected;
    }
    deleteSelected() {
        this.sentenceService.delete(this.getSelected()).then(result => {
            this.getAllSentences();
        });
    }
    onChange(model) {
        if (model == "" || model == null) {
            this.getAllSentences();
        }
        else {
            this.sentenceService.getByText(model).then(sentences => {
                this.sentences = sentences;
            });
        }
    }
};
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