import { IParser, ParserModel } from 'src/app/injection/injection.service';
import { IAnnotator } from '../annotator.service';
import { Annotation } from '../annotations';
import { Observable } from 'rxjs';

export class Raw implements IParser, IAnnotator {
    annotation: Annotation.raw;

    constructor() { }

    streamObject(content: string): Observable<ParserModel> {

        const obs: Observable<ParserModel> = new Observable(observer => {
            content.split('\n')
                .filter(l => !l.startsWith('#'))
                .forEach((line: string) => {
                    // A sentence has been parsed
                    const sentence = line.trim().split(' ');
                    const size = line.length;
                    console.log(sentence);
                    observer.next({ sentence, size });
                });

            observer.complete();
            // setTimeout(() => {
            //     console.log('obvervable from parser complete11');
            //     observer.complete();
            // }, 2000);
        });

        return obs;
    }

    stopStreaming(): void {
        throw new Error('Method not implemented.');
    }

    intoString(content: any): string {
        throw new Error('Method not implemented.');
    }

    isUnitValid(unit: any): boolean {
        throw new Error('Method not implemented.');
    }

    isValid(): boolean {
        throw new Error('Method not implemented.');
    }

    getSentence(index: number): [] { return []; }

    setSentence(index: number, sentence: []): void { }

}
