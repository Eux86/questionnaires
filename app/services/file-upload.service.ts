import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Http, Headers,RequestOptions } from '@angular/http'

import 'rxjs/add/operator/toPromise';

//import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model'


@Injectable()
export class FileUploadService{

    endpoint: string = "http://localhost:3010/api/file/Upload";
    private headers = new Headers({
                                    'Content-Type': 'multipart/form-data',
                                    'Accept': 'application/json', 
                                    // 'Authorization': "Bearer "+localStorage.getItem("token"),
                                 });


    progress$: any;
    progress: any;
    progressObserver: any;
    constructor(private http: Http) {
        this.progress$ = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }                             

    upload(file: File):void{
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = this.headers;
        let options = new RequestOptions({ headers: this.headers });
        this.http.post(`${this.endpoint}`, formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data => alert('success'),
                error =>alert('failed\n'+error)
            );
    }




    // http://stackoverflow.com/questions/39131790/file-upload-using-angularjs-2-and-asp-net-mvc-web-api


    makeFileRequest(file: File): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData();
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("uploads[]", file, file.name);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);

                this.progressObserver.next(this.progress);
            };

            xhr.open('POST', this.endpoint, true);
            var serverFileName = xhr.send(formData);
            return serverFileName;
        });
    }

}