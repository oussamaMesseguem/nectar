import { Injectable } from '@angular/core';
import { Annotation } from './annotations';

@Injectable({
  providedIn: 'root'
})
export class AnnotatorService {

  private currentAnnotator: IAnnotator;
  private annotators: IAnnotator[];
  constructor() { }

  addAnnotator(annotator: IAnnotator) {
    this.annotators.push(annotator);
  }

  /**
   * Ask the AnnotatorService to set the current annotator to
   * another Annotator.
   * @param annotation The expected current annotation
   */
  setCurrentAnnotator(annotation: Annotation): void {
    this.annotators.forEach(annotator => {
      Object.values(Annotation).forEach(annotationValue => {
        if (annotation === annotationValue) {
          this.currentAnnotator = annotator;
        }
      });
    });
  }
}

export interface IAnnotator {

  annotation: Annotation;

  getSentence(index: number): [];

  setSentence(index: number, sentence: []): void;
}
