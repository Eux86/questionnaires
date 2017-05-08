import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { Sentence } from '../../data-model';
import { SentenceService } from '../../services/sentence.service'


@Component({
  moduleId: module.id,
  selector: 'sentences-list',
  templateUrl: 'sentences-list.component.html',
  styleUrls: ['sentences-list.component.css'],
})


export class SentencesListComponent implements OnInit {
    @Input()
    sentences: Sentence[];
    searchText: string = "";
    selected: boolean;

    constructor(
        private sentenceService: SentenceService,
    ) { }

    ngOnInit(): void {
        this.getAllSentences();
    }

    getAllSentences(){
        this.sentenceService.getAll().then(
            sentences => {
                this.sentences = sentences;
            }
        ) 
    }

    // selectionChange(sentence:Sentence):void{
    //     let found = false;
    //     let selected:Sentence[] = [];
    //     this.sentences.forEach(sentence => {
    //         let s:any = sentence;
    //         if (s.Selected == true){
    //             selected.push(sentence);
    //         }
    //     }); 
    //     selected.some((el)=>{
    //         found = el.Id == sentence.Id;
    //         return found;
    //     });
    //     if (found){
    //         let index =selected.indexOf(sentence, 0);
    //         if (index > -1) {
    //             selected.splice(index, 1);
    //         }
    //     } else {
    //         selected.push(sentence);
    //     }
    //     let sentences = "";
    //     selected.forEach(sentence => {
    //         sentences+=sentence.Text+"\n";
    //     });
    // }

    selectAll(value: boolean):void{
        this.sentences.forEach(sentence => {
            let s:any = sentence;
            s.Selected = value;
        });
    }

    getSelected():Sentence[]{
        let selected:Sentence[] = [];
        this.sentences.forEach(sentence => {
            let s:any = sentence;
            if (s.Selected == true){
                selected.push(sentence);
            }
        }); 
        return selected;
    }

    deleteSelected(){
        this.sentenceService.delete(this.getSelected()).then(
            result => {
                this.getAllSentences();
            }
        );
    }

    onChange(model:string):void {
        if (model=="" || model==null){
            this.getAllSentences();
        } else {
            this.sentenceService.getByText(model).then(
            sentences => {
                    this.sentences = sentences;
                }
            );
        }
    }
}