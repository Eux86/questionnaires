import { Injectable } from '@angular/core';
import { GeneralService } from './general.service'
import { KeyValuePair } from '../data-model';

import { Observable } from 'rxjs/Observable';
import { Headers, Response } from '@angular/http'
import { HttpOverride } from './../../HttpOverride';


@Injectable()
export class TranslationService extends GeneralService {

  private endpoint:string = '/api/translations';
  private headers = new Headers({'Content-Type': 'application/json',
                                    'Authorization': "Bearer "+localStorage.getItem("token")});

  private translations: KeyValuePair[];

  constructor (private http: HttpOverride) {
        super();
  }

  public translate(sentenceKey:string):Observable<string>{
    return new Observable(subscriber=>{
      this.loadTranslations().subscribe(
        (translations:KeyValuePair[])=>{
          let sentenceValue:string;
          for (let i=0;i<translations.length;i++){
            let t: KeyValuePair = translations[i];
            if (t.Key==sentenceKey){
              sentenceValue = t.Value;
            }
          }

          // If a sentence key is missing, i'll add it locally so it's easier to track missing key in the admin panel 
          if (!sentenceValue){
            sentenceValue = "MISSING_KEY:"+sentenceKey;
            let newTranslation: any = new KeyValuePair(sentenceKey,sentenceValue);
            newTranslation.Added = true;
            translations.push(newTranslation);
          }
          subscriber.next(sentenceValue);
        }
      );
    })
    
  }

  public getAll():Observable<KeyValuePair[]>{
    return this.loadTranslations();
  }

  public delete(translations:KeyValuePair[]):Observable<KeyValuePair[]>{
    return this.http
        .post(this.getBaseUrl()+this.endpoint+"/DeleteList", JSON.stringify(translations), {headers: this.headers})
        .map((res:Response)=>res.json());
  }

  public update(translations:KeyValuePair[]):Observable<KeyValuePair[]>{
    return this.http
        .post(this.getBaseUrl()+this.endpoint+"/UpdateList", JSON.stringify(translations), {headers: this.headers})
        .map((res:Response)=>res.json());
  }

  public add(translations:KeyValuePair[]):Observable<KeyValuePair[]>{
    return this.http
        .post(this.getBaseUrl()+this.endpoint+"/AddList", JSON.stringify(translations), {headers: this.headers})
        .map((res:Response)=>res.json());
  }

  public crud(deleted:KeyValuePair[],changed:KeyValuePair[], added:KeyValuePair[]):Observable<KeyValuePair[]>{
    const del$ = this.delete(deleted);
    const upd$ = this.update(changed);
    const add$ = this.add(added);

    return Observable.concat(del$,upd$,add$);    
  }

  public reload():Observable<KeyValuePair[]>{
    this.translations = null;
    localStorage.removeItem("translations");
    localStorage.removeItem("translationsVersion");
    return this.loadTranslations();
  }



  private loadTranslations(): Observable<KeyValuePair[]> {
    return new Observable(subscriber => {
      if (!this.translations || this.translations==undefined) {
        // I never loaded translation in this session
        let localTranslations = localStorage.getItem("translations")
        // Translations exist in the local storage, i'll check if it is the latest version from the server
        this.http.get(this.getBaseUrl() + this.endpoint + "/GetVersion", { headers: this.headers })
          .map((res: Response) => res.json()).subscribe(
          v => {
            let lastUpdatedOnServer = new Date(v);
            let translationVersion: Date = new Date(localStorage.getItem("translationsVersion"));
            if (lastUpdatedOnServer.getTime() > translationVersion.getTime()) {
              // Local translations outdated, will load updated version from server
              this.loadTranslationsFromServer().subscribe(
                translations => {
                  localStorage.setItem("translations", JSON.stringify(translations));
                  localStorage.setItem("translationsVersion", lastUpdatedOnServer + "");
                  this.translations = translations;
                },
                () => {
                  alert("Couldn't load translations");
                },
                () => {
                  subscriber.next(this.translations);
                }
              );
            } else {
              // Local translations still valid
              let localTranslations = this.loadTranslationsFromLocalStorage();
              subscriber.next(localTranslations)
            }
          },
          (error) => { subscriber.error = error },
          () => { }
          );
      } else {
        // Already loaded the translations, will reuse the loaded ones
        subscriber.next(this.translations);
      }
    });
  }

  private loadTranslationsFromServer():Observable<KeyValuePair[]> {
    return this.http
        .get(this.getBaseUrl() + this.endpoint + "/GetAll", { headers: this.headers })
        .map((res: Response) => res.json());
  }

  private loadTranslationsFromLocalStorage():KeyValuePair[] {
    let localTranslations = localStorage.getItem("translations");
    this.translations = JSON.parse(localTranslations);
    return JSON.parse(localTranslations);
  }


}


