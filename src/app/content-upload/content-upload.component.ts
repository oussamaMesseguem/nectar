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
  languages: string[] = ['English', 'French', 'Spanish'];
  types: string[] = ['Conll-U', 'Conll-X', 'Biluo', 'Raw'];

  contentUploadFormGroup: FormGroup = this.formBuilder.group(new ContentUploadForm());

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contentUploadFormGroup.get(ContentUploadForm.TYPE).valueChanges
      .subscribe(v => {
        console.log(v);
      });

  }

  get lang(): FormControl | null { return this.contentUploadFormGroup.get(ContentUploadForm.LANG) as FormControl; }
  get type(): FormControl | null { return this.contentUploadFormGroup.get(ContentUploadForm.TYPE) as FormControl; }

  /**
   * Sets the value of the type into the ControlForm.
   * Done manually because chiplist does not handle it.
   * @param value the value of the type
   */
  changeType(value: string) {
    this.type.setValue(value);
  }

  /**
   * Reset the FormControl of the type to null.
   * Not done by the reset button.
   */
  resetType() {
    this.type.reset();
  }
}
