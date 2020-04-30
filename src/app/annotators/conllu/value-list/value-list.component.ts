import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormArray } from '@angular/forms';


/**
 * Data accepted by the modal
 * * equality: The character which separates key from val
 * * separator: The character which separates pairs
 * * tag: The string value as unerversal dependencies defines it.
 * * tags: The list of possible tags.
 *   * tag: The left tag, also named key.
 *   * name: Associated tooltip.
 *   * values: Associated values to the tag.
 *     * tag: The right tag, also named value
 *     * name: Associated tooltip.
 */
export interface DialogData {
  tag: string;
  tags:
    {
      tag: string;
      values: { tag: string, name: string }[]
    }[];
  separator: string;
  equality: string;
}

@Component({
  selector: 'app-value-list',
  templateUrl: './value-list.component.html',
  styleUrls: ['./value-list.component.scss']
})
export class ValueListComponent implements OnInit {

  fields: string[][] = [];

  constructor(public dialogRef: MatDialogRef<ValueListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private fb: FormBuilder) { }

  ngOnInit(): void {

    // Init of the injected tag string
    // Must be split and converted into pairs
    if (this.data.tag) {
      this.data.tag.split(this.data.separator).forEach(pair => {
        this.fields.push(pair.split(this.data.equality));
      });
    }
  }

  /**
   * Adds new tag
   */
  add() {
    this.fields.push([]);
  }

  /**
   * Closes the dialog with a value.
   */
  closeDialog() {
    this.dialogRef.close(this.format());
  }

  /**
   * Builds the string to display
   * * key/val separated by the equality, separator is the list separator.
   * * single values without equality sign.
   */
  format(): string {
    const values = [];
    this.fields.filter(t => t.length > 0).forEach(element => {
      if (element[0] && element[1]) {
        const v = `${element[0]}${this.data.equality}${element[1]}`;
        values.push(v);
      } else if (element[0]) {
        values.push(element[0]);
      }
    });
    if (values.length > 0) {
      return values.join(this.data.separator);
    } else {
      return this.data.tag;
    }
  }

  /**
   * Removes the tag from the array
   * @param i the index of the tag
   */
  remove(i: number) {
    this.fields.splice(i, 1);
    if (this.fields.length === 0) {
      this.add();
    }
  }

  /**
   * Updates the value of the pairs when change.
   * @param value The new value to be set
   * @param i The index of the pair in the list
   * @param position Whether it's the tag: 0 or the value: 1
   */
  updateField(value: any, i: number, position: number): void {
    this.fields[i].splice(position, 1, value);
  }
}
