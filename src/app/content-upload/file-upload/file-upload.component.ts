import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [animate(300, style({ opacity: 0 }))])
    ])
  ]
})
export class FileUploadComponent implements OnInit {

  @Input() readerProgressValue: number;
  @Input() isDisabled: boolean;
  /**
   * Once the file is upload it's sent to parent
   */
  @Output() uploadCompleted = new EventEmitter<File>();

  /**
   * Disables the button
   */
  @Output() uploadCanceledChange = new EventEmitter<boolean>();
  @Input() displayFileProgress: boolean;


  files: Array<FileUploadModel> = [];

  constructor() { }

  ngOnInit() { }

  onClick() {
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;

    fileUpload.onchange = () => {

      Array.from(fileUpload.files).forEach(file => {
        this.files.push({
          data: file,
          state: 'in',
          inProgress: false,
          progress: 0,
          canCancel: true
        });
      });

      this.uploadFiles();
    };

    fileUpload.click();
  }

  cancelFile() {
    this.files = [];
    // this.removeFileFromArray(file);
    this.uploadCanceledChange.emit(true);
  }

  private uploadFile(file: FileUploadModel) {
    this.uploadCompleted.emit(file.data);
    this.displayFileProgress = true;
  }

  private uploadFiles() {
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }
}

export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canCancel: boolean;
}
