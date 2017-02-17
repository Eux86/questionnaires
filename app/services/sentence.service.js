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
var SentenceService = (function () {
    function SentenceService(http) {
        this.http = http;
        this.prefix = 'http://localhost:3010/api/'; //app/
        this.sentencesUrl = this.prefix + 'sentence';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    SentenceService.prototype.create = function (sentence) {
        return this.http
            .post(this.sentencesUrl, JSON.stringify(sentence), { headers: this.headers })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    SentenceService.prototype.createMany = function (sentences) {
        return this.http
            .post(this.sentencesUrl + "/CreateMany", JSON.stringify(sentences), { headers: this.headers })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    SentenceService.prototype.getByText = function (text) {
        return this.http
            .get(this.sentencesUrl + "/GetByText?text=" + text, { headers: this.headers })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    SentenceService.prototype.getAll = function () {
        return this.http.get(this.sentencesUrl + "/GetAll")
            .toPromise()
            .then(function (response) {
            var ret = response.json();
            return ret;
        })
            .catch(this.handleError);
    };
    SentenceService.prototype.delete = function (sentences) {
        return this.http
            .post(this.sentencesUrl + "/Delete", JSON.stringify(sentences), { headers: this.headers })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    SentenceService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return SentenceService;
}());
SentenceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SentenceService);
exports.SentenceService = SentenceService;
//# sourceMappingURL=sentence.service.js.map