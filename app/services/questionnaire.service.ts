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

    private headers = new Headers({'Content-Type': 'application/json'});
    
    constructor (private http: Http) {}

    getQuestionnaires(): Promise<Questionnaire[]>{
        return this.http.get(this.questionnaireUrl)
                .toPromise()
                .then(function(response) {
                    let ret = response.json() as Questionnaire[];
                    return ret;
                })
                .catch(this.handleError);
    }
    
    // There should be 2 different method that return a questionnaire
    // and one of them should NOT return the IsCorrect field of the answers
    getQuestionnaire(id: Number): Promise<Questionnaire>{
        return this.getQuestionnaires().then(qs=>
            qs.find(q=> q.Id == id)
        );
    }

    getSentences(): Promise<Sentence[]>{
        return this.http.get(this.sentencesUrl)
                    .toPromise()
                    .then(response=>response.json().data as Sentence[])
                    .catch(this.handleError);
    }

    update(questionnaire: Questionnaire): Promise<Questionnaire> {
        const url = `${this.questionnaireUrl}/${questionnaire.Id}`;
        return this.http
        .post(this.questionnaireUrl, JSON.stringify(questionnaire), {headers: this.headers})
        .toPromise()
        .then(() => questionnaire)
        .catch(this.handleError);
    }

    create(): Promise<Questionnaire> {
        return this.http
        .post(this.questionnaireUrl, JSON.stringify(new Questionnaire()), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    delete(id: number): Promise<void>{
        const url = `${this.questionnaireUrl}/${id}`;
        return this.http
        .delete(url, {headers: this.headers})
        .toPromise().then( () => null)
        .catch(this.handleError);
    }

    checkQuestionnaire(questionnaire: Questionnaire): Promise<Questionnaire>{
        return this.getQuestionnaire(questionnaire.Id).then(q=>q);
    }

    // getHero(id): Promise<Hero> {
    //     return this.getHeroes().then(heroes=>heroes.find(hero=> hero.Id == id));
    // }
    // update(hero: Hero): Promise<Hero>{
    //     const url = `${this.heroesUrl}/${hero.Id}`;
    //     return this.http
    //         .put(url, JSON.stringify(hero), {headers: this.headers})
    //         .toPromise()
    //         .then(() => hero) // sembra solo un placeholder che non fa nulla. Il catch va solo dopo il then
    //         .catch(this.handleError);
    // }
    // create(name: string): Promise<Hero> {
    //     return this.http
    //     .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    //     .toPromise()
    //     .then(res => res.json().data)
    //     .catch(this.handleError);
    // }
    // delete(id: number): Promise<void>{
    //     const url = `${this.heroesUrl}/${id}`;
    //     return this.http
    //     .delete(url, {headers: this.headers})
    //     .toPromise().then( () => null)
    //     .catch(this.handleError);
    // }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}