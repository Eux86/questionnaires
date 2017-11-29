import { Injectable } from '@angular/core';
import { GeneralService } from './general.service'
import { Language } from '../data-model';

import { Observable } from 'rxjs/Observable';
import { Headers, Response } from '@angular/http'
import { HttpOverride } from './../../HttpOverride';

@Injectable()
export class LanguagesService extends GeneralService {

  private endpoint:string = '/api/language';
  private headers = new Headers({'Content-Type': 'application/json',
                                    'Authorization': "Bearer "+localStorage.getItem("token")});


  private activeLanguage:Language;

  constructor (private http: HttpOverride) {
        super();
  }

  public getAll():Observable<Language[]>{
    return this.http.get(this.getBaseUrl() + this.endpoint + "/GetAll", { headers: this.headers })
          .map((res: Response) => res.json());
  }

  public Add(language:Language):Observable<Language>{
    return this.http.post(this.getBaseUrl() + this.endpoint + "/Add", JSON.stringify(language), { headers: this.headers })
          .map((res: Response) => res.json());
  }
  
  public Delete(language:Language):Observable<Language>{
    return this.http.post(this.getBaseUrl() + this.endpoint + "/Delete", JSON.stringify(language), { headers: this.headers })
          .map((res: Response) => res.json());
  }

  public SetActive(language:Language):Observable<Language>{
    return this.http.post(this.getBaseUrl() + this.endpoint + "/SetActive", JSON.stringify(language), { headers: this.headers })
          .map((res: Response) => res.json());
  }

  public getActiveObservable:Observable<any>;
  public GetActive():Observable<Language>{
    if (this.getActiveObservable) return this.getActiveObservable;
    this.getActiveObservable = new Observable(subscriber=>{
      if (this.activeLanguage==null){
        this.getAll().subscribe(
          languages=>{
            let active:Language;
            for (let i=0; i<languages.length;i++){
              if (languages[i].Active){
                active=languages[i];
                break;
              }
            }
            this.activeLanguage=active;
            subscriber.next(this.activeLanguage);
            subscriber.complete();
            this.getActiveObservable=null;
          },
          ()=>{},
          ()=>{}
        );
      } else {
        subscriber.next(this.activeLanguage);
        subscriber.complete();
        this.getActiveObservable=null;
      }
    }).share();
    return this.getActiveObservable;
  }

}
