import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';


export interface DialogData {
  tags: string;
  keys: string[];
  values: string[];
  separator: string;
  equality: string;
}

@Component({
  selector: 'app-value-list',
  templateUrl: './value-list.component.html',
  styleUrls: ['./value-list.component.scss']
})
export class ValueListComponent implements OnInit {

  fields: FormArray = this.fb.array([]);

  constructor(public dialogRef: MatDialogRef<ValueListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private fb: FormBuilder) { }

  ngOnInit(): void {

    if (this.data.tags) {
      this.data.tags.split(this.data.separator).forEach(pair => {
        const pairs = pair.split(this.data.equality);
        this.fields.push(this.fb.group({
          key: pairs[0],
          val: pairs[1]
        }));
      });
    }
  }

  /**
   * Adds new tag
   */
  add() {
    this.fields.push(this.fb.group({
      key: '',
      val: ''
    }));
  }

  /**
   * Removes the tag from the array
   * @param i the index of the tag
   */
  remove(i: number) {
    this.fields.removeAt(i);
    if (this.fields.length === 0) {
      this.fields.push(this.fb.group({
        key: '',
        val: ''
      }));
    }
  }

  /**
   * Builds the string to display:
   * * underscore if no value
   * * key/val separated by the equality, separator is the list separator
   */
  format(): string {
    const values = [];
    this.fields.controls.forEach(element => {
      if (element.get('key').value) {
        const v = `${element.get('key').value}${this.data.equality}${element.get('val').value}`;
        values.push(v);
      }
    });

    if (values.length > 0) {
      return values.join(this.data.separator);
    }

    return '_';
  }
}
