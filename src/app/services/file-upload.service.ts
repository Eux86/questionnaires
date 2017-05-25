import { Injectable, isDevMode, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Http, Headers,RequestOptions } from '@angular/http'

import { environment } from '../../environments/environment';
import { GeneralService } from './general.service';

import 'rxjs/add/operator/toPromise';

//import { Question,Questionnaire,Answer,Section,Sentence } from '../data-model'


@Injectable()
export class FileUploadService extends GeneralService {
    endpoint: string = "/api/file/Upload";
    private headers = new Headers({
                                    'Content-Type': 'multipart/form-data',
                                    'Accept': 'application/json', 
                                    // 'Authorization': "Bearer "+localStorage.getItem("token"),
                                 });

    public progress$: Observable<any>;
    private progress: number =0;
    private progressObserver: any;

    constructor(private http: Http) {
        super();
        this.progress$ = new Observable(observer => {
            this.progressObserver = observer
        });
    }                             

    public getObserver (): Observable<number> {
        return this.progress$;
    }

    // http://stackoverflow.com/questions/39131790/file-upload-using-angularjs-2-and-asp-net-mvc-web-api
    makeFileRequest(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData();
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("uploads[]", file, file.name);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                console.log("Progress: "+event.loaded + "/" +event.total );
                if (this.progressObserver!=null)
                    this.progressObserver.next(this.progress);
            };
            
            setInterval(() => { }, 500); // magic hack to see updates on the subscriver's view

            xhr.open('POST', this.getBaseUrl()+this.endpoint, true);
            var serverFileName = xhr.send(formData);
            return serverFileName;
        });
    }

    getImageUrl(id):string{
        return this.getBaseUrl()+"/api/file/Get/"+id;
    }

}