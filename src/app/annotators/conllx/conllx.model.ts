import { FormControl } from '@angular/forms';
import { IParser } from 'src/app/injector/injector.service';
import { Annotation } from '../annotations';

/**
 * A conllu content is an array of conllu token arrays.
 * * This interface represents a token and its tags
 * * Token in the same array are the words in the same sentence.
 * * An array is a sentence, hence the first arrays is the document.
 */
export interface ConllxToken {
    index: number;
    token: string;
    lemma: string;
    upos: string;
    xpos: string;
    feat: string;
    head: number;
    deprel: string;
    deps: string;
    misc: string;
}

/**
 * A parser for files.
 */
export class ConllxParser implements IParser {
    annotation: Annotation.conllx;
    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\t/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor() { }

    ofToken(value: string[]): ConllxToken {
        return {
            // tslint:disable-next-line: radix
            index: Number.parseInt(
                value[0]), token: value[1], lemma: value[2], upos: value[3], xpos: value[4], feat: value[5],
            // tslint:disable-next-line: radix
            head: Number.parseInt(value[6]), deprel: value[7], deps: value[8], misc: value[9]
        };
    }
}
