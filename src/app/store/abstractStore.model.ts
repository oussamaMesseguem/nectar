
export abstract class AbstractStore {

    content: any[][];
    annotation: string;

    constructor() {this.content = []; }

    // **** Constructor ****
    /**
     * Init the content of the annotation from the raw content
     * @param content the raw content
     */
    from(content: string[][]) {
        content.forEach((sentence: string[]) => {
            const sent = [];
            sentence.forEach(token => {
                sent.push(this.createToken(token));
            });
            this.content.push(sent);
        });
    }

    // **** Sentences operations START ****
    /**
     * Deletes the entire sentence from the array.
     */
    deleteSentence(isentence: number) {
        this.content.splice(isentence, 1);
    }

    /**
     * Duplicates the sentence at the given index.
     * The duplication is index + 1.
     */
    duplicateSentence(isentence: number) {
        const value = JSON.parse(JSON.stringify(this.content[isentence]));
        this.content.splice(isentence, 0, value);
    }

    /**
     * Adds a new empty sentence after the given index.
     */
    newSentenceAfter(isentence: number) {
        const newToken = this.createToken('~');
        this.content.splice(isentence + 1, 0, [newToken]);
    }

    /**
     * Adds a new empty sentence before the given index.
     * @param isentence The index of the sentence
     */
    newSentenceBefore(isentence: number) {
        const newToken = this.createToken('~');
        this.content.splice(isentence, 0, [newToken]);
    }
    // **** Sentences operations END ****

    // **** Tokens operations START ****
    /**
     * Deletes the token from the sentence.
     * @param itoken The index of the token
     */
    deleteToken(isentence: number, itoken: number) {
        this.content[isentence].splice(itoken, 1);
        // Because: need to delete the sentence and move the subject after the deletion
        if (this.content[isentence].length === 0) {
            this.deleteSentence(isentence);
        }
    }

    /**
     * Duplicates the token at the given index in the given sentence.
     * @param itoken The index of the token
     */
    duplicateToken(isentence: number, itoken: number) {
        const token = JSON.parse(JSON.stringify(this.content[isentence][itoken]));
        this.content[isentence].splice(itoken, 0, token);
    }

    /**
     * Changes the value of the token.
     * @param itoken The index of the token
     * @param value The new value
     */
    editToken(isentence: number, itoken: number, value: string) {
        const token = this.createToken(value);
        this.content[isentence].splice(itoken, 0, token);
    }

    /**
     * Adds a new empty token before the given index.
     * @param itoken The index of the token
     */
    newTokenBefore(isentence: number, itoken: number) {
        const token = this.createToken('~');
        this.content[isentence].splice(itoken, 0, token);
    }

    /**
     * Adds a new empty token after the given index.
     * @param itoken The index of the token
     */
    newTokenAfter(isentence: number, itoken: number) {
        const token = this.createToken('~');
        this.content[isentence].splice(itoken + 1, 0, token);
    }
    // **** Tokens operations END ***

    /**
     * Creates an object from a given token
     * @param token the value of the token
     * @param elements other values for the object
     */
    abstract createToken(token: string, ...elements: string[]): any;

    /**
     * Transforms the content into a string
     * @param content the content to write
     */
    abstract intoText(content: any[][]): string;
}
