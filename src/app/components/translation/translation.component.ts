import { Component, OnInit } from '@angular/core';
import { KeyValuePair,Language} from '../../data-model'
import { TranslationService} from '../../services/translation.service';
import { LanguagesService } from '../../services/languages.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

  public selectedLanguage:Language;
  public languages: Language[];
  public translations: KeyValuePair[];


  public deleted: KeyValuePair[] = [];
  public changed: KeyValuePair[] = [];
  public added: KeyValuePair[] = [];
  public selectedTranslationsNumber:number= 0;

  public newLanguageName: string = "";

  constructor(private translatorService: TranslationService,private languagesService: LanguagesService) {
    this.loadTranslations();
    this.loadLanguages();
    // -------------
  }

  ngOnInit() {
  }

  public loadTranslations(){
    this.translatorService.getAll().subscribe(
      (translations) => {
        this.reload(translations);
      },
      () => { }, //ERROR
      () => { } //FINALLY
    );
  }
  public loadLanguages(){
    this.languagesService.getAll().subscribe(
      languages=>{
        this.languages = languages;
        for (let i=0;i<this.languages.length;i++){
          if (this.languages[i].Active){
            this.selectedLanguage=this.languages[i];
          }
        }
      }
    )
  }

  public addNewTranslation(){
    let tempName = "key"+(this.translations.length+1);
    let newTranslation: any = new KeyValuePair(tempName,"MISSING_KEY:"+tempName);
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
        this.translatorService.reload().subscribe(
          translations=>this.reload(translations)
        )
      },
      err=>{
        alert("There was an error saving the changes: \n"+err);
      }, // Error
      ()=>{} // Complete
    )
  }

  public onUndo(){
    this.translatorService.reload().subscribe(
      translations => this.translations=translations,
      err=>{
        alert("There was en error reloading the translations: \n"+err);
      },
      ()=>{}
    )
  }

  public onActivateLanguage(){
    this.languagesService.SetActive(this.selectedLanguage).subscribe(
      activated=>{
        this.translatorService.reload().subscribe(
          (translations) => {
            this.reload(translations);
          },
          () => { }, //ERROR
          () => { } //FINALLY
        );
        this.loadTranslations();
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

  private reload(translations: KeyValuePair[]) {
    if (translations===null) translations=[];
    this.translations = translations;
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
  }
  


}
