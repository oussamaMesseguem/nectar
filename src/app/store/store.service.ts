import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Annotation } from '../annotators/annotations';
import { Store } from './store.model';

/**
 * The main service class that holds the content and serves it to the views.
 */
@Injectable({
    providedIn: 'root'
})
export class StoreService {

    selectedAnnotations$: BehaviorSubject<string[]> = new BehaviorSubject([]);

    /**
     * The exposed sentence to display and tag.
     */
    sentence$: BehaviorSubject<any[]> = new BehaviorSubject([]);

    /**
     * The store itself.
     * * Contains the content.
     * * Keys: are the annotations
     * * Values: are an array of the annotated content
     */
    store: Store = new Store();

    /**
     * The current selected annotation. Affects the sentence observable as it changes its content.
     */
    private annotationValue: string;

    /**
     * The current sentence index among the sentences. Affects the sentence observable as it changes its content.
     */
    private indexValue = 0;

    private removedAnnotations: string[] = [];

    constructor() { }

    /**
     * Returns the current annotation.
     */
    get annotation(): string { return this.annotationValue; }

    /**
     * Sets the new current annotation.
     * * Moves the observable to the new annotation.
     */
    set annotation(annotation: string) {
        this.annotationValue = annotation;
        // Because: the annotation might have been added to the removed annotations array before
        // therefore it needs to be removed from since it should appear in the selected annotations
        if (this.removedAnnotations.includes(annotation)) {
            this.removedAnnotations.splice(this.removedAnnotations.indexOf(annotation), 1);
        }
        this.store.addEntry(annotation);
        this.selectedAnnotations$.next(this.store.keys().filter(a => !this.removedAnnotations.includes(a)));
        this.sentence$.next(this.store.getSentence(this.annotationValue, this.indexValue));
    }

    /**
     * Returns the current index of the sentence
     */
    get index(): number { return this.indexValue; }

    /**
     * Sets the current index of the sentence.
     * * Moves the observable to the new index.
     */
    set index(index: number) {
        if (index > this.indexValue) {
            this.indexValue = this.indexValue === this.nbSentences - 1 ? 0 : this.indexValue + 1;
        } else {
            this.indexValue = this.indexValue === 0 ? this.nbSentences - 1 : this.indexValue - 1;
        }
        this.sentence$.next(this.store.getSentence(this.annotationValue, this.indexValue));
    }

    /**
     * The number of sentences in the store.
     */
    get nbSentences(): number { return this.store.nbSentences(); }


    /**
     * Adds a new entry in the store and sets the raw content array.
     * @param annotation new object property
     */
    initStore(annotation: string, content: any[][]) {
        this.store.initStore(annotation, content);
        this.annotation = annotation;
        // Because: if the uploaded content is not Raw this raw type should not be added in future.
        if (annotation !== Annotation.raw) {
            this.removedAnnotations.push(Annotation.raw);
        }
        this.selectedAnnotations$.next([annotation]);
    }

    next(annotation?: string, isentence?: number): void {
        this.sentence$.next(this.store.getSentence(annotation ? annotation : this.annotationValue,
            isentence ? isentence : this.indexValue));
    }

    /**
     * Deletes the annotation from the selected annotations array.
     * @param annotation The annotation to remove
     */
    removeAnnotation(annotation: string) {
        this.removedAnnotations.push(annotation);
        this.selectedAnnotations$.next(this.store.keys().filter(a => !this.removedAnnotations.includes(a)));
        if (this.selectedAnnotations$.value.length > 0) {
            this.annotation = this.selectedAnnotations$.value[0];
        }
    }

    /**
     * Resets the store to scrach.
     */
    reset() {
        this.store = new Store();
        this.annotationValue = '';
        this.selectedAnnotations$.next([]);
        this.sentence$.next([]);
    }

    /**
     * Writes content into files.
     * @param annotations the exported annotations
     */
    writeContents(annotations: string[]) {
        // annotations.forEach(annotation => {
        //     const a = document.createElement('a');
        //     let content: string = this.store;
        //     if (annotation === Annotation.conllu) {
        //         content = conlluIntoText(this.store.getContent(annotation));
        //     }
        //     if (annotation === Annotation.ner) {
        //         content = nerIntoText(this.store.getContent(annotation));
        //     }
        //     const file = new Blob([content], { type: 'text/plain' });
        //     a.href = URL.createObjectURL(file);
        //     a.download = `${annotation}.txt`;
        //     a.click();
        // });
    }
}
