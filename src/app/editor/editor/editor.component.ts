import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  indexes: number[];
  currentIndex: number;
  displayedRange: number[] = [];

  /**
   * The selected annotation to display the form.
   * Comes from the annotation-list component.
   */
  selectedAnnotation: string;

  constructor() { }

  ngOnInit(): void {
    this.indexes = [...Array(25).keys()];
    this.currentIndex = 0;
  }

  setSelectedAnnotation(annotation: string) {
    this.selectedAnnotation = annotation;
  }

}
