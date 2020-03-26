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
  types: string[] = ['Conll-U', 'Conll-X', 'Biluo', 'Raw']

  contentUploadFormGroup: FormGroup = this._formBuilder.group(new ContentUploadForm());

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contentUploadFormGroup.get(ContentUploadForm.TYPE).valueChanges
      .subscribe(v => {
        console.log(v);
      });

  }

  get lang(): FormControl | null { return this.contentUploadFormGroup.get(ContentUploadForm.LANG) as FormControl; }
  get type(): FormControl | null { return this.contentUploadFormGroup.get(ContentUploadForm.TYPE) as FormControl; }

  changeType(value: string) {
    this.contentUploadFormGroup.get(ContentUploadForm.TYPE).setValue(value);
  }
}
