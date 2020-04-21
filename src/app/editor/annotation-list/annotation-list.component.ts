import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Annotation } from '../../annotators/annotations';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.scss']
})
export class AnnotationListComponent implements OnInit {


  allAnnotations: string[] = Object.values(Annotation).filter(a => a !== Annotation.raw);
  annotationsChipList: string[] = [];
  annotationValue: string;

  /**
   * Notifies when the list of annotations changes
   */
  @Output() annotationList: EventEmitter<string[]> = new EventEmitter();
  /**
   * Notifies the Editor View when the selected annotation changes
   */
  @Output() selectedAnnotation: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  /**
   * The remaining annotations that is possible to add to the chip-list
   */
  get filteredAnnotations(): string[] {
    return this.allAnnotations.filter(annot => !this.annotationsChipList.includes(annot));
  }

  get annotation(): string { return this.annotationValue; }
  /**
   * When the annotation is set, the value changes and an event is emitted.
   */
  set annotation(annotation: string) {
    this.annotationValue = annotation;
    this.selectedAnnotation.emit(annotation);
  }

  /**
   * Adds the slected annotation to the chip-list annotations
   * * Move the current annotation to the new one
   * @param value the annotation to add
   */
  add(annotation: string): void {
    this.annotationsChipList.push(annotation);
    this.annotationValue = annotation;
    this.selectedAnnotation.emit(annotation);
    this.annotationList.emit(this.annotationsChipList);
  }

  /**
   * Removes the wanted annotation from the chip-list
   * @param annotation the annotation to remmove
   */
  remove(annotation: string): void {
    const index = this.annotationsChipList.indexOf(annotation);

    if (index >= 0) {
      this.annotationsChipList.splice(index, 1);
      // When the removed chip is the selected one, back to the previous one
      if (index > 0 && annotation === this.annotationValue) {
        const newAnnotation = this.annotationsChipList[index - 1];
        this.annotationValue = newAnnotation;
        this.selectedAnnotation.emit(annotation);
      }
    }
    this.annotationList.emit(this.annotationsChipList);
  }
}
