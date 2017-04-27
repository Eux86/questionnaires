import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Http, Headers,RequestOptions } from '@angular/http'

import 'rxjs/add/operator/toPromise';

//import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model'


@Injectable()
export class FileUploadService{

    endpoint: string = "http://localhost:3010/api/file";
    private headers = new Headers({
                                    'Content-Type': 'multipart/form-data',
                                    'Accept': 'application/json', 
                                 });


    constructor (private http: Http) {}

    upload(file: File):void{
    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    let headers = new Headers();
    let options = new RequestOptions({ headers: this.headers });
    this.http.post(`${this.endpoint}`, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
            data => console.log('success'),
            error => console.log(error)
        )
  }

}