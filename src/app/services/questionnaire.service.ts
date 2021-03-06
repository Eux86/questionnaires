import { Injectable, isDevMode, OnInit } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model'

import { environment } from '../../environments/environment';
import { GeneralService } from './general.service'
import { HttpOverride  } from 'HttpOverride'



@Injectable()
export class QuestionnaireService extends GeneralService {
    private questionnaireUrl = '/api/questionnaire';

    private headers = new Headers({'Content-Type': 'application/json',
                                    'Authorization': "Bearer "+localStorage.getItem("token")});
    
    constructor (private http: HttpOverride) {
        super();
    }

    getQuestionnaires(startIndex: Number, quantity: Number): Observable<Questionnaire[]>{
        return this.http.get(this.getBaseUrl()+this.questionnaireUrl+'/GetPaginated?startIndex='+startIndex+'&quantity='+quantity,{headers: this.headers})
                .map((res:Response)=>res.json());
    }

    getTotalNumber():Observable<number>{
        return this.http.get(this.getBaseUrl()+this.questionnaireUrl+'/GetCount',{headers: this.headers})
                .map((res:Response)=>res.json());
    }

    create(): Observable<Questionnaire> {
        let q = new Questionnaire();
        q.Date = new Date();

        return this.http
        .post(this.getBaseUrl()+this.questionnaireUrl+"/Create", JSON.stringify(q), {headers: this.headers})
        .map((res:Response)=>res.json());

        // .toPromise()
        // .then(res =>  {
        //     return res!=null?res.json():null
        // })
        // .catch(this.handleError);
    }

    // SHOULD CONVERT EVERYTHING TO OBSERVABLE ------------------------------------------- 
    
    
    // There should be 2 different method that return a questionnaire
    // and one of them should NOT return the IsCorrect field of the answers
    getQuestionnaire(id: Number): Observable<Questionnaire>{
        return this.http.get(this.getBaseUrl()+this.questionnaireUrl+'/Get/'+id,{headers: this.headers})
                .map((res:Response)=>res.json());
    }

    getQuestionnaireBySearchText(text:string):Promise<Questionnaire[]>{
        return this.http.get(this.getBaseUrl()+this.questionnaireUrl+'/GetBySearchText?searchText='+text,{headers: this.headers})
                .toPromise()
                .then(function(response) {
                    let ret = response.json() as Questionnaire[];
                    return ret;
                })
                .catch(this.handleError);
    }

    update(questionnaire: Questionnaire): Promise<Questionnaire> {
        return this.http
        .post(this.getBaseUrl()+this.questionnaireUrl+"/Create/"+questionnaire.Id, JSON.stringify(questionnaire), {headers: this.headers})
        .toPromise()
        .then(res =>  {
            return res.json()
        })
        .catch(this.handleError);
    }

    

    delete(id: number): Promise<void>{
        const url = `${this.getBaseUrl()+this.questionnaireUrl}/Delete/${id}`;
        return this.http
        .delete(url, { headers: this.headers })
        .toPromise().then( () => null)
        .catch(this.handleError);
    }

    deleteList(list: Questionnaire[]): Promise<void>{
        var ids: number[] = [];
        list.forEach(q => {
            ids.push(q.Id);
        });
        const url = `${this.getBaseUrl()+this.questionnaireUrl}/DeleteList`;
        return this.http
        .post(url, JSON.stringify(ids),
        {
            headers: this.headers,
        })
        .toPromise().then( () => null)
        .catch(this.handleError);
    }

    checkQuestionnaire(questionnaire: Questionnaire): Observable<Questionnaire>{
        return this.getQuestionnaire(questionnaire.Id);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}