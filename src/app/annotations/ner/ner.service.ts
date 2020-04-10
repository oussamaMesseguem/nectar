
import { IParser } from 'src/app/injection/injection.service';
import { Annotation } from '../annotations';
import { Injectable } from '@angular/core';
import { NerToken } from './ner.model';

@Injectable({
    providedIn: 'root'
})
export class Ner implements IParser {

    annotation: Annotation = Annotation.ner;
    sentences: NerToken[][] = [];

    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\t/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor() { }

    tokens(): string[][] {
        return this.sentences.map(sent => sent.map(token => token.token));
    }

    ofToken(tokenAndAnnotation: string[]): NerToken {
        return NerToken.fromTab(tokenAndAnnotation);
    }
}
