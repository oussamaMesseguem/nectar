import { Annotation, AnnotationType } from '../annotators/annotations';
import { ConlluService } from '../annotators/conllu/conllu.service';
import { NerService } from '../annotators/ner/ner.service';
import { NerPlusPlusService } from '../annotators/ner++/nerPlusPlus.service';
import { AbstractStore } from './store.abstract.model';
import { RawService } from '../adjustor/raw.service';

/**
 * A class which stores different type of annotation store.
 */
export class Store {

    private store: Partial<{ [key in AnnotationType]: AbstractStore }> = { };

    constructor() { }

    // **** Store Content START ****
    /**
     * Iterates through the raw content and inits new tokens according to the given annotation.
     * @param annotation The new annotation to add
     */
    addEntry(annotation: string) {
        if (!this.keys().includes(annotation)) {
            this.addAnnotationStore(annotation);
            this.store[annotation].from(this.store[Annotation.raw].content);
        }
    }

    /**
     * Returns the content for the given annotation.
     * @param annotation the annotation
     */
    getContent(annotation: string): any[] {
        return this.store[annotation].content;
    }

    /**
     * Returns the sentence at the given index from Store[annotation]
     * @param annotation the annotation
     * @param isentence the sentence index
     */
    getSentence(annotation: string, isentence: number): any[] {
        return this.store[annotation].content[isentence];
    }

    /**
     * Will add a new entry to the store and set the content.
     * @param annotation the annotation
     * @param content the content
     */
    initStore(annotation: string, content: any[][]) {
        // Because: store[Raw] contains the tokens per sentences and it's used to init new annotation objects
        if (annotation !== Annotation.raw) {
            const rawContent = content.map(l => l.map(t => t.token));
            this.addAnnotationStore(Annotation.raw, rawContent);
        }
        this.addAnnotationStore(annotation, content);
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
            return this.store[Annotation.raw].content.length;
        }
        return 0;
    }
    // **** Store Initialisation END ****

    // **** Sentences operations START ****
    /**
     * Deletes the entire sentence from the array.
     */
    deleteSentence(isentence: number) {
        this.storedContent().forEach((store: AbstractStore) => {
            store.deleteSentence(isentence);
        });
    }

    /**
     * Duplicates the sentence at the given index.
     * The duplication is index + 1.
     */
    duplicateSentence(isentence: number) {
        this.storedContent().forEach((store: AbstractStore) => {
            store.duplicateSentence(isentence);
        });
    }

    /**
     * Adds a new empty sentence after the given index.
     */
    newSentenceAfter(isentence: number) {
        this.storedContent().forEach((store: AbstractStore) => {
            store.newSentenceAfter(isentence);
        });
    }

    /**
     * Adds a new empty sentence before the given index.
     * @param isentence The index of the sentence
     */
    newSentenceBefore(isentence: number) {
        this.storedContent().forEach((store: AbstractStore) => {
            store.newSentenceBefore(isentence);
        });
    }
    // **** Sentences operations END ****

    // **** Tokens operations START ****
    /**
     * Duplicates the token at the given index in the given sentence.
     * @param itoken The index of the token
     */
    duplicateToken(isentence: number, itoken: number) {
        this.storedContent().forEach((store: AbstractStore) => {
            store.duplicateToken(isentence, itoken);
        });
    }

    /**
     * Adds a new empty token before the given index.
     * @param itoken The index of the token
     */
    newTokenBefore(isentence: number, itoken: number) {
        this.storedContent().forEach((store: AbstractStore) => {
            store.newTokenBefore(isentence, itoken);
        });
    }

    /**
     * Adds a new empty token after the given index.
     * @param itoken The index of the token
     */
    newTokenAfter(isentence: number, itoken: number) {
        this.storedContent().forEach((store: AbstractStore) => {
            store.newTokenAfter(isentence, itoken);
        });
    }

    /**
     * Changes the value of the token.
     * @param itoken The index of the token
     * @param value The new value
     */
    editToken(isentence: number, itoken: number, value: string) {
        this.storedContent().forEach((store: AbstractStore) => {
            store.editToken(isentence, itoken, value);
        });
    }

    /**
     * Deletes the token from the sentence.
     * @param itoken The index of the token
     */
    deleteToken(isentence: number, itoken: number) {
        this.storedContent().forEach((store: AbstractStore) => {
            store.deleteToken(isentence, itoken);
        });
    }
    // **** Tokens operations END ***

    /**
     * Adds a new entry into the Store
     * @param annotation the annotation
     * @param content the content
     */
    private addAnnotationStore(annotation: string, content?: any[]) {
        if (annotation === Annotation.conllu) {
            this.store[annotation] = new ConlluService(content);
        }
        if (annotation === Annotation.ner) {
            this.store[annotation] = new NerService(content);
        }
        if (annotation === Annotation.nerPlusPlus) {
            this.store[annotation] = new NerPlusPlusService(content);
        }
        if (annotation === Annotation.raw) {
            this.store[annotation] = new RawService(content);
        }
    }

    /**
     * Returns the stored content
     */
    private storedContent(): AbstractStore[] {
        return Object.values(this.store);
    }
}
