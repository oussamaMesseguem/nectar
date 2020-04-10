
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

    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\t/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor() { }

    tokens(): string[][] {
        return this.sentences.map(sent => sent.map(token => token.token));
    }

    ofToken(tokenAndAnnotation: string[]): ConllXToken {
        return ConllXToken.fromTab(tokenAndAnnotation);
    }
}
