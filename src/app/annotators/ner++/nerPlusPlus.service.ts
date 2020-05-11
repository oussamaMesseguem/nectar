import { NerPlusPlusToken } from './nerPlusPlus.model';
import { AbstractStore } from 'src/app/store/store.abstract.model';
import { IParser } from 'src/app/injector/injector.service';
import { Annotation, AnnotationType } from '../annotations';
import { Storable, Matchable } from 'src/app/store/store.interface';

/**
 * Store service for NER++
 */
export class NerPlusPlusService extends AbstractStore<NerPlusPlusToken> implements Storable, IParser {
    annotation: Annotation = Annotation['Ner++'];

    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\n/);
    elementsPattern: RegExp = new RegExp(/\t/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor(content?: NerPlusPlusToken[][]) {
        super();
        if (content) {
            this.content = content;
        }
        this.observers.Ner = new Matchable().add('label', 'label', ['', '_', '*']);
        this.observers['Conll-U'] = new Matchable().add('upos', 'pos', ['', '_']);
    }

    ofToken(value: string[]): NerPlusPlusToken {
        const token = value[0];
        const pos = value[1];
        const chunk = value[2];
        const shortShape = value[3];
        const label = value[4];
        return { token, pos, chunk, shortShape, label };
    }

    createToken(token: Partial<NerPlusPlusToken>): NerPlusPlusToken {
        return {
            token: token.token,
            label: token.label ? token.label : 'O',
            pos: token.pos ? token.pos : '_',
            chunk: token.chunk ? token.chunk : '_',
            shortShape: token.shortShape ? token.shortShape : '_'
        };
    }

    intoText(content: NerPlusPlusToken[][]): string {
        const text = [];
        content.forEach(sentence => {
            const sentenceArray = [];
            sentence.forEach(token => {
                sentenceArray.push(Object.values(token).join('\t'));
            });
            text.push(sentenceArray.join('\n'));
        });
        return text.join('\n\n');
    }

    duplicateSentence(isentence: number) {
        const value = JSON.parse(JSON.stringify(this.content[isentence]));
        super.addSentence(isentence, value);
    }

    newSentenceAfter(isentence: number) {
        const newToken = this.createToken({ token: '~' });
        super.addSentence(isentence + 1, [newToken]);
    }

    newSentenceBefore(isentence: number) {
        const newToken = this.createToken({ token: '~' });
        super.addSentence(isentence, [newToken]);
    }

    duplicateToken(isentence: number, itoken: number) {
        const values: string[] = Object.values(this.content[isentence][itoken]);
        const token = this.ofToken(values);
        super.addToken(isentence, itoken, token);
    }

    editToken(isentence: number, itoken: number, value: string) {
        const token = this.createToken({ token: value });
        this.content[isentence][itoken] = token;
    }

    newTokenBefore(isentence: number, itoken: number) {
        const token = this.createToken({ token: '~' });
        super.addToken(isentence, itoken, token);
    }

    newTokenAfter(isentence: number, itoken: number) {
        const token = this.createToken({ token: '~' });
        super.addToken(isentence, itoken + 1, token);
    }
}
