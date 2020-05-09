import { AbstractStore } from '../store/store.abstract.model';
import { Annotation, Tokenable } from '../annotators/annotations';
import { IParser } from '../injector/injector.service';
import { Storable } from '../store/store.interface';

/**
 * Used by this Injection service to split and tokenise the content
 * and operations on sentences and tokens.
 */
export class RawService extends AbstractStore<Tokenable> implements Storable, IParser {

    annotation = Annotation.raw;

    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\n/);
    elementsPattern: RegExp = new RegExp(/\s/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor(content?: Tokenable[][]) {
        super();
        if (content) {
            this.content = content;
        }
    }

    createToken(token: Tokenable): Tokenable {
        return token;
    }

    intoText(content: Tokenable[][]): string {
        throw new Error('Method not implemented.');
    }

    ofToken(tokenAndAnnotation: string[]): Tokenable {
        return { token: tokenAndAnnotation[0] };
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
