
import { ConllXToken } from './conllx.model';
import { IParser } from 'src/app/injection/injection.service';
import { Annotation } from '../annotations';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Conllx implements IParser {

    annotation: Annotation = Annotation.conllx;
    sentences: ConllXToken[][] = [];
    stopInjecting: boolean;

    constructor() { }

    injectContent(content: string): Promise<boolean> {
        let sentence: ConllXToken[] = [];

        const promise: Promise<boolean> = new Promise((resolve, reject) => {
            content.split('\n')
                .filter(l => !l.startsWith('#'))
                .forEach((line: string) => {
                    // A sentence has been parsed
                    if (line.match('^[0-9].*')) {
                        const tab = line.trim().split('\t');
                        sentence.push(ConllXToken.fromTab(tab));
                    } else {
                        // The sentence is sent and the array reset
                        this.sentences.push(sentence);
                        sentence = [];
                    }
                });

            if (this.stopInjecting) {
                reject(new Error('Parsing has been asked to be stopped'));
            }
            resolve(true);
        });

        return promise;
    }

    cancelContentInjection(value: boolean) {
        this.stopInjecting = value;
    }

    tokens(): string[][] {
        return this.sentences.map(sent => sent.map(token => token.token));
    }
}
