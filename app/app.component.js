"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Questionnaires';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        template: "\n        <nav class=\"navbar navbar-inverse navbar-fixed-top\">\n            <div class=\"container\">\n                <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <a class=\"navbar-brand\" href=\"#\">{{title}}</a>\n                </div>\n                <div id=\"navbar\" class=\"collapse navbar-collapse\">\n                <ul class=\"nav navbar-nav\">\n                    <li routerLinkActive=\"active\"><a routerLink=\"/list\" >Questionnaires List</a></li>\n                    <li routerLinkActive=\"active\"><a routerLink=\"/sentences\" >Sentences</a></li>\n                </ul>\n                </div><!--/.nav-collapse -->\n            </div>\n        </nav>\n        <div class=\"container\">\n\n            <router-outlet></router-outlet>\n\n        </div>\n       \n        \n    ",
        styleUrls: ['app.component.css'],
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map