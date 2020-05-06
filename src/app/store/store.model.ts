import { Annotation } from '../annotators/annotations';
import { createConlluToken, ConlluToken } from '../annotators/conllu/conllu.model';
import { createNerToken } from '../annotators/ner/ner.model';

export class Store {

    private store = {};

    constructor() { }

    // **** Store Content START ****
    /**
     * Iterates through the raw content and inits new tokens according to the given annotation.
     * @param annotation The new annotation to add
     */
    addEntry(annotation: string) {
        try {
            const annotationContent = [];
            // store[Raw] should never be undefined
            this.store[Annotation.raw].forEach((sentence: string[]) => {
                const sent = [];
                sentence.forEach((token: string, index: number) => {
                    sent.push(this.createToken(annotation, token, index));
                });
                annotationContent.push(sent);
            });
            this.store[annotation] = annotationContent;
        } catch (error) {
            throw new Error(`Initilisation of [${annotation}] was not possible. Make sure store[Raw] is defined`);
        }
    }

    /**
     * Returns the content for the given annotation.
     * @param annotation the annotation
     */
    getContent(annotation: string): any[] {
        return this.store[annotation];
    }

    /**
     * Returns the sentence at the given index from Store[annotation]
     * @param annotation the annotation
     * @param isentence the sentence index
     */
    getSentence(annotation: string, isentence: number): any[] {
        return this.store[annotation][isentence];
    }

    /**
     * Will add a new entry to the store and set the content.
     * @param annotation the annotation
     * @param content the content
     */
    initStore(annotation: string, content: any[][]) {
        // Because: store[Raw] contains the tokens per sentences and it's used to init new annotation objects
        if (annotation !== Annotation.raw) {
            this.store[Annotation.raw] = content.map(l => l.map(t => t.token));
        }
        this.store[annotation] = content;
    }

    /**
     * Returns the entries in the Store
     */
    keys(): string[] { return Object.keys(this.store); }

    /**
     * The number of sentences in the store.
     */
    nbSentences(): number {
        if (this.store[Annotation.raw] !== undefined) {
            return this.store[Annotation.raw].length;
        }
        return 0;
    }
    // **** Store Initialisation END ****

    // **** Sentences operations START ****
    /**
     * Deletes the entire sentence from the array.
     */
    deleteSentence(isentence: number) {
        this.keys().forEach(annotation => {
            this.store[annotation].splice(isentence, 1);
        });
    }

    /**
     * Duplicates the sentence at the given index.
     * The duplication is index + 1.
     */
    duplicateSentence(isentence: number) {
        this.keys().forEach(annotation => {
            const value = JSON.parse(JSON.stringify(this.store[annotation][isentence]));
            this.store[annotation].splice(isentence, 0, value);
        });
    }

    /**
     * Adds a new empty sentence after the given index.
     */
    newSentenceAfter(isentence: number) {
        this.keys().forEach(annotation => {
            this.store[annotation].splice(isentence + 1, 0, [this.createToken(annotation, '~', 0)]);
        });
    }

    /**
     * Adds a new empty sentence before the given index.
     * @param isentence The index of the sentence
     */
    newSentenceBefore(isentence: number) {
        this.keys().forEach(annotation => {
            this.store[annotation].splice(isentence, 0, [this.createToken(annotation, '~', 0)]);
        });
    }
    // **** Sentences operations END ****

    // **** Tokens operations START ****
    /**
     * Duplicates the token at the given index in the given sentence.
     * @param itoken The index of the token
     */
    duplicateToken(isentence: number, itoken: number) {
        this.keys().forEach(annotation => {
            const token = JSON.parse(JSON.stringify(this.store[annotation][isentence][itoken]));
            this.store[annotation][isentence].splice(itoken, 0, token);
            if (annotation === Annotation.conllu) {
                this.updateConlluIndexes(isentence);
            }
        });
    }

    /**
     * Adds a new empty token before the given index.
     * @param itoken The index of the token
     */
    newTokenBefore(isentence: number, itoken: number) {
        this.keys().forEach(annotation => {
            this.store[annotation][isentence].splice(
                itoken, 0, this.createToken(annotation, '~', itoken));
            if (annotation === Annotation.conllu) {
                this.updateConlluIndexes(isentence);
            }
        });
    }

    /**
     * Adds a new empty token after the given index.
     * @param itoken The index of the token
     */
    newTokenAfter(isentence: number, itoken: number) {
        this.keys().forEach(annotation => {
            this.store[annotation][isentence].splice(
                itoken + 1, 0, this.createToken(annotation, '~', itoken));
            if (annotation === Annotation.conllu) {
                this.updateConlluIndexes(isentence);
            }
        });
    }

    /**
     * Changes the value of the token.
     * @param itoken The index of the token
     * @param value The new value
     */
    editToken(isentence: number, itoken: number, value: string) {
        this.keys().forEach(annotation => {
            this.store[annotation][isentence].splice(
                itoken, 1, this.createToken(annotation, value, itoken));
            if (annotation === Annotation.conllu) {
                this.updateConlluIndexes(isentence);
            }
        });
    }

    /**
     * Deletes the token from the sentence.
     * @param itoken The index of the token
     */
    deleteToken(isentence: number, itoken: number) {
        let shouldDeleteSentence = false;
        this.keys().forEach(annotation => {
            this.store[annotation][isentence].splice(itoken, 1);
            if (annotation === Annotation.conllu) {
                this.updateConlluIndexes(isentence);
            }
            // Because: if the sentence doesn't have any token, it's no longer needed.
            shouldDeleteSentence = this.store[annotation][isentence].length === 0;
        });
        // Because: need to delete the sentence and move the subject after the deletion
        if (shouldDeleteSentence) {
            this.deleteSentence(isentence);
        }
    }
    // **** Tokens operations END ***

    /**
     * Returns an object depending on the annotation that contains the token at the given position.
     * @param annotation the annotation
     * @param token the token
     * @param index the position
     */
    private createToken(annotation: string, token: string, index?: number): any {
        if (annotation === Annotation.conllu) {
            return createConlluToken((index + 1).toString(), token);
        }
        if (annotation === Annotation.ner) {
            return createNerToken(token);
        }
        if (annotation === Annotation.raw) {
            return token;
        }
    }

    /**
     * Updates Conllu indexes.
     * Should be used after tokens operations.
     */
    private updateConlluIndexes(isentence: number) {
        this.store[Annotation.conllu][isentence].forEach((element: ConlluToken, index: number) => {
            element.index = (index += 1).toString();
        });
    }

}
