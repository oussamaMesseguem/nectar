import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Annotation, Language } from '../../annotations/annotations';
import { Router } from '@angular/router';
import { InjectionService } from '../injection.service';

@Component({
  selector: 'app-content-upload',
  templateUrl: './content-upload.component.html',
  styleUrls: ['./content-upload.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [animate(300, style({ opacity: 0 }))])
    ])
  ]
})
export class ContentUploadComponent implements OnInit {

  languages: string[] = Object.values(Language);
  types: string[] = Object.values(Annotation);

  contentUploadFormGroup: FormGroup = this.formBuilder.group(new ContentUploadForm());

  /**
   * Whether the content has been validated
   */
  isValid = false;

  /**
   * Wheter the promise of Validation has been started
   * Also used to display the spinner
   */
  contentValidationInProgress = false;

  files: Array<FileUploadModel> = [];

  constructor(private formBuilder: FormBuilder, private injectionService: InjectionService,
              private router: Router) { }

  ngOnInit(): void { }

  /**
   * Whether the Form is filled: language and type not null.
   * Used to enable the upload button.
   */
  get isFormValid(): boolean {
    return !Object.values(this.contentUploadFormGroup.value).includes(null);
  }

  /**
   * Whether the selected type is Raw.
   * The goto buttons depens on the types
   */
  get isRaw(): boolean {
    return this.type.value === Annotation.raw;
  }

  get lang(): FormControl | null { return this.contentUploadFormGroup.get(ContentUploadForm.LANG) as FormControl; }
  get type(): FormControl | null { return this.contentUploadFormGroup.get(ContentUploadForm.TYPE) as FormControl; }


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

  /**
   * Redirects to the annotation page.
   */
  annotate() {
    console.log(this.contentUploadFormGroup.value);
    this.router.navigateByUrl('adjust');

  }

  /**
   * Redirects to the adjusment form.
   */
  adjust() {
    console.log(this.contentUploadFormGroup.value);
    this.router.navigateByUrl('adjust');
  }

  /**
   * The content get parsed and upload only when the language and the type are set
   * @param file The upload content
   */
  onFileComplete(file: FileUploadModel) {
    console.log(this.contentUploadFormGroup.value);
    if (this.isFormValid) {
      const reader = new FileReader();
      reader.readAsText(file.data);

      // While on progress a progress bar is displayed
      reader.onprogress = (event: ProgressEvent) => {
        console.log('inside onprogress');
        file.progress = Math.round((event.loaded * 100) / event.total);
      };

      // Once the content has been read, it's sent to the service
      // for parsing.
      reader.onload = _ => {
        this.contentValidationInProgress = true;
        this.injectionService.injectContent(this.lang.value, this.type.value, reader.result.toString())
          .then(value => {
            console.log(this.injectionService.getSentences());
            this.isValid = true;
            console.log(`The content is being parsed: ${value}`);
          })
          .catch((err) => {
            this.contentValidationInProgress = false;
            console.error(`An error occured while parsing the content: ${err}`);
          })
          .finally(() => {
            this.contentValidationInProgress = false;
          });
      };

    }

  }

  cancelFile() {
    // Stop the parsing of the content
    this.injectionService.cancelContentInjection();
    // No file uploaded, hence empty array
    this.files = [];
    // No parsing running
    this.contentValidationInProgress = false;
    // No message of validation to display
    this.isValid = false;

  }
}

class ContentUploadForm {
  public static readonly LANG = 'lang';
  public static readonly TYPE = 'type';

  lang = new FormControl();
  type = new FormControl();

  constructor(type?: string, lang?: string) {
    if (type) {
      this.type.setValue(type);
    }
    if (lang) {
      this.lang.setValue(lang);
    }
  }
}

export class FileUploadModel {
  data: File;
  state: string;
  progress: number;
}
