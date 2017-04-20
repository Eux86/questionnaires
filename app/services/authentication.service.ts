import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import 'rxjs/add/operator/toPromise';

import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model'


@Injectable()
export class AuthenticationService{

    loginUrl: string = "http://localhost:3010/auth2/token";
    private headers = new Headers({'Content-Type': 'application/json','Audience':'Any'});


    constructor (private http: Http) {}

    isAdmin(): Boolean{
        var isAdmin = localStorage.getItem("isAdmin");
        return isAdmin == "true";
    }

    loginFake(username: string,password: string): Promise<Boolean>{
        // FAKE LOGIN
        return new Promise((resolve, reject) => {
            localStorage.setItem("isAdmin","true");
            resolve(true);
        });
    }

    logout(): Promise<Boolean>{
        // FAKE LOGOUT
        return new Promise<Boolean>((resolve) => {
            localStorage.setItem("isAdmin","false");
            resolve(true);
        });
    }

    login(username: string,password: string): Promise<Boolean>{
        let body = JSON.stringify({
            username: username,
            password: password,
            grant_type: "password"
        });
        return this.http
        .post(this.loginUrl+'?username='+username+'&password='+password+'&grant_type=password', JSON.stringify(body), {headers: this.headers})
        .toPromise()
        .then(res =>  {
            return true
        })
        .catch(()=>{ 
            return false;
        });
    }


}