import { Component, OnInit } from '@angular/core';
import { Annotation } from '../../annotators/annotations';
import { StoreService } from 'src/app/store.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  ngOnInit(): void { }

  /**
   * The annotation list.
   */
  get annotations() { return Annotation; }

  /**
   * A view on the current sentence depending on the index and the annotation.
   * A behaviour subject gives the possibility to subscribe to the content by async
   * and to get the value if needed.
   */
  get sentence$(): BehaviorSubject<any[]> { return this.storeService.sentence$; }

  /**
   * The sentence length.
   */
  get sentenceLength(): number { return this.storeService.sentence$.value.length; }

  /**
   * The current annotation.
   */
  get annotation(): string { return this.storeService.annotation; }

  /**
   * The current annotation. Set in the template by a <list-annotation> output
   */
  set annotation(annotation: string) { this.storeService.annotation = annotation; }

  /**
   * The index of the current sentence
   */
  get index() { return this.storeService.index; }


  /**
   * Moves the current index to the left.
   */
  previous() {
    this.storeService.nextSentence(false);
  }

  /**
   * Moves the current index to the right.
   */
  next() {
    this.storeService.nextSentence(true);
  }

  /**
   * Updates the annotation list and changes the store consequently.
   * @param annotations The emitted annotations
   */
  updateAnnotationList(annotations: string[]) {
    this.storeService.updateAnnotationList(annotations);
  }
}
