import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import 'rxjs/add/operator/toPromise';

import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model'


@Injectable()
export class SentenceService{
    private prefix = 'http://localhost:3010/api/'; //app/
    private sentencesUrl =  this.prefix+'sentence';

    private headers = new Headers({'Content-Type': 'application/json'});
    
    constructor (private http: Http) {}


    create(sentence:Sentence): Promise<Sentence> {
        return this.http
        .post(this.sentencesUrl, JSON.stringify(sentence), {headers: this.headers})
        .toPromise()
        .then(res =>  {
            return res.json()
        })
        .catch(this.handleError);
    }

    createMany(sentences:Sentence[]): Promise<Sentence[]> {
        return this.http
        .post(this.sentencesUrl+"/CreateMany", JSON.stringify(sentences), {headers: this.headers})
        .toPromise()
        .then(res =>  {
            return res.json()
        })
        .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}