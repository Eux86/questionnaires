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
const questionnaire_service_1 = require("../../services/questionnaire.service");
const authentication_service_1 = require("../../services/authentication.service");
let QuestionnaireListComponent = class QuestionnaireListComponent {
    constructor(questionnaireService, router, authService) {
        this.questionnaireService = questionnaireService;
        this.router = router;
        this.authService = authService;
        this.selected = [];
        this.isDeleteEnabled = false;
        this.isEditEnabled = false;
        // Search
        this.searchQuery = "";
        this.isShowingSearchResult = false;
        // Paging
        this.currentIndex = 0;
        this.quantity = 10;
        this.totalNumber = 0;
        this.pages = [];
        this.isPreviousEnabled = false;
        this.isNextEnabled = true;
        this.isAdmin = true;
    }
    ngOnInit() {
        this.getList();
        this.isAdmin = this.authService.isAdmin();
    }
    getList() {
        this.questionnaireService.getQuestionnaires(this.currentIndex * this.quantity, this.quantity).then(questionnaires => {
            this.questionnaires = questionnaires;
        });
        this.getTotalNumber();
    }
    calculatePaging() {
        let numberOfPages = this.totalNumber / this.quantity;
        this.pages = [];
        for (let i = 0; i < numberOfPages; i++) {
            this.pages.push({ Text: (i + 1) + "", Index: i });
        }
    }
    gotoPage(index) {
        this.currentIndex = index;
        if (index < 1)
            this.isPreviousEnabled = false;
        else
            this.isPreviousEnabled = true;
        if (index > (this.totalNumber / this.quantity) - 1)
            this.isNextEnabled = false;
        else
            this.isNextEnabled = true;
        this.getList();
    }
    gotoPreviousPage() {
        if (this.currentIndex < 0)
            return;
        this.gotoPage(this.currentIndex - 1);
    }
    gotoNextPage() {
        if (this.currentIndex > this.totalNumber)
            return;
        this.gotoPage(this.currentIndex + 1);
    }
    confirmSearch() {
        this.questionnaireService.getQuestionnaireBySearchText(this.searchQuery).then(res => {
            this.questionnaires = res;
        });
        this.isShowingSearchResult = true;
    }
    onChangeSearchQuery() {
        if (this.searchQuery == "") {
            this.isShowingSearchResult = false;
        }
    }
    clearSearch() {
        this.searchQuery = "";
        this.isShowingSearchResult = false;
        this.getList();
    }
    getTotalNumber() {
        this.questionnaireService.getTotalNumber().then(total => {
            this.totalNumber = total;
            this.calculatePaging();
        });
    }
    createQuestionnaire() {
        this.questionnaireService.create().then(newQuest => {
            this.router.navigate(['/edit/', newQuest.Id]);
        });
    }
    confirmDelete() {
        this.questionnaireService.deleteList(this.selected).then(() => {
            this.getList();
            this.selected = [];
        });
    }
    editSelected() {
        this.router.navigate(['/edit', this.selected[0].Id]);
    }
    gotoView(questionnaire) {
        this.router.navigate(['/view', questionnaire.Id]);
    }
    onSelectionChange(questionnaire) {
        let q = questionnaire;
        if (!q.Selected) {
            this.selected.push(questionnaire);
        }
        else {
            let index = -1;
            for (let i = 0; i < this.selected.length; i++) {
                if (this.selected[i].Id == questionnaire.Id) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                this.selected.splice(index, 1);
            }
        }
        this.isEditEnabled = this.selected.length == 1;
        this.isDeleteEnabled = this.selected.length > 0;
    }
};
QuestionnaireListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'questionnaires-list',
        templateUrl: 'questionnaires-list.component.html',
        styleUrls: ['questionnaires-list.component.css'],
    }),
    __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService,
        router_1.Router,
        authentication_service_1.AuthenticationService])
], QuestionnaireListComponent);
exports.QuestionnaireListComponent = QuestionnaireListComponent;
class Page {
    constructor() {
        this.Text = "";
        this.Index = 0;
    }
}
exports.Page = Page;
//# sourceMappingURL=questionnaires-list.component.js.map