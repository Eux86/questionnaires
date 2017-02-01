import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit,OnChanges,SimpleChanges } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { Sentence } from '../../data-model';
import { QuestionnaireService } from '../../services/questionnaire.service'

@Component({
  moduleId: module.id,
  selector: 'sentence-edit',
  templateUrl: 'sentence-edit.component.html',
  styleUrls: ['sentence-edit.component.css'],
})


export class SentenceEditComponent implements OnInit,OnChanges {
    sentenceValue: Sentence = new Sentence();
    sentences: Sentence[];
    isNew: boolean

    @Input() 
    get sentence() {
        return this.sentenceValue;
    }

    @Output() sentenceChange = new EventEmitter();
    set sentence(val) {
      this.sentenceValue = val;
      this.sentenceChange.emit(val);
    }

    constructor(
         private questionnaireService: QuestionnaireService,
         private router: Router,
    ) { }

    ngOnInit(): void {
        this.questionnaireService.getSentences().then(
            sentences => {
                this.sentences = sentences;
            }
        )
        // this.selected=this.sentence;
    }

    ngOnChanges(changes: SimpleChanges): void{
        this.isNew = typeof this.sentenceValue === 'string';
    }

    goToSentenceManagement(): void {
        this.router.navigate(['/sentences']);
    }

    
}