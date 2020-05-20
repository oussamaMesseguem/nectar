import { AbstractStore } from '../store/store.abstract.model';
import { Annotation, Tokenable, AnnotationType } from '../annotators/annotations';
import { IParser } from '../injector/injector.service';
import { Storable } from '../store/store.interface';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

/**
 * Used by this Injection service to split and tokenise the content
 * and operations on sentences and tokens.
 */
export class RawService extends AbstractStore<Tokenable> implements Storable, IParser {

    annotation = Annotation.Raw;

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

    intoText(): string {
        console.log("oo", this.content);

        if (this.content[0]) {
            return this.content
                .map((sentence: Tokenable[]) => {
                    const sent = sentence.map((token: Tokenable) => token.token).join('\n');
                    console.log(sent);

                    return sent;
                }).join('\n\n');
        }
        console.log("failed");

    }

    ofToken(token: string[]): Tokenable {
        return { token: token[0] };
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

    async split(http: HttpClient, text: string, lang: string) {

        const sentencesString = [];
        const sentences: SpacyResponse[] = await this.spacySplit(http, text, lang);

        sentences.forEach((sentence: SpacyResponse) => {
            sentencesString.push(sentence.dep_parse.words.map(obj => obj.text).join('\n'));
        });
        return sentencesString.join('\n\n');

    }

    private async spacySplit(http: HttpClient, text: string, lang: string) {
        const body = { text, model: 'en' };
        const url = `http://localhost:3000/`;
        const headers = { 'Content-Type': 'application/json' };
        return await http.post<SpacyResponse[]>(url + 'sents_dep', body, { headers }).toPromise();
    }
    private toTokenable(token: string): Tokenable {
        return { token };
    }
}

interface SpacyResponse {
    sentence: string;
    dep_parse: SpacyDep;
}

interface SpacyDep {
    arcs: SpacyArc[];
    words: SpacyWord[];
}
interface SpacyArc {
    dir: string;
    end: number;
    label: string;
    start: number;
    text: string;
}

interface SpacyWord {
    tag: string;
    text: string;
}
