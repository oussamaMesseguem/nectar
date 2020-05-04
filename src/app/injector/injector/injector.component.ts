import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Annotation, Language } from '../../annotators/annotations';
import { InjectorService } from '../injector.service';

@Component({
  selector: 'app-injector',
  templateUrl: './injector.component.html',
  styleUrls: ['./injector.component.scss'],
  providers: [
    { provide: InjectorService, useClass: InjectorService }
  ],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [animate(300, style({ opacity: 0 }))])
    ])
  ]
})
export class InjectorComponent implements OnInit {

  /**
   * The accepted type of files
   */
  annotations: string[] = Object.values(Annotation);
  /**
   * The accepted languages
   */
  languages: string[] = Object.values(Language);

  /**
   * The form group to upload content
   */
  formGroup: FormGroup = this.formBuilder.group(new ContentUploadForm());

  /**
   * Wheter the promise of Validation has been started
   * Also used to display the spinner
   */
  contentValidationInProgress = false;

  /**
   * Array of uploaded files
   */
  files: Array<FileUploadModel> = [];

  constructor(
    private formBuilder: FormBuilder,
    private injectionService: InjectorService) { }

  ngOnInit(): void { }

  get lang(): FormControl | null { return this.formGroup.get(ContentUploadForm.LANG) as FormControl; }
  get annotation(): FormControl | null { return this.formGroup.get(ContentUploadForm.ANNOTATION) as FormControl; }

  cancelFile() {
    // Stop the parsing of the content
    this.injectionService.cancelContentInjection();
    // No file uploaded, hence empty array
    this.files = [];
    // No parsing running
    this.contentValidationInProgress = false;
  }

  /**
   * The content get parsed and upload only when the language and the annotation are set
   * @param file The upload content
   */
  onFileComplete(file: FileUploadModel) {
    if (this.formGroup.valid) {
      const reader = new FileReader();
      reader.readAsText(file.data);

      // While on progress a progress bar is displayed
      reader.onprogress = (event: ProgressEvent) => {
        file.progress = Math.round((event.loaded * 100) / event.total);
      };

      // Once the content has been read, it's sent to the service
      // for parsing.
      reader.onload = _ => {
        this.injectionService.injectContent(this.lang.value, this.annotation.value, reader.result.toString())
          .subscribe(
            next => {
              this.contentValidationInProgress = next;
            },
            error => {
              this.contentValidationInProgress = false;
              console.error(`An error occured while parsing the content: ${error}`);
            },
            () => {
              this.contentValidationInProgress = false;
            });
      };
    }
  }

  onUpload() {
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;

    fileUpload.onchange = () => {
      Array.from(fileUpload.files).forEach(file => {
        this.files.push({
          data: file,
          state: 'in',
          progress: 0
        });
      });

      this.uploadFiles();
    };

    fileUpload.click();
  }

  private uploadFiles() {
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;

    fileUpload.value = '';

    this.files.forEach(file => {
      this.onFileComplete(file);
    });
  }
}

class ContentUploadForm {
  public static readonly LANG = 'lang';
  public static readonly ANNOTATION = 'annotation';

  lang = new FormControl();
  annotation = new FormControl();

  constructor(annotation?: string, lang?: string) {
    if (annotation) {
      this.annotation.setValue(annotation);
    }
    if (lang) {
      this.lang.setValue(lang);
    }
  }
}

class FileUploadModel {
  data: File;
  state: string;
  progress: number;
}
