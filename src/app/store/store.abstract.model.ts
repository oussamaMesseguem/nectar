import { Tokenable, Annotation } from '../annotators/annotations';

/**
 * Store content can be modified by Raw or other, therefore this class
 * publish some operations on sentences and tokens.
 */
export abstract class AbstractStore<T extends Tokenable> {

    content: T[][];
    annotation: Annotation;

    constructor() { this.content = []; }

    /**
     * Init the content of the annotation from the raw content.
     * @param content the raw content
     */
    from(content: Partial<T>[][]) {
        content.forEach((sentence: T[]) => {
            const sent = [];
            sentence.forEach((token: T) => {
                sent.push(this.createToken(token));
            });
            this.content.push(sent);
        });
    }

    /**
     * Deletes the entire sentence from the array.
     * @param isentence the sentence index
     */
    deleteSentence(isentence: number) {
        this.content.splice(isentence, 1);
    }

    /**
     * Adds a the given sentence at the given position.
     * @param isentence the sentence index
     * @param sentence the sentence value
     */
    addSentence(isentence: number, sentence: T[]) {
        this.content.splice(isentence, 0, sentence);
    }

    /**
     * Adds the given token to the given sentence at the given position.
     * @param isentence the sentence index
     * @param itoken the token index
     * @param token the token value
     */
    addToken(isentence: number, itoken: number, token: T) {
        this.content[isentence].splice(itoken, 0, token);
    }

    /**
     * Deletes the given token at the given positions.
     * @param isentence the sentence index
     * @param itoken the token index
     */
    deleteToken(isentence: number, itoken: number) {
        this.content[isentence].splice(itoken, 1);
        // Because: need to delete the sentence and move the subject after the deletion
        if (this.content[isentence].length === 0) {
            this.deleteSentence(isentence);
        }
    }

    /**
     * Creates an object from a given token.
     * @param token the value of the token
     * @param elements other values for the objects
     */
    abstract createToken(token: Partial<T>): T;

    /**
     * Transforms the content into a string.
     * @param content the content to write
     */
    abstract intoText(content: T[][]): string;

    /**
     * Creates an object from an array of the token and its annotation.
     * @param content array of token and annotation
     */
    abstract ofToken(content: string[]): T;
}
