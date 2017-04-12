import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import 'rxjs/add/operator/toPromise';

import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model'


@Injectable()
export class AuthenticationService{
    isAdmin(): Boolean{
        var isAdmin = localStorage.getItem("isAdmin");
        return isAdmin == "true";
    }

    login(username: string,password: string): Promise<Boolean>{
        // FAKE LOGIN
        return new Promise(() => {
            localStorage.setItem("isAdmin","true");
            true;
        });
    }

    logout(username: string,password: string): Promise<Boolean>{
        // FAKE LOGOUT
        return new Promise(() => {
            localStorage.setItem("isAdmin","false");
            true;
        });
    }

}