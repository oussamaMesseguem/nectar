import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipListChange, MatChipSelectionChange } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Annotation } from 'src/app/annotations/annotations';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.scss']
})
export class AnnotationListComponent implements OnInit {

  @Output() selectedAnnotation: EventEmitter<string>;

  // visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  annotCtrl = new FormControl();
  filteredAnnots: Observable<string[]>;
  annotations: string[] = [];
  allAnnotations: string[] = Object.values(Annotation).filter(a => a !== Annotation.raw);

  @ViewChild('annotInput') annotInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() { }

  ngOnInit() {
    this.filteredAnnots = this.annotCtrl.valueChanges.pipe(
      startWith(''),
      map((annot: string | null) => annot ? this._filter(annot) : this.allAnnotations.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our annot
    if ((value || '').trim()) {
      this.annotations.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.annotCtrl.setValue(null);
  }

  remove(annot: string): void {
    const index = this.annotations.indexOf(annot);

    if (index >= 0) {
      this.annotations.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.annotations.push(event.option.viewValue);
    this.annotInput.nativeElement.value = '';
    this.annotCtrl.setValue(null);
  }

  hasChanged(event: MatChipSelectionChange) {
    console.log('haschanged');

    console.log(event);

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAnnotations
      .filter(annot => annot.toLowerCase().indexOf(filterValue) === 0)
      .filter(annot => !this.annotations.includes(annot));
  }

}
