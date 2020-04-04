
import { ConllToken } from './conllu.model';
import { IParser } from 'src/app/injection/injection.service';
import { Annotation } from '../annotations';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Conllu implements IParser {

    annotation: Annotation = Annotation.conllu;
    sentences: any[][] = [];
    stopInjecting: boolean;

    constructor() { }

    injectContent(content: string): Promise<boolean> {
        console.log('conllu-parser.streamObject');
        let sentence: ConllToken[] = [];

        const promise: Promise<boolean> = new Promise((resolve, reject) => {
            content.split('\n')
                .filter(l => !l.startsWith('#'))
                .forEach((line: string) => {
                    // A sentence has been parsed
                    if (line.match('^[0-9].*')) {
                        const tab = line.trim().split('\t');
                        sentence.push(ConllToken.fromTab(tab));
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
}
