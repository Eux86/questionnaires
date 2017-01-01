import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { Sentence } from '../../data-model';
import { QuestionnaireService } from '../../services/questionnaire.service'


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

    constructor(
        private questionnaireService: QuestionnaireService,
    ) { }

    ngOnInit(): void {
        this.questionnaireService.getSentences().then(
            sentences => {
                this.sentences = sentences;
            }
        ) 
    }
}