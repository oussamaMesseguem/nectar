import { AbstractStore } from 'src/app/store/abstractStore.model';
import { IParser } from 'src/app/injector/injector.service';
import { Annotation } from '../annotations';
import { ConlluToken } from './conllu.model';

/**
 * Store service for conllu
 */
export class ConlluService extends AbstractStore implements IParser {
    annotation = Annotation.conllu;
    content: ConlluToken[][];
    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\n/);
    elementsPattern: RegExp = new RegExp(/\t/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor(content?: ConlluToken[][]) {
        super();
        if (content) {
            this.content = content;
        }
    }

    ofToken(value: string[]): ConlluToken {
        return {
            index: value[0], token: value[1], lemma: value[2], upos: value[3], xpos: value[4], feat: value[5],
            head: value[6], deprel: value[7], deps: value[8], misc: value[9]
        };
    }

    createToken(token: string, ...elements: string[]): ConlluToken {
        return {
            token,
            index: elements[0] ? elements[0] : '1',
            lemma: elements[1] ? elements[1] : '_',
            upos: elements[2] ? elements[2] : '_',
            xpos: elements[3] ? elements[3] : '_',
            feat: elements[4] ? elements[4] : '_',
            head: elements[5] ? elements[5] : '_',
            deprel: elements[6] ? elements[6] : '_',
            deps: elements[7] ? elements[7] : '_',
            misc: elements[8] ? elements[8] : '_'
        };
    }

    from(content: string[][]) {
        content.forEach((sentence: string[]) => {
            const sent = [];
            sentence.forEach((token: string, index: number) => {
                sent.push(this.createToken(token, (index += 1).toString()));
            });
            this.content.push(sent);
        });
    }

    intoText(content: ConlluToken[][]): string {
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

    /**
     * Deletes the token from the sentence.
     * @param itoken The index of the token
     */
    deleteToken(isentence: number, itoken: number) {
        super.deleteToken(isentence, itoken);
        this.updateConlluIndexes(isentence);
    }

    duplicateToken(isentence: number, itoken: number) {
        super.duplicateToken(isentence, itoken);
        this.updateConlluIndexes(isentence);
    }

    /**
     * Adds a new empty token before the given index.
     * @param itoken The index of the token
     */
    newTokenBefore(isentence: number, itoken: number) {
        super.newTokenBefore(isentence, itoken);
        this.updateConlluIndexes(isentence);
    }

    /**
     * Adds a new empty token after the given index.
     * @param itoken The index of the token
     */
    newTokenAfter(isentence: number, itoken: number) {
        super.newTokenAfter(isentence, itoken);
        this.updateConlluIndexes(isentence);
    }

    /**
     * Updates Conllu indexes.
     * Should be used after tokens operations.
     */
    private updateConlluIndexes(isentence: number) {
        this.content[isentence].forEach((element: ConlluToken, index: number) => {
            element.index = (index += 1).toString();
        });
    }
}
