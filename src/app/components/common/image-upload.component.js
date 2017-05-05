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
let ImageUploadComponent = class ImageUploadComponent {
    constructor(fileUploadService, router) {
        this.fileUploadService = fileUploadService;
        this.router = router;
        this.sentenceValue = new data_model_1.Sentence();
        this.currentFile = null;
        this.fileChange = new core_1.EventEmitter();
    }
    get file() {
        return this.currentFile;
    }
    set file(val) {
        this.currentFile = val;
        this.fileChange.emit(val);
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        this.isNew = typeof this.sentenceValue === 'string';
    }
    upload() {
        this.router.navigate(['/sentences']);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ImageUploadComponent.prototype, "file", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ImageUploadComponent.prototype, "fileChange", void 0);
ImageUploadComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'image-upload',
        templateUrl: 'image-upload.component.html',
        styleUrls: ['image-upload.component.css'],
    }),
    __metadata("design:paramtypes", [Object, router_1.Router])
], ImageUploadComponent);
exports.ImageUploadComponent = ImageUploadComponent;
//# sourceMappingURL=image-upload.component.js.map