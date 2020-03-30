import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ContentUploadService } from './content-upload.service';
import { Annotation } from '../annotations/annotations';

@Component({
  selector: 'app-content-upload',
  templateUrl: './content-upload.component.html',
  styleUrls: ['./content-upload.component.scss']
})
export class ContentUploadComponent implements OnInit {

  languages: string[] = ['English', 'French', 'Spanish'];
  types: string[] = Object.values(Annotation);
  readerProgressValue: number;

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
  /***
   * The
   */
  uploadCanceled: boolean;

  constructor(private formBuilder: FormBuilder, private contentUploadService: ContentUploadService) { }

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

  /**
   * Redirects to the annotation page.
   */
  annotate() {
    console.log(this.contentUploadFormGroup.value);
  }

  /**
   * Redirects to the adjusment form.
   */
  adjust() {
    console.log(this.contentUploadFormGroup.value);
  }

  /**
   * The content get parsed and upload only when the language and the type are set
   * @param file The upload content
   */
  onFileComplete(file: File) {
    console.log(this.contentUploadFormGroup.value);
    if (this.isFormValid) {
      console.log('File uploaded');
      const reader = new FileReader();
      console.log(file);
      reader.readAsText(file);

      // While on progress a progress bar is displayed
      reader.onprogress = (event: ProgressEvent) => {
        console.log('inside onprogress');
        this.readerProgressValue = Math.round((event.loaded * 100) / event.total);
        console.log(this.readerProgressValue);
      };

      // Once the content has been read, it gets emitted to the service
      // for parsing.
      reader.onload = _ => {
        this.contentValidationInProgress = true;
        this.contentUploadService.parseContent(this.type.value, reader.result.toString())
          .then(event => {
            console.log('validation done.');

            this.contentValidationInProgress = false;
            if (!this.uploadCanceled) {
              this.isValid = true;
            }

          },
            err => {
              console.error(err);
            });
      };

    }

  }

  cancelUpload() {
    this.contentValidationInProgress = false;
    this.uploadCanceled = true;
    this.isValid = false;
    console.log(this.contentUploadFormGroup.value);

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
