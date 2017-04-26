import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import 'rxjs/add/operator/toPromise';

import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model'


@Injectable()
export class QuestionnaireService{
    private prefix = 'http://localhost:3010/api/'; //app/
    private questionnaireUrl = this.prefix+'questionnaire';
    private sentencesUrl =  this.prefix+'sentence';

    // private prefix = 'http://localhost:53464/api/'; //app/
    // private questionnaireUrl = this.prefix+'questionnaires';
    // private sentencesUrl =  this.prefix+'sentences';

    private headers = new Headers({'Content-Type': 'application/json',
                                    'Authorization': "Bearer "+localStorage.getItem("token")});
    
    constructor (private http: Http) {}

    getQuestionnaires(startIndex: Number, quantity: Number): Promise<Questionnaire[]>{
        return this.http.get(this.questionnaireUrl+'/GetPaginated?startIndex='+startIndex+'&quantity='+quantity,{headers: this.headers})
                .toPromise()
                .then(function(response) {
                    let ret = response.json() as Questionnaire[];
                    return ret;
                })
                .catch(this.handleError);
    }

    getTotalNumber():Promise<number>{
        return this.http.get(this.questionnaireUrl+'/GetCount',{headers: this.headers})
                .toPromise()
                .then(function(response) {
                    let ret = response.json() as number;
                    return ret;
                })
                .catch(this.handleError);
    }
    
    // There should be 2 different method that return a questionnaire
    // and one of them should NOT return the IsCorrect field of the answers
    getQuestionnaire(id: Number): Promise<Questionnaire>{
        return this.http.get(this.questionnaireUrl+'/Get/'+id,{headers: this.headers})
                .toPromise()
                .then(function(response) {
                    let ret = response.json() as Questionnaire;
                    return ret;
                })
                .catch(this.handleError);
    }

    getQuestionnaireBySearchText(text:string):Promise<Questionnaire[]>{
        return this.http.get(this.questionnaireUrl+'/GetBySearchText?searchText='+text,{headers: this.headers})
                .toPromise()
                .then(function(response) {
                    let ret = response.json() as Questionnaire[];
                    return ret;
                })
                .catch(this.handleError);
    }

    update(questionnaire: Questionnaire): Promise<Questionnaire> {
        return this.http
        .post(this.questionnaireUrl+"/Create/"+questionnaire.Id, JSON.stringify(questionnaire), {headers: this.headers})
        .toPromise()
        .then(res =>  {
            return res.json()
        })
        .catch(this.handleError);
    }

    create(): Promise<Questionnaire> {
        let q = new Questionnaire();
        q.Date = new Date();

        return this.http
        .post(this.questionnaireUrl+"/Create", JSON.stringify(q), {headers: this.headers})
        .toPromise()
        .then(res =>  {
            return res.json()
        })
        .catch(this.handleError);
    }

    delete(id: number): Promise<void>{
        const url = `${this.questionnaireUrl}/Delete/${id}`;
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
        const url = `${this.questionnaireUrl}/DeleteList`;
        return this.http
        .post(url, JSON.stringify(ids),
        {
            headers: this.headers,
        })
        .toPromise().then( () => null)
        .catch(this.handleError);
    }

    checkQuestionnaire(questionnaire: Questionnaire): Promise<Questionnaire>{
        return this.getQuestionnaire(questionnaire.Id).then(q=> { return q });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}