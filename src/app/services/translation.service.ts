import { Injectable } from '@angular/core';
import { GeneralService } from './general.service'
import { Translation,Language } from '../data-model';

import { Observable } from 'rxjs/Observable';
import { Headers, Response } from '@angular/http'
import { HttpOverride } from './../../HttpOverride';

import { LanguagesService } from './languages.service'


@Injectable()
export class TranslationService extends GeneralService {

  private endpoint:string = '/api/translations';
  private headers = new Headers({'Content-Type': 'application/json',
                                    'Authorization': "Bearer "+localStorage.getItem("token")});

  public translations: Translation[];
  public missing: Translation[] = [];

  constructor (private http: HttpOverride,private languagesService:LanguagesService) {
        super();
  }

  public translate(sentenceKey:string, defaultvalue:string = null):Observable<string>{
    return new Observable(subscriber=>{
      this.loadTranslations().subscribe(
        (done)=>{
          let sentenceValue:string;
          if (this.translations!==null){
            for (let i=0;i<this.translations.length;i++){
              let t: Translation = this.translations[i];
              if (t.Key==sentenceKey){
                sentenceValue = t.Value;
              }
            }
          } 

          // If a sentence key is missing, i'll add it locally so it's easier to track missing key in the admin panel 
          if (!sentenceValue){
            if (defaultvalue!==null){
              sentenceValue = defaultvalue;
            } else {
              sentenceValue = "MISSING_KEY:"+sentenceKey;
            }
            let newTranslation: any = new Translation(sentenceKey,sentenceValue);
            newTranslation.Added = true;
            this.missing.push(newTranslation);
          } else {
            let index = -1;
            for (let i = 0; i<this.missing.length;i++){
              if (this.missing[i].Key==sentenceKey){
                index = i;
                break;
              }
            }
            this.missing.splice(index,1);
          }
          subscriber.next(sentenceValue);
        }
      );
    })
    
  }

  public getAll():Observable<Translation[]>{
    return this.http.get(this.getBaseUrl() + this.endpoint + "/GetAll", { headers: this.headers })
            .map((res: Response) => res.json());
  }

  public getAllLang(languageId:number):Observable<Translation[]>{
    return this.http.get(this.getBaseUrl() + this.endpoint + "/GetAllLang?languageId="+languageId, { headers: this.headers })
            .map((res: Response) => res.json());
  }

  public delete(translations:Translation[]):Observable<Translation[]>{
    return this.http
        .post(this.getBaseUrl()+this.endpoint+"/DeleteList", JSON.stringify(translations), {headers: this.headers})
        .map((res:Response)=>res.json());
  }

  public update(translations:Translation[]):Observable<Translation[]>{
    return this.http
        .post(this.getBaseUrl()+this.endpoint+"/UpdateList", JSON.stringify(translations), {headers: this.headers})
        .map((res:Response)=>res.json());
  }

  public add(translations:Translation[]):Observable<Translation[]>{
    return this.http
        .post(this.getBaseUrl()+this.endpoint+"/AddList", JSON.stringify(translations), {headers: this.headers})
        .map((res:Response)=>res.json());
  }

  public crud(deleted:Translation[],changed:Translation[], added:Translation[]):Observable<Translation[]>{
    const del$ = this.delete(deleted);
    const upd$ = this.update(changed);
    const add$ = this.add(added);

    return Observable.concat(del$,upd$,add$);    
  }

  public reload():Observable<Translation[]>{
    this.translations = null;
    localStorage.removeItem("translations");
    localStorage.removeItem("translationsVersion");
    localStorage.removeItem("languageId");
    return this.loadTranslations();
  }

  private loadingObservable: Observable<Translation[]>;
  private loadTranslations(languageId:number = null): Observable<Translation[]> {
    if (this.loadingObservable!=null) return this.loadingObservable;
    this.loadingObservable = new Observable(subscriber => {

      // Complete if I already have translations loaded
      if (this.translations!=undefined) {
        subscriber.next(this.translations);
        subscriber.complete();
        this.loadingObservable = null;
        
      } else {
        // Get current active language and latest version
        this.languagesService.GetActive().subscribe(
          active=>{
            let localLanguageId = localStorage.getItem("languageId");

            // Language mismatch: need to reload everything
            if (active.Id!= +localLanguageId){    
              this.refreshLocalStorageFromServer(active.Id).subscribe(
                x=>{
                  subscriber.next(this.translations);
                  subscriber.complete();
                  this.loadingObservable = null;
                }
              )
            } else { 
              
              // Language is OK, gonna check latest update version
              this.http.get(this.getBaseUrl() + this.endpoint + "/GetVersion", { headers: this.headers })
              .map((res: Response) => res.json()).subscribe(
                latestVersionString => {
                  let latestVersion = new Date(latestVersionString);
                  let localVersion: Date = new Date(localStorage.getItem("translationsVersion"));
                  if (latestVersion.getTime() > localVersion.getTime()) {
                    this.refreshLocalStorageFromServer(active.Id).subscribe(
                      x=>{
                        subscriber.next(this.translations);
                        subscriber.complete();
                        this.loadingObservable = null;
                      }
                    )
                  }
                }
              );
            }
          }
        )
      }
    }).share();
    return this.loadingObservable;
  }

  private loadTranslationsFromServer(languageId:number):Observable<Translation[]> {
    let method="";
    if (languageId){
      method = "/GetAllLang?languageId="+languageId;
    } else {
      method = "/GetAll";
    }
    return this.http
        .get(this.getBaseUrl() + this.endpoint + method, { headers: this.headers })
        .map((res: Response) => res.json());
  }

  private loadTranslationsFromLocalStorage():Translation[] {
    let localTranslations = localStorage.getItem("translations");
    this.translations = JSON.parse(localTranslations);
    return JSON.parse(localTranslations);
  }

  private refreshingLocalStorageObservable:Observable<null>;
  private refreshLocalStorageFromServer(languageId:number):Observable<null>{
    if (this.refreshingLocalStorageObservable!=null) return this.refreshingLocalStorageObservable;
    this.refreshingLocalStorageObservable = new Observable<null>(subscriber=>
    {
      this.loadTranslationsFromServer(languageId).subscribe(
        translations => {
          if (translations===null) translations=[];
          let latestVersion:Date = new Date(0);
          for (let i=0;i<translations.length;i++){
            if (latestVersion.getTime()<new Date(translations[i].LatestUpdate).getTime()){
              latestVersion = new Date(translations[i].LatestUpdate);
            }
          }
          localStorage.setItem("translations", JSON.stringify(translations));
          localStorage.setItem("translationsVersion", latestVersion + "");
          localStorage.setItem("languageId", languageId+"");
          this.translations = translations;
        },
        () => {
          alert("Couldn't load translations");
        },
        () => {
          subscriber.next();
          subscriber.complete();
        }
      );
    }).share();
    return this.refreshingLocalStorageObservable;
  }


}


