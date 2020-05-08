import { AbstractStore } from '../store/store.abstract.model';
import { Annotation, Tokenable } from '../annotators/annotations';
import { IParser } from '../injector/injector.service';

/**
 * Used by this Injection service to split and tokenise the content
 * in case of Raw content.
 * Since it isn't a proper annotation it behaves a little differently
 */
export class RawService extends AbstractStore implements IParser {

    annotation = Annotation.raw;
    content: Tokenable[][];

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
        return token ;
    }

    intoText(content: Tokenable[][]): string {
        throw new Error('Method not implemented.');
    }

    ofToken(tokenAndAnnotation: string[]): Tokenable {
        return { token: tokenAndAnnotation[0]};
    }
}
