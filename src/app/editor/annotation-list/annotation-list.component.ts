import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { Annotation } from 'src/app/annotations/annotations';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.scss']
})
export class AnnotationListComponent implements OnInit {

  @Output() selectedAnnotation: EventEmitter<string> = new EventEmitter();

  annotCtrl = new FormControl();
  annotations: string[] = [];
  allAnnotations: string[] = Object.values(Annotation).filter(a => a !== Annotation.raw);

  constructor() { }

  ngOnInit() {
    this.annotCtrl.valueChanges.pipe(
      tap(x => console.log(x))
    ).subscribe();
  }

  get filteredAnnotations(): string[] {
    return this.allAnnotations.filter(annot => !this.annotations.includes(annot));
  }

  add(value: string): void {
    this.annotations.push(value.trim());
    this.annotCtrl.setValue(value);
  }

  remove(annot: string): void {
    const index = this.annotations.indexOf(annot);

    if (index >= 0) {
      this.annotations.splice(index, 1);
      // When the removed chip is the selected one
      if (this.annotations.length > 0 && annot === this.annotCtrl.value) {
        this.annotCtrl.setValue(this.annotations[0]);
      }
    }
  }
}
