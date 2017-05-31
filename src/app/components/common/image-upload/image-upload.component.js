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
const core_2 = require("@angular/core");
const file_upload_service_1 = require("../../../services/file-upload.service");
let ImageUploadComponent = class ImageUploadComponent {
    constructor(fileUploadService, router) {
        this.fileUploadService = fileUploadService;
        this.router = router;
        this.currentFile = null;
        this.currentFileName = "";
        this.uploadProgress = 0;
        this.fileChange = new core_1.EventEmitter();
        this.showUploadButton = true;
        this.onUploadStarted = new core_1.EventEmitter();
        this.onUploadCompleted = new core_1.EventEmitter();
        this.onUploadError = new core_1.EventEmitter();
    }
    get file() {
        return this.currentFile;
    }
    set file(val) {
        this.currentFile = val;
        this.fileChange.emit(this.currentFile);
    }
    ngOnInit() {
    }
    upload() {
        this.onUploadStarted.emit(this.file);
        this.uploadFile();
    }
    fileInputChange(fileInput) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();
            let self = this;
            reader.onload = function (e) {
                self.currentFileContent = e.target.result;
            };
            reader.readAsDataURL(fileInput.target.files[0]);
            this.file = fileInput.target.files[0];
            this.currentFileName = fileInput.target.files[0].name;
        }
    }
    uploadFile() {
        // this.fileUploadService.upload(this.imageToUpload);
        this.showUploadButton = false;
        this.uploadProgress = 0;
        this.fileUploadService.progress$.subscribe(data => {
            this.uploadProgress = data;
        });
        this.fileUploadService.makeFileRequest(this.currentFile)
            .then((uploadedFile) => {
            console.log("uploaded");
            this.onUploadCompleted.emit(uploadedFile);
            this.showUploadButton = true;
        }).catch((exception) => {
            console.log("error");
            this.onUploadError.emit(exception);
            this.showUploadButton = true;
        });
    }
    reset() {
        this.uploadProgress = 0;
        this.currentFile = null;
        this.currentFileContent = null;
        this.currentFileName = "";
    }
};
__decorate([
    core_2.ViewChild('fileInput'),
    __metadata("design:type", Object)
], ImageUploadComponent.prototype, "fileInputElement", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", File),
    __metadata("design:paramtypes", [Object])
], ImageUploadComponent.prototype, "file", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ImageUploadComponent.prototype, "fileChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ImageUploadComponent.prototype, "showUploadButton", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ImageUploadComponent.prototype, "onUploadStarted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ImageUploadComponent.prototype, "onUploadCompleted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ImageUploadComponent.prototype, "onUploadError", void 0);
ImageUploadComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'image-upload',
        templateUrl: 'image-upload.component.html',
        styleUrls: ['image-upload.component.css'],
    }),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService,
        router_1.Router])
], ImageUploadComponent);
exports.ImageUploadComponent = ImageUploadComponent;
//# sourceMappingURL=image-upload.component.js.map