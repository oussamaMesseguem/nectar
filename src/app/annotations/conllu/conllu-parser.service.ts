
import { ConllToken } from './conllu.model';
import { IParser, ParserModel } from 'src/app/content-upload/content-upload.service';
import { Observable, of, Subject, from, Subscriber } from 'rxjs';
import { Annotation } from '../annotations';

export class ConlluParser implements IParser {

    annotation: Annotation = Annotation.conllu;

    constructor() { }

    streamObject(content: string): Observable<ParserModel> {
        console.log('conllu-parser.streamObject');
        let sentence: ConllToken[] = [];

        const obs: Observable<ParserModel> = new Observable(observer => {
            content.split('\n')
                .filter(l => !l.startsWith('#'))
                .forEach((line: string) => {
                    // A sentence has been parsed
                    if (line.match('^[0-9].*')) {
                        const tab = line.trim().split('\t');
                        sentence.push(ConllToken.fromTab(tab));
                    } else {
                        // The sentence is sent and the array reset
                        const size = sentence.map(token => token.token.length).reduce((acc, len) => acc + len, 0) + 20;
                        const parserModel: ParserModel = { sentence, size };
                        observer.next(parserModel);
                        sentence = [];
                    }
                });

            observer.complete();
        });

        return obs;
    }

    stopStreaming(): void {
    }

    toString(content: any): string {
        return '';
    }

    isUnitValid(unit: any): boolean {
        throw new Error('Method not implemented.');
    }
    isValid(): boolean {
        throw new Error('Method not implemented.');
    }
}
