import { Component, OnInit } from '@angular/core';
import { Translation,Language} from '../../data-model'
import { TranslationService} from '../../services/translation.service';
import { LanguagesService } from '../../services/languages.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

  public selectedLanguage:Language;
  public languages: Language[];
  public translations: Translation[];
  


  public deleted: Translation[] = [];
  public changed: Translation[] = [];
  public added: Translation[] = [];
  public selectedTranslationsNumber:number= 0;

  public newLanguageName: string = "";

  constructor(private translatorService: TranslationService,private languagesService: LanguagesService) {
    this.reload();
  }

  ngOnInit() {
  }

  public loadingLanguagesObservable:Observable<null>
  public loadLanguages(){
    if (this.loadingLanguagesObservable!=null) return this.loadingLanguagesObservable;
    this.loadingLanguagesObservable = new Observable<null>(subscriber=>
    {
      this.languagesService.getAll().subscribe(
        languages=>{
          this.languages = languages;
          if (this.selectedLanguage==null){
            for (let i=0;i<this.languages.length;i++){
              if (this.languages[i].Active){
                this.selectedLanguage=this.languages[i];
              }
            }
          } else {
            // This code is needed because in this method the property this.selectedLanguage becomes undefined.
            // If you check in debug, the property is still defined INTO the observable body, but it won't appear on the debugger
            // as well as it won't result defined once the UI tries to load its updated value.
            // I think that the issue is happening because we're reloading the array where the instance was stored. The 
            // this.selectedLanguage property is storing just a reference. Once all the observable stop working on it, the garbage collector
            // is removing it.
            // With this fix, i'm replacing the old value, with the new instance coming from the refreshed array
            for (let i=0;i<this.languages.length;i++){
              if (this.languages[i].Id == this.selectedLanguage.Id)
              {
                this.selectedLanguage=this.languages[i];
              }
            }
          }
          subscriber.next();
          subscriber.complete();
          this.loadingLanguagesObservable=null;
        }
      )
    }).share();
    return this.loadingLanguagesObservable;
  }

  public addNewTranslation(){
    let tempName = "key"+(this.translations.length+1);
    let newTranslation: any = new Translation(tempName,"MISSING_KEY:"+tempName);
    newTranslation.Added=true;
    this.translations.push(newTranslation);
    this.added.push(newTranslation);
  }

  public onSelectionChange(translation:any){
    if (translation.Selected)
      this.selectedTranslationsNumber+=1;
    else 
      this.selectedTranslationsNumber-=1;
    console.log(this.selectedTranslationsNumber);
  }

  public onContentChange(translation:any){
    if (!translation.Added){
      translation.Changed = true;
      this.changed.push(translation);
    }
  }

  public onDeleteSelected(){
    for (let i=0;i<this.translations.length;i++){
      let t:any=this.translations[i];
      if (t.Selected){
        this.deleted.push(t);
        t.Deleted = true;
      }
    }
  }

  public onSave(){
    for (let i=0;i<this.added.length;i++){
      let translation:any=this.added[i];
      translation.languageId=this.selectedLanguage.Id;
    }
    this.translatorService.crud(this.deleted,this.changed,this.added).subscribe(
      translations=> {
        this.reload();
      },
      err=>{
        alert("There was an error saving the changes: \n"+err);
      }, // Error
      ()=>{} // Complete
    )
  }

  public onUndo(){
    this.reload();
  }

  public onActivateLanguage(){
    this.languagesService.SetActive(this.selectedLanguage).subscribe(
      activated=>{
        this.reload();
      },
      ()=>{},
      ()=>{}
    );
  }

  public onAddLanguage(){
    let newLanguage:Language = new Language();
    newLanguage.Name = this.newLanguageName;
    this.languagesService.Add(newLanguage).subscribe(
      added=>{
        this.languages.push(added);
        let selected:Language;
        for (let i=0; i<this.languages.length;i++){
          if (this.languages[i].Id == added.Id) selected=this.languages[i];
        }
        this.selectedLanguage = selected;
        this.reload();
      },
      ()=>{},
      ()=>{}
    );
  }
  
  public onDeleteLanguage(){
    this.languagesService.Delete(this.selectedLanguage).subscribe(
      deleted=>{
        var index = -1;
        for (let i=0;i<this.languages.length;i++){
          if (this.languages[i].Id == deleted.Id){
            index = i;
          }
        }
        if (index > -1) {
            this.languages.splice(index, 1);
        }
        let active:Language;
        for (let i=0; i<this.languages.length;i++){
          if (this.languages[i].Active) active=this.languages[i];
        }
        this.selectedLanguage = active;
        this.reload();
      },
      ()=>{},
      ()=>{}
    );
  }

  public onSelectedLanguageChange():void{
    this.translatorService.getAllLang(this.selectedLanguage.Id).subscribe(
      translations=>
      {
        this.translations = translations;
      },
      ()=>{},
      ()=>{}
    )
  }

  private reload() {
    this.loadLanguages().subscribe(
      ()=>{
        this.translatorService.getAllLang(this.selectedLanguage.Id).subscribe(
          translations=>
          {
            this.translations = translations;
            for (let i=0;i<this.translatorService.missing.length;i++){
              let missing:any = this.translatorService.missing[i];
              missing.Added=true;
              this.translations.push(missing);
            }
            this.deleted=[];
            this.added=[];
            this.changed=[];
            for (let i = 0; i < this.translations.length; i++) {
              let translation: any = this.translations[i];
              if (translation.Changed) {
                this.changed.push(translation);
              }
              if (translation.Deleted) {
                this.deleted.push(translation);
              }
              if (translation.Added) {
                this.added.push(translation);
              }
            }
          },
          ()=>{},
          ()=>{}
        )
      }
    ); 
  }
  


}
