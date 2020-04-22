import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Annotation } from '../../annotators/annotations';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.scss']
})
export class AnnotationListComponent implements OnInit {


  /**
   * All the available annotations.
   */
  allAnnotations: string[] = Object.values(Annotation).filter(a => a !== Annotation.raw);
  /**
   * The selected annotations by users.
   */
  annotationsChipList: string[] = [];
  /**
   * The current annotation value.
   */
  annotationValue: string;

  /**
   * Notifies when an annotations has been removed.
   */
  @Output() removedAnnotation: EventEmitter<string> = new EventEmitter();
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
    this.annotation = annotation;
  }

  /**
   * Removes the annotation from the chip-list and notifies store.
   * @param annotation the annotation to remove
   */
  remove(annotation: string): void {
    const index = this.annotationsChipList.indexOf(annotation);
    this.annotationsChipList.splice(index, 1);
    // Sets the last annotation to the current
    if (this.annotationsChipList.length > 0) {
      const newAnnotation = this.annotationsChipList[this.annotationsChipList.length - 1];
      this.annotation = newAnnotation;
    }
    this.removedAnnotation.emit(annotation);
  }
}
