import { Injectable, isDevMode, OnInit } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model'

import { environment } from '../../environments/environment';


@Injectable()
export class SentenceService implements OnInit {
    baseUrl: string = "http://localhost:3010";
    private sentencesUrl =  '/api/sentence';

    private headers = new Headers({'Content-Type': 'application/json'});
    
    constructor (private http: Http) {}

    ngOnInit(): void {
        if (environment.production) {
            this.baseUrl = "http://icaroexames.ddns.net";
        }
    }


    create(sentence:Sentence): Promise<Sentence> {
        return this.http
        .post(this.baseUrl+this.sentencesUrl, JSON.stringify(sentence), {headers: this.headers})
        .toPromise()
        .then(res =>  {
            return res.json()
        })
        .catch(this.handleError);
    }

    createMany(sentences:Sentence[]): Promise<Sentence[]> {
        return this.http
        .post(this.baseUrl+this.sentencesUrl+"/CreateMany", JSON.stringify(sentences), {headers: this.headers})
        .toPromise()
        .then(res =>  {
            return res.json()
        })
        .catch(this.handleError);
    }

    getByText(text:string):Promise<Sentence[]> {
        return this.http
        .get(this.baseUrl+this.sentencesUrl+"/GetByText?text="+text, {headers: this.headers})
        .toPromise()
        .then(res =>  {
            return res.json()
        })
        .catch(this.handleError);
    }

    getAll(): Promise<Sentence[]>{
        return this.http.get(this.baseUrl+this.sentencesUrl+"/GetAll")
                    .toPromise()
                    .then(function(response) {
                        let ret = response.json() as Sentence[];
                        return ret;
                    })
                    .catch(this.handleError);
    }

    delete(sentences: Sentence[]):Promise<boolean>{
        return this.http
                .post(this.baseUrl+this.sentencesUrl+"/Delete",JSON.stringify(sentences), {headers: this.headers})
                .toPromise()
                .then(res=>{
                    return res.json();
                })
                .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}