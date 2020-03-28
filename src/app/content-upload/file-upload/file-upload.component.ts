import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription, of, empty } from 'rxjs';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map, tap, last, catchError } from 'rxjs/operators';

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

  /** Link text */
  @Input() text = 'Upload';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = 'https://file.io';

  @Output() uploadCompleted = new EventEmitter<File>();

  clicked = false;

  files: Array<FileUploadModel> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  get file() { return this.files[0]; }

  onClick() {
    this.clicked = true;
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
          canRetry: false,
          canCancel: true
        });
      });

      this.uploadFiles();
    };

    fileUpload.click();
  }

  cancelFile(file: FileUploadModel) {
    file.sub.unsubscribe();
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
  }

  private uploadFile(file: FileUploadModel) {
    const reader = new FileReader();
    file.inProgress = true;
    reader.onprogress = (event: ProgressEvent) => {
      file.progress = Math.round((event.loaded * 100) / event.total);
      console.log(file.progress);
      console.log(reader.result.toString() != null);
    };
    reader.readAsText(file.data);

    // const fd = new FormData();
    // fd.append(this.param, file.data);

    // const req = new HttpRequest('POST', this.target, fd, {
    //   reportProgress: true
    // });

    // file.inProgress = true;
    // file.sub = this.http
    //   .request(req)
    //   .pipe(
    //     map(event => {
    //       switch (event.type) {
    //         case HttpEventType.UploadProgress:
    //           file.progress = Math.round((event.loaded * 100) / event.total);
    //           break;
    //         case HttpEventType.Response:
    //           return event;
    //       }
    //     }),
    //     tap(message => { }),
    //     last(),
    //     catchError((error: HttpErrorResponse) => {
    //       file.inProgress = false;
    //       file.canRetry = true;
    //       return of(`${file.data.name} upload failed.`);
    //     })
    //   )
    //   .subscribe((event: any) => {
    //     if (typeof event === 'object') {
    //       this.removeFileFromArray(file);
    //       // this.complete.emit(file.data);
    //     }
    //   });
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
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}
