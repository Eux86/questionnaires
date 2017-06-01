import { Injectable, isDevMode } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/Rx';



@Injectable()
export class AuthenticationService extends GeneralService   {
    private isAdminObserver: Subscriber<{}>;
    public isAdminObservable: Observable<boolean>;

    endpoint: string = "/auth2/token";
    private headers = new Headers({
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Audience':'Any', 
                                 });


    constructor (private http: Http) {
        super();

        this.isAdminObservable = new Observable(observer => {
            this.isAdminObserver = observer;
        }).share();
    }

    isAdmin(): Boolean{
        let isAdmin = localStorage.getItem("isAdmin");
        let expirationDate: Date = new Date(+localStorage.getItem("expirationDate"));
        return isAdmin == "true" && expirationDate>new Date();
    }

    logout(): Promise<Boolean>{
        return new Promise<Boolean>((resolve) => {
            localStorage.setItem("isAdmin","false");
            localStorage.setItem("token","");
            resolve(true);
            this.isAdminObserver.next(false);
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
            let secondsToExpire = res.json().expires_in;
            let expirationDate = new Date();
            expirationDate.setSeconds(expirationDate.getSeconds() + secondsToExpire);

            localStorage.setItem("isAdmin","true");
            localStorage.setItem("expirationDate",expirationDate.getTime()+"");
            localStorage.setItem("token",res.json().access_token);
            this.isAdminObserver.next(true);
            return true
        })
        .catch(()=>{ 
            localStorage.setItem("isAdmin","false");
            localStorage.setItem("token","");
            this.isAdminObserver.next(false);
            return false;
        });
    }


}