import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ContentUploadForm } from './content-upload.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ContentUploadService } from './content-upload.service';

@Component({
  selector: 'app-content-upload',
  templateUrl: './content-upload.component.html',
  styleUrls: ['./content-upload.component.scss']
})
export class ContentUploadComponent implements OnInit {

  languages: string[] = ['English', 'French', 'Spanish'];
  types: string[] = ['Conll-U', 'Conll-X', 'Biluo', 'Raw'];
  readerProgressValue: number;

  contentUploadFormGroup: FormGroup = this.formBuilder.group(new ContentUploadForm());

  isValid = false;
  isRaw = false;
  validationInProgress = false;

  constructor(private formBuilder: FormBuilder, private contentUploadService: ContentUploadService) { }

  ngOnInit(): void {
    this.contentUploadFormGroup.valueChanges
      .subscribe(v => {
        this.validate();
      });

  }

  get lang(): FormControl | null { return this.contentUploadFormGroup.get(ContentUploadForm.LANG) as FormControl; }
  get type(): FormControl | null { return this.contentUploadFormGroup.get(ContentUploadForm.TYPE) as FormControl; }
  get content(): FormControl | null { return this.contentUploadFormGroup.get(ContentUploadForm.CONTENT) as FormControl; }

  /**
   * Sets the value of the type into the ControlForm.
   * Done manually because chiplist does not handle it.
   * @param value the value of the type
   */
  changeType(value: string) {
    // To ensure that the value of the type cannot be changed
    // Once the content has been validated
    // Otherwise the button gets switched
    if (!this.isValid) {
      if (value === null || value === undefined) {
        this.type.reset();
        this.isValid = false;
      } else {
        this.type.setValue(value);
      }
      this.isRaw = value === 'Raw';
    }
  }

  upload() {
    this.content.setValue('value');
  }

  /**
   * Reset the FormControls to null.
   * Not handled by the reset button.
   */
  reset() {
    this.changeType(null);
    this.content.setValue(null);
    this.isValid = false;
  }

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
   * Validates the form.
   * The main validation is to get a valid parsing of the content.
   */
  validate() {
    if (!Object.values(this.contentUploadFormGroup.value).includes(null) && this.content.value != null) {
      this.isValid = true;
      console.log(Object.values(this.contentUploadFormGroup.value));
    }
  }

  onFileComplete(file: File) {
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
    reader.onload = (event: ProgressEvent) => {
      this.validationInProgress = true;
      this.contentUploadService.parseContent('Conll-U', reader.result.toString())
        .then(_ => {
          console.log('validation done.');

          this.validationInProgress = false;
          this.isValid = true;
        },
          err => {
            console.error(err);
          });
    };

  }
}
