import { Injectable, isDevMode } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model';
import { GeneralService } from './general.service';




@Injectable()
export class AuthenticationService extends GeneralService   {
    endpoint: string = "/auth2/token";
    private headers = new Headers({
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Audience':'Any', 
                                 });


    constructor (private http: Http) {
        super();
    }

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
        return new Promise<Boolean>((resolve) => {
            localStorage.setItem("isAdmin","false");
            localStorage.setItem("token","");
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
        .post(this.getBaseUrl()+this.endpoint, "username="+username+"&password="+password+"&grant_type=password", {headers: this.headers})
        .toPromise()
        .then(res =>  {
            localStorage.setItem("isAdmin","true");
            localStorage.setItem("token",res.json().access_token);
            return true
        })
        .catch(()=>{ 
            localStorage.setItem("isAdmin","false");
            localStorage.setItem("token","");
            return false;
        });
    }


}