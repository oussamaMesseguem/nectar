import { Component, OnInit } from '@angular/core';
import { Annotation } from '../../annotators/annotations';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  /**
   * The selected annotation to display the form.
   * Comes from the annotation-list component.
   */
  selectedAnnotation: string;
  /**
   * The number of sentences
   */
  maxIndex: number;
  currentIndex = 0;

  constructor() {
    // The nb of sentences is set to local storage as it is needed by this component
    // and there is no deps between it and the annotation services.
    // The value is set by the injection service once the upload has been done.
    // tslint:disable-next-line: radix
    this.maxIndex = Number.parseInt(localStorage.getItem('nbOfSentences'));
  }

  ngOnInit(): void { }

  get annotations() { return Annotation; }

  setSelectedAnnotation(annotation: string) {
    this.selectedAnnotation = annotation;
  }

  previous() {
    this.currentIndex = this.currentIndex === 0 ? this.maxIndex - 1 : this.currentIndex - 1;
  }

  next() {
    this.currentIndex = this.currentIndex === this.maxIndex - 1 ? 0 : this.currentIndex + 1;
  }

}
