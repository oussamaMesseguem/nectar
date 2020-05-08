import { AbstractStore } from '../store/abstractStore.model';
import { Annotation } from '../annotators/annotations';
import { IParser } from '../injector/injector.service';

/**
 * Used by this Injection service to split and tokenise the content
 * in case of Raw content.
 * Since it isn't a proper annotation it behaves a little differently
 */
export class RawService extends AbstractStore implements IParser {

    annotation = Annotation.raw;
    content: string[][];

    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\n/);
    elementsPattern: RegExp = new RegExp(/\s/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor(content?: string[][]) {
        super();
        if (content) {
            this.content = content;
        }
    }

    createToken(token: string, ...elements: string[]) {
        return token;
    }

    intoText(content: string[][]): string {
        throw new Error('Method not implemented.');
    }

    ofToken(tokenAndAnnotation: string[]): string {
        return tokenAndAnnotation[0];
    }
}
