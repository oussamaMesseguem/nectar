import { AbstractStore } from 'src/app/store/store.abstract.model';
import { IParser } from 'src/app/injector/injector.service';
import { Annotation } from '../annotations';
import { NerToken } from './ner.model';
import { Storable } from 'src/app/store/store.interface';

/**
 * Store service for NER
 */
export class NerService extends AbstractStore<NerToken> implements Storable, IParser {
    annotation: Annotation = Annotation.ner;
    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\n/);
    elementsPattern: RegExp = new RegExp(/\t/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor(content?: NerToken[][]) {
        super();
        if (content) {
            this.content = content;
        }
    }

    ofToken(value: string[]): NerToken {
        const token = value[0];
        let tag = 'O';
        let type = '';
        if (value[1] !== '' && value[1] !== 'O') {
            const t = value[1].split('-');
            tag = t[0];
            type = t[1];
        }
        return { token, tag, type };
    }

    createToken(token: Partial<NerToken>): NerToken {
        return { token: token.token, tag: token.tag ? token.tag : '', type: token.type ? token.type : '' };
    }

    intoText(content: NerToken[][]): string {
        const text = [];
        content.forEach(sentence => {
            const sentenceArray = [];
            sentence.forEach(token => {
                const values: string[] = Object.values(token);
                let tag = 'O';
                if (values[1] !== '' && values[1] !== 'O') {
                    tag = values[1].concat('-', values[2]);
                }
                values.splice(1, 2, tag);
                sentenceArray.push(values.join('\t'));
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
