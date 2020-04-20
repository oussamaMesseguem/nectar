import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Annotation } from '../../annotators/annotations';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.scss']
})
export class AnnotationListComponent implements OnInit {

  /**
   * Notifies the Editor View when the selected annotation changes
   */
  @Output() selectedAnnotation: EventEmitter<string> = new EventEmitter();

  annotCtrl = new FormControl();
  annotationsChipList: string[] = [];
  allAnnotations: string[] = Object.values(Annotation).filter(a => a !== Annotation.raw);

  constructor() { }

  /**
   * Subscribtion to the value of the selected annotation, when changed, the value gets emitted to edit component
   */
  ngOnInit() {
    this.annotCtrl.valueChanges.subscribe(value => this.selectedAnnotation.emit(value));
    this.add(Annotation.conllu);
    this.add(Annotation.ner);
  }

  /**
   * The remaining annotations that is possible to add to the chip-list
   */
  get filteredAnnotations(): string[] {
    return this.allAnnotations.filter(annot => !this.annotationsChipList.includes(annot));
  }

  /**
   * Adds the slected annotation to the chip-list annotations
   * @param value the annotation to add
   */
  add(value: string): void {
    this.annotationsChipList.push(value);
    this.annotCtrl.setValue(value);
  }

  /**
   * Removes the wanted annotation from the chip-list
   * @param annot the annotation to remmove
   */
  remove(annot: string): void {
    const index = this.annotationsChipList.indexOf(annot);

    if (index >= 0) {
      this.annotationsChipList.splice(index, 1);
      // When the removed chip is the selected one, back to the previous one
      if (index > 0 && annot === this.annotCtrl.value) {
        this.annotCtrl.setValue(this.annotationsChipList[index - 1]);
      }
    }
  }
}
