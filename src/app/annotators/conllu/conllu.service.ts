import { AbstractStore } from 'src/app/store/abstractStore.model';
import { IParser } from 'src/app/injector/injector.service';
import { Annotation, Tokenable } from '../annotations';
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

    createToken(token: Partial<ConlluToken>): ConlluToken {
        return {
            token: token.token,
            index: token.index ? token.index : '1',
            lemma: token.lemma ? token.lemma : '_',
            upos: token.upos ? token.upos : '_',
            xpos: token.xpos ? token.xpos : '_',
            feat: token.feat ? token.feat : '_',
            head: token.head ? token.head : '_',
            deprel: token.deprel ? token.deprel : '_',
            deps: token.deps ? token.deps : '_',
            misc: token.misc ? token.misc : '_'
        };
    }

    from<T extends Tokenable>(content: T[][]) {
        content.forEach((sentence: Tokenable[]) => {
            const sent = [];
            sentence.forEach((token: Tokenable, index: number) => {
                sent.push(this.createToken({ token: token.token, index: (index += 1).toString()}));
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
