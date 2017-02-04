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
    selected: Sentence = new Sentence();
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