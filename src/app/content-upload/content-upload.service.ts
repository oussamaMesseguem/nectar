import { Conllu } from '../annotations/conllu/conllu.service';
import { Injectable } from '@angular/core';
import { Observable, of, Subscription, Subscriber, BehaviorSubject, from } from 'rxjs';
import { timeout, takeWhile } from 'rxjs/operators';
import { Annotation } from '../annotations/annotations';

@Injectable({
    providedIn: 'root',
})
export class ContentUploadService {

    private parser: ParserService;

    /**
     * Whether the content is being parsed
     */
    private isParsingInProgress = false;

    constructor() { }

    parseContent(lang: string, annotation: string, content: string): Observable<boolean> | never {
        switch (annotation) {
            case Annotation.conllu:
                this.parser = new ParserService(new Conllu());
                break;

            default:
                throw this.assertAnnotationType(annotation);
        }

        const obs: Observable<boolean> = new Observable(observer => {
            observer.next(true);
            this.isParsingInProgress = true;

            // The parsing is being done and the Model filled
            this.parser.streamObject(content)
                .subscribe(
                    {
                        next: unit => {
                            if (!this.isParsingInProgress) {
                                console.log(`progressing: ${this.isParsingInProgress}`);
                                this.parser.stopStreaming();
                                observer.error('The parsing has been stopped');
                            }
                        },
                        error: err => {
                            observer.error(err);

                        },
                        complete: () => {
                            // If the parsing has been done successfully,
                            // the obsevable completes.

                            console.log('parseContent complete');
                            observer.complete();
                            // setTimeout(() => {
                            //     console.log('obvervable from parser complete11');
                            //     observer.complete();
                            // }, 5000);
                        }
                    });
        });

        return obs;

    }

    /**
     * Stop the parsing
     */
    stopParsing() {
        this.isParsingInProgress = false;
    }

    assertAnnotationType(annotation: string): never {
        throw new Error(`Annotation type '${annotation}' not recognized`);
    }
}

/**
 * Defines the methods parsers should implement to be used in this service
 */
export interface IParser {

    annotation: Annotation;

    /**
     * Transforms the content string into an associated object.
     * @param content the content itself as scheme
     */
    streamObject(content: string): Observable<ParserModel>;

    /***
     * Stops the generation of objects
     */
    stopStreaming(): void;

    /**
     * Transforms the content object into the string scheme.
     * @param content the content itself as an object
     */
    intoString(content: any): string;

    isUnitValid(unit: any): boolean;

    isValid(): boolean;
}

/**
 * Internal service used by the ContentUploadService for parsing content
 */
class ParserService {

    private parser: IParser;

    constructor(parser: IParser) {
        this.parser = parser;
    }

    streamObject(content: string): Observable<ParserModel> {
        return this.parser.streamObject(content);
    }

    stopStreaming(): void {
        this.parser.stopStreaming();
    }

    toString(content: any): string {
        return this.parser.intoString(content);
    }

    isUnitValid(unit: any): boolean {
        throw new Error('Method not implemented.');
    }

    isValid(): boolean {
        throw new Error('Method not implemented.');
    }

}

export interface ParserModel {
    size: number;
    sentence: any[];
}
