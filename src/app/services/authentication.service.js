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
let AuthenticationService = class AuthenticationService {
    constructor(http) {
        this.http = http;
        this.loginUrl = "http://localhost:3010/auth2/token";
        this.headers = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Audience': 'Any',
        });
    }
    isAdmin() {
        var isAdmin = localStorage.getItem("isAdmin");
        return isAdmin == "true";
    }
    loginFake(username, password) {
        // FAKE LOGIN
        return new Promise((resolve, reject) => {
            localStorage.setItem("isAdmin", "true");
            resolve(true);
        });
    }
    logout() {
        return new Promise((resolve) => {
            localStorage.setItem("isAdmin", "false");
            localStorage.setItem("token", "");
            resolve(true);
        });
    }
    login(username, password) {
        let body = JSON.stringify({
            username: username,
            password: password,
            grant_type: "password"
        });
        return this.http
            .post(this.loginUrl, "username=" + username + "&password=" + password + "&grant_type=password", { headers: this.headers })
            .toPromise()
            .then(res => {
            localStorage.setItem("isAdmin", "true");
            localStorage.setItem("token", res.json().access_token);
            return true;
        })
            .catch(() => {
            localStorage.setItem("isAdmin", "false");
            localStorage.setItem("token", "");
            return false;
        });
    }
};
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map