import { Annotation, AnnotationType } from '../annotators/annotations';

/**
 * Storable interface makes annotations open to operations
 * such as adding, removing and duplicating sentences and tokens
 */
export interface Storable {
    /**
     * The annotation.
     */
    annotation: Annotation;
    content: any[][];
    /**
     * The annotations and properties to match on.
     */
    observers: Partial<{ [key in AnnotationType]: Matchable }>;
    /**
     * Deletes the entire sentence from the array.
     * @param isentence The index of the sentence
     */
    deleteSentence(isentence: number): void;

    /**
     * Duplicates the sentence at the given index.
     * The duplication should be index + 1.
     * @param isentence The index of the sentence
     */
    duplicateSentence(isentence: number): void;

    /**
     * Adds a new empty sentence after the given index.
     * @param isentence The index of the sentence
     */
    newSentenceAfter(isentence: number): void;

    /**
     * Adds a new empty sentence before the given index.
     * @param isentence The index of the sentence
     */
    newSentenceBefore(isentence: number): void;
    // **** Sentences operations END ****

    // **** Tokens operations START ****
    /**
     * Deletes the token from the sentence.
     * @param isentence The index of the sentence
     * @param itoken The index of the token
     */
    deleteToken(isentence: number, itoken: number): void;

    /**
     * Duplicates the token at the given index in the given sentence.
     * @param isentence The index of the sentence
     * @param itoken The index of the token
     */
    duplicateToken(isentence: number, itoken: number): void;

    /**
     * Changes the value of the token.
     * @param isentence The index of the sentence
     * @param itoken The index of the token
     * @param value The new value
     */
    editToken(isentence: number, itoken: number, value: string): void;

    /**
     * Adds a new empty token before the given index.
     * @param isentence The index of the sentence
     * @param itoken The index of the token
     */
    newTokenBefore(isentence: number, itoken: number): void;

    /**
     * Adds a new empty token after the given index.
     * @param isentence The index of the sentence
     * @param itoken The index of the token
     */
    newTokenAfter(isentence: number, itoken: number): void;

    /**
     * Updates other annotations with which they share same properties.
     * @param annotation The annotation from where an update has been done
     * @param isentence The sentence index
     * @param itoken The token index
     * @param token The new value
     */
    update(annotation: string, isentence: number, itoken: number, token: any): void;
}

/**
 * Utility to make the update easier.
 * One Matchable per annotation to match some properties.
 */
export class Matchable {

    /**
     * The properties to match on
     */
    properties: Property[];

    constructor() {
        this.properties = [];
    }

    /**
     * If the value is not to be ignored, it gets copied from the source to the target
     * @param propertyFrom The property that belongs to the source annotation
     * @param propertyTo The property that belongs to the target annotation
     * @param ignored The values to ignore
     */
    add(propertyFrom: string, propertyTo: string, ignored: string[]): Matchable {
        this.properties.push(new Property(propertyFrom, propertyTo, ignored));
        return this;
    }
}

/**
 * Wrappes the source and target properties as well as the ignored values.
 */
export class Property {
    ignored: string[];
    propertyFrom: string;
    propertyTo: string;

    constructor(propertyFrom: string, propertyTo: string, ignored: string[]) {
        this.propertyFrom = propertyFrom;
        this.propertyTo = propertyTo;
        this.ignored = ignored;
    }
}
