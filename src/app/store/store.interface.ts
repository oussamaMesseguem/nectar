/**
 * Storable interface makes annotations open to operations
 * such as adding, removing and duplicating sentences and tokens
 */
export interface Storable {
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
}
