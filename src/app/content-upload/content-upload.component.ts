import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ContentUploadForm } from './content-upload.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-content-upload',
  templateUrl: './content-upload.component.html',
  styleUrls: ['./content-upload.component.scss']
})
export class ContentUploadComponent implements OnInit {
  isValid = false;
  isRaw = false;
  languages: string[] = ['English', 'French', 'Spanish'];
  types: string[] = ['Conll-U', 'Conll-X', 'Biluo', 'Raw'];

  contentUploadFormGroup: FormGroup = this.formBuilder.group(new ContentUploadForm());

  constructor(private formBuilder: FormBuilder) { }

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
    if (value === null || value === undefined) {
      this.type.reset();
      this.isValid = false;
    } else {
      this.type.setValue(value);
    }
    this.isRaw = value === 'Raw';
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

  onFileComplete(v) {
    console.log('the event');
    
    console.log(v);
  }
}
