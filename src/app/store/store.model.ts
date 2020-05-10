import { Annotation, AnnotationType, Tokenable } from '../annotators/annotations';
import { ConlluService } from '../annotators/conllu/conllu.service';
import { NerService } from '../annotators/ner/ner.service';
import { NerPlusPlusService } from '../annotators/ner++/nerPlusPlus.service';
import { RawService } from '../adjustor/raw.service';
import { Storable } from './store.interface';

/**
 * A class which stores different type of annotation store.
 */
export class Store {

    private store: Partial<{ [key in AnnotationType]: Storable }> = { };

    constructor() { }

    // **** Store Content START ****
    /**
     * Iterates through the raw content and inits new tokens according to the given annotation.
     * @param annotation The new annotation to add
     */
    addEntry(annotation: string) {
        if (!this.keys().includes(annotation)) {
            this.addAnnotationStore(annotation);
            this.store[annotation].from(this.store[Annotation.Raw].content);
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
        if (annotation !== Annotation.Raw) {
            const rawContent: Tokenable[][] = content.map(l => l.map(t => {
                return { token: t.token };
            }));
            this.addAnnotationStore(Annotation.Raw, rawContent);
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
        if (this.store[Annotation.Raw] !== undefined) {
            return this.store[Annotation.Raw].content.length;
        }
        return 0;
    }
    // **** Store Initialisation END ****

    // **** Sentences operations START ****
    /**
     * Deletes the entire sentence from the array.
     */
    deleteSentence(isentence: number) {
        this.storedContent().forEach((store: Storable) => {
            store.deleteSentence(isentence);
        });
    }

    /**
     * Duplicates the sentence at the given index.
     * The duplication is index + 1.
     */
    duplicateSentence(isentence: number) {
        this.storedContent().forEach((store: Storable) => {
            store.duplicateSentence(isentence);
        });
    }

    /**
     * Adds a new empty sentence after the given index.
     */
    newSentenceAfter(isentence: number) {
        this.storedContent().forEach((store: Storable) => {
            store.newSentenceAfter(isentence);
        });
    }

    /**
     * Adds a new empty sentence before the given index.
     * @param isentence The index of the sentence
     */
    newSentenceBefore(isentence: number) {
        this.storedContent().forEach((store: Storable) => {
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
        this.storedContent().forEach((store: Storable) => {
            store.duplicateToken(isentence, itoken);
        });
    }

    /**
     * Adds a new empty token before the given index.
     * @param itoken The index of the token
     */
    newTokenBefore(isentence: number, itoken: number) {
        this.storedContent().forEach((store: Storable) => {
            store.newTokenBefore(isentence, itoken);
        });
    }

    /**
     * Adds a new empty token after the given index.
     * @param itoken The index of the token
     */
    newTokenAfter(isentence: number, itoken: number) {
        this.storedContent().forEach((store: Storable) => {
            store.newTokenAfter(isentence, itoken);
        });
    }

    /**
     * Changes the value of the token.
     * @param itoken The index of the token
     * @param value The new value
     */
    editToken(isentence: number, itoken: number, value: string) {
        this.storedContent().forEach((store: Storable) => {
            store.editToken(isentence, itoken, value);
        });
    }

    /**
     * Deletes the token from the sentence.
     * @param itoken The index of the token
     */
    deleteToken(isentence: number, itoken: number) {
        this.storedContent().forEach((store: Storable) => {
            store.deleteToken(isentence, itoken);
        });
    }
    // **** Tokens operations END ***

    updateProperties(annotation: string, isentence: number, itoken: number, value: string) {
        // Filter Because no need to update self-annotation but only others
        this.storedContent().filter((store: Storable) => store.annotation !== annotation).forEach((store: Storable) => {
            Object.keys(store.observers).forEach(key => {
                // Because if the store doesn't contain the annotation, there is no need to update.
                if (this.keys().includes(key)) {
                    store.update(key, isentence, itoken, value);
                }
            });
        });
    }

    /**
     * Adds a new entry into the Store
     * @param annotation the annotation
     * @param content the content
     */
    private addAnnotationStore(annotation: string, content?: any[]) {
        if (annotation === Annotation['Conll-U']) {
            this.store[annotation] = new ConlluService(content);
        }
        if (annotation === Annotation.Ner) {
            this.store[annotation] = new NerService(content);
        }
        if (annotation === Annotation['Ner++']) {
            this.store[annotation] = new NerPlusPlusService(content);
        }
        if (annotation === Annotation.Raw) {
            this.store[annotation] = new RawService(content);
        }
    }

    /**
     * Returns the stored content
     */
    private storedContent(): Storable[] {
        return Object.values(this.store);
    }
}
