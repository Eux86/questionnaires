import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit,OnChanges,SimpleChanges } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { ViewChild } from '@angular/core';

import { FileUploadService } from '../../../services/file-upload.service'

@Component({
  moduleId: module.id,
  selector: 'image-upload',
  templateUrl: 'image-upload.component.html',
  styleUrls: ['image-upload.component.css'],
})


export class ImageUploadComponent implements OnInit,OnChanges {
    currentFile: File = null;
    currentFileName: String = "";

    @ViewChild('fileInput')
    fileInputElement: any;

    @Input() 
    get file() {
        return this.currentFile;
    }

    @Output() fileChange = new EventEmitter();
    set file(val) {
      this.currentFile = val;
      this.fileChange.emit(val);
    }

    constructor(
         private fileUploadService: FileUploadService ,
         private router: Router,
    ) { }

    ngOnInit(): void {
        
    }

    ngOnChanges(changes: SimpleChanges): void{
        // this.isNew = typeof this.sentenceValue === 'string';
    }

    upload(): void {
        this.router.navigate(['/sentences']);
    }

    fileInputChange(fileInput: any):void{
    if (fileInput.target.files && fileInput.target.files[0]) {
        var reader = new FileReader();

        let self = this;
        reader.onload = function (e : any) {
            self.currentFile = e.target.result;
        }
        
        reader.readAsDataURL(fileInput.target.files[0]);
        this.currentFileName = this.fileInputElement.nativeElement.value.split("\\").pop();
    }
  }

    
}