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
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
const data_model_1 = require("../data-model");
let QuestionnaireService = class QuestionnaireService {
    constructor(http) {
        this.http = http;
        this.prefix = 'http://localhost:3010/api/'; //app/
        this.questionnaireUrl = this.prefix + 'questionnaire';
        this.sentencesUrl = this.prefix + 'sentence';
        // private prefix = 'http://localhost:53464/api/'; //app/
        // private questionnaireUrl = this.prefix+'questionnaires';
        // private sentencesUrl =  this.prefix+'sentences';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token") });
    }
    getQuestionnaires(startIndex, quantity) {
        return this.http.get(this.questionnaireUrl + '/GetPaginated?startIndex=' + startIndex + '&quantity=' + quantity, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            let ret = response.json();
            return ret;
        })
            .catch(this.handleError);
    }
    getTotalNumber() {
        return this.http.get(this.questionnaireUrl + '/GetCount', { headers: this.headers })
            .toPromise()
            .then(function (response) {
            let ret = response.json();
            return ret;
        })
            .catch(this.handleError);
    }
    // There should be 2 different method that return a questionnaire
    // and one of them should NOT return the IsCorrect field of the answers
    getQuestionnaire(id) {
        return this.http.get(this.questionnaireUrl + '/Get/' + id, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            let ret = response.json();
            return ret;
        })
            .catch(this.handleError);
    }
    getQuestionnaireBySearchText(text) {
        return this.http.get(this.questionnaireUrl + '/GetBySearchText?searchText=' + text, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            let ret = response.json();
            return ret;
        })
            .catch(this.handleError);
    }
    update(questionnaire) {
        return this.http
            .post(this.questionnaireUrl + "/Create/" + questionnaire.Id, JSON.stringify(questionnaire), { headers: this.headers })
            .toPromise()
            .then(res => {
            return res.json();
        })
            .catch(this.handleError);
    }
    create() {
        let q = new data_model_1.Questionnaire();
        q.Date = new Date();
        return this.http
            .post(this.questionnaireUrl + "/Create", JSON.stringify(q), { headers: this.headers })
            .toPromise()
            .then(res => {
            return res.json();
        })
            .catch(this.handleError);
    }
    delete(id) {
        const url = `${this.questionnaireUrl}/Delete/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .toPromise().then(() => null)
            .catch(this.handleError);
    }
    deleteList(list) {
        var ids = [];
        list.forEach(q => {
            ids.push(q.Id);
        });
        const url = `${this.questionnaireUrl}/DeleteList`;
        return this.http
            .post(url, JSON.stringify(ids), {
            headers: this.headers,
        })
            .toPromise().then(() => null)
            .catch(this.handleError);
    }
    checkQuestionnaire(questionnaire) {
        return this.getQuestionnaire(questionnaire.Id).then(q => { return q; });
    }
    handleError(error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
};
QuestionnaireService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], QuestionnaireService);
exports.QuestionnaireService = QuestionnaireService;
//# sourceMappingURL=questionnaire.service.js.map