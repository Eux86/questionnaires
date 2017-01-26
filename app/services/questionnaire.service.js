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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var data_model_1 = require("../data-model");
var QuestionnaireService = (function () {
    function QuestionnaireService(http) {
        this.http = http;
        this.prefix = 'http://localhost:3010/api/'; //app/
        this.questionnaireUrl = this.prefix + 'questionnaire';
        this.sentencesUrl = this.prefix + 'sentence';
        // private prefix = 'http://localhost:53464/api/'; //app/
        // private questionnaireUrl = this.prefix+'questionnaires';
        // private sentencesUrl =  this.prefix+'sentences';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    QuestionnaireService.prototype.getQuestionnaires = function () {
        return this.http.get(this.questionnaireUrl)
            .toPromise()
            .then(function (response) {
            var ret = response.json();
            return ret;
        })
            .catch(this.handleError);
    };
    // There should be 2 different method that return a questionnaire
    // and one of them should NOT return the IsCorrect field of the answers
    QuestionnaireService.prototype.getQuestionnaire = function (id) {
        return this.getQuestionnaires().then(function (qs) {
            return qs.find(function (q) { return q.Id == id; });
        });
    };
    QuestionnaireService.prototype.getSentences = function () {
        return this.http.get(this.sentencesUrl)
            .toPromise()
            .then(function (response) {
            var ret = response.json();
            return ret;
        })
            .catch(this.handleError);
    };
    QuestionnaireService.prototype.update = function (questionnaire) {
        var url = this.questionnaireUrl + "/" + questionnaire.Id;
        return this.http
            .post(this.questionnaireUrl, JSON.stringify(questionnaire), { headers: this.headers })
            .toPromise()
            .then(function () { return questionnaire; })
            .catch(this.handleError);
    };
    QuestionnaireService.prototype.create = function () {
        return this.http
            .post(this.questionnaireUrl, JSON.stringify(new data_model_1.Questionnaire()), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    QuestionnaireService.prototype.delete = function (id) {
        var url = this.questionnaireUrl + "/" + id;
        return this.http
            .delete(url, {
            headers: this.headers,
        })
            .toPromise().then(function () { return null; })
            .catch(this.handleError);
    };
    QuestionnaireService.prototype.checkQuestionnaire = function (questionnaire) {
        return this.getQuestionnaire(questionnaire.Id).then(function (q) { return q; });
    };
    // getHero(id): Promise<Hero> {
    //     return this.getHeroes().then(heroes=>heroes.find(hero=> hero.Id == id));
    // }
    // update(hero: Hero): Promise<Hero>{
    //     const url = `${this.heroesUrl}/${hero.Id}`;
    //     return this.http
    //         .put(url, JSON.stringify(hero), {headers: this.headers})
    //         .toPromise()
    //         .then(() => hero) // sembra solo un placeholder che non fa nulla. Il catch va solo dopo il then
    //         .catch(this.handleError);
    // }
    // create(name: string): Promise<Hero> {
    //     return this.http
    //     .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    //     .toPromise()
    //     .then(res => res.json().data)
    //     .catch(this.handleError);
    // }
    // delete(id: number): Promise<void>{
    //     const url = `${this.heroesUrl}/${id}`;
    //     return this.http
    //     .delete(url, {headers: this.headers})
    //     .toPromise().then( () => null)
    //     .catch(this.handleError);
    // }
    QuestionnaireService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return QuestionnaireService;
}());
QuestionnaireService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], QuestionnaireService);
exports.QuestionnaireService = QuestionnaireService;
//# sourceMappingURL=questionnaire.service.js.map