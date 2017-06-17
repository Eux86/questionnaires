import { Component, OnInit } from '@angular/core';
import { KeyValuePair} from '../../data-model'
import { TranslationService} from '../../services/translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

  private selectedLanguage:string = "";
  private languages: string[];
  private translations: KeyValuePair[];


  private deleted: KeyValuePair[] = [];
  private changed: KeyValuePair[] = [];
  private added: KeyValuePair[] = [];
  private selectedTranslationsNumber:number= 0;

  constructor(private translator: TranslationService) {
    this.translator.getAll().subscribe(
      (translations) => {
        this.reload(translations);
      },
      () => { }, //ERROR
      () => { } //FINALLY
    );

    // should be loaded from api
    this.languages = ["default", "example1"];
    this.selectedLanguage = "default";
    // -------------
  }

  ngOnInit() {
  }

  private addNewTranslation(){
    let tempName = "key"+(this.translations.length+1);
    let newTranslation: any = new KeyValuePair(tempName,"MISSING_KEY:"+tempName);
    newTranslation.Added=true;
    this.translations.push(newTranslation);
    this.added.push(newTranslation);
  }

  private onSelectionChange(translation:any){
    if (translation.Selected)
      this.selectedTranslationsNumber+=1;
    else 
      this.selectedTranslationsNumber-=1;
    console.log(this.selectedTranslationsNumber);
  }

  private onContentChange(translation:any){
    if (!translation.Added){
      translation.Changed = true;
      this.changed.push(translation);
    }
  }

  private onDeleteSelected(){
    for (let i=0;i<this.translations.length;i++){
      let t:any=this.translations[i];
      if (t.Selected){
        this.deleted.push(t);
        t.Deleted = true;
      }
    }
  }

  private onSave(){
    this.translator.crud(this.deleted,this.changed,this.added).subscribe(
      translations=> {
        this.translator.reload().subscribe(
          translations=>this.reload(translations)
        )
      },
      err=>{
        alert("There was an error saving the changes: \n"+err);
      }, // Error
      ()=>{} // Complete
    )
  }

  private onUndo(){
    this.translator.reload().subscribe(
      translations => this.translations=translations,
      err=>{
        alert("There was en error reloading the translations: \n"+err);
      },
      ()=>{}
    )
  }

  private reload(translations: KeyValuePair[]) {
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
