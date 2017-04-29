import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { OnInit,OnChanges,SimpleChanges } from '@angular/core'
import { ViewChild } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sandbox',
  templateUrl: 'sandbox.component.html',
  styleUrls: ['sandbox.component.css'],
})


export class SandboxComponent  {
    currentFile: File;
    state: string;
    argument: any;

    OnInit(){

    }

    regEvent(ev):void{
        this.argument =ev;
    }
}