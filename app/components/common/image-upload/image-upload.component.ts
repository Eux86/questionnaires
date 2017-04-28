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


export class ImageUploadComponent implements OnInit {
    currentFile: File = null;
    currentFileName: String = "";
    currentFileContent: any;

    @ViewChild('fileInput')
    fileInputElement: any;

    @Input() 
    get file(): File 
    {
        return this.currentFile
    }
    @Output() fileChange = new EventEmitter<File>();
    set file(val){
        this.currentFile = val;
        this.fileChange.emit(this.currentFile);
    }


    @Input() showUploadButton = false;
    @Output() onUpload = new EventEmitter<File>();

    constructor(
         private fileUploadService: FileUploadService ,
         private router: Router,
    ) { }

    ngOnInit(): void {
        
    }


    upload(): void {
        this.onUpload.emit(this.file);
    }

    fileInputChange(fileInput: any):void{
    if (fileInput.target.files && fileInput.target.files[0]) {
        var reader = new FileReader();

        let self = this;
        reader.onload = function (e : any) {
            self.currentFileContent = e.target.result;
            // self.file = e.target.result;
        }
        
        reader.readAsDataURL(fileInput.target.files[0]);
        this.file = fileInput.target.files[0];
        this.currentFileName = fileInput.target.files[0].name;
    }
  }

    
}