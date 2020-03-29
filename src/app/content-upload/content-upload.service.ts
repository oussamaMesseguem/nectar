import { ConlluParser } from '../annotations/conllu/conllu-parser.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ContentUploadService {

    private parser: ParserService;

    model: object = {};

    constructor() {

    }

    parseContent(annotation: string, content: string): Observable<number> | never {
        switch (annotation) {
            case 'Conll-U':
                this.parser = new ParserService(new ConlluParser());
                break;

            default:
                throw this.assertAnnotationType(annotation);
        }

        let unitsProgress = 0;

        const obs: Observable<number> = new Observable(observer => {

            console.log(`content.length: ${content.length}`);

            this.parser.streamObject(content).subscribe(unit => {
                console.log(unit);
                unitsProgress += unit.size;
                const progress = Math.round(unitsProgress * 100 / content.length);
                console.log(`progress: ${unitsProgress}`);

                observer.next(progress);
            },
                err => { },
                () => {
                    console.log('obvervable from parser complete');
                    observer.complete();
                });

        });

        return obs;

    }

    parseUnit(): string {
        return '';
    }

    assertAnnotationType(annotation: string): never {
        throw new Error(`Annotation type '${annotation}' not recognized`);
    }
}

/**
 * Defines the methods parsers should implement to be used in this service
 */
export interface IParser {

    /**
     * Transforms the content string into an associated object.
     * @param content the content itself as scheme
     */
    streamObject(content: string): Observable<ParserModel>;

    /**
     * Transforms the content object into the string scheme.
     * @param content the content itself as an object
     */
    toString(content: any): string;

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

    toString(content: any): string {
        return this.parser.toString(content);
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
