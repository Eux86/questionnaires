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

    uploadProgress: number = 0;

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


    @Input() showUploadButton = true;
    @Output() onUploadStarted = new EventEmitter<File>();
    @Output() onUploadCompleted = new EventEmitter<File>();
    @Output() onUploadError = new EventEmitter<string>();

    constructor(
         private fileUploadService: FileUploadService ,
         private router: Router,
    ) { }

    ngOnInit(): void {
        
    }


    upload(): void {
        this.onUploadStarted.emit(this.file);
        this.uploadFile();
    }

    fileInputChange(fileInput: any):void{
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();

            let self = this;
            reader.onload = function (e : any) {
                self.currentFileContent = e.target.result;
            }
            
            reader.readAsDataURL(fileInput.target.files[0]);
            this.file = fileInput.target.files[0];
            this.currentFileName = fileInput.target.files[0].name;
        }
    }

    uploadFile():void{
        // this.fileUploadService.upload(this.imageToUpload);
        this.showUploadButton = false;
        this.uploadProgress = 0;
        this.fileUploadService.progress$.subscribe(
        data=> {
            this.uploadProgress = data;
        });
        this.fileUploadService.makeFileRequest(this.currentFile)
        .then((uploadedFile) => {
            console.log("uploaded");
            this.onUploadCompleted.emit(uploadedFile);
            this.showUploadButton = true;
        }).catch((exception: string)=>{
            console.log("error");
            this.onUploadError.emit(exception);
            this.showUploadButton = true;
        });
    }

    reset():void{
        this.uploadProgress=0;
        this.currentFile = null;
        this.currentFileContent = null;
        this.currentFileName = "";
    }
    
}