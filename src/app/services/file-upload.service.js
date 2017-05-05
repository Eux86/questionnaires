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
const Observable_1 = require("rxjs/Observable");
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
//import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model'
let FileUploadService = class FileUploadService {
    constructor(http) {
        this.http = http;
        this.endpoint = "http://localhost:3010/api/file/Upload";
        this.headers = new http_1.Headers({
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        });
        this.progress = 0;
        this.progress$ = new Observable_1.Observable(observer => {
            this.progressObserver = observer;
        }).share();
    }
    getObserver() {
        return this.progress$;
    }
    // http://stackoverflow.com/questions/39131790/file-upload-using-angularjs-2-and-asp-net-mvc-web-api
    makeFileRequest(file) {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
            formData.append("uploads[]", file, file.name);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                console.log("Progress: " + event.loaded + "/" + event.total);
                if (this.progressObserver != null)
                    this.progressObserver.next(this.progress);
            };
            setInterval(() => { }, 500); // magic hack to see updates on the subscriver's view
            xhr.open('POST', this.endpoint, true);
            var serverFileName = xhr.send(formData);
            return serverFileName;
        });
    }
    getImageUrl(id) {
        return "http://localhost:3010/api/file/Get/" + id;
    }
};
FileUploadService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload.service.js.map