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
    selected: Sentence[] = [];
    searchText: string = "";

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

    selectionChange(sentence:Sentence):void{
        let found = false;
        this.selected.some((el)=>{
            found = el.Id == sentence.Id;
            return found;
        });
        if (found){
            let index = this.selected.indexOf(sentence, 0);
            if (index > -1) {
                this.selected.splice(index, 1);
            }
        } else {
            this.selected.push(sentence);
        }
        let sentences = "";
        this.selected.forEach(sentence => {
            sentences+=sentence.Text+"\n";
        });
    }

    selectAll():void{
        alert('not implemented');
        this.selected = this.sentences;
    }

    deleteSelected(){
        this.sentenceService.delete(this.selected).then(
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