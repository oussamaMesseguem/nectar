import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { Annotation, Tokenable } from '../annotators/annotations';

/**
 * Service inside Adjust Module scope.
 * Allows to add, remove and modify sentences and tokens in the raw content from the store
 */
@Injectable()
export class AdjustorService {

  constructor(private storeService: StoreService) { }

  /**
   * Return the previous and the next sentence of the current one.
   */
  getPreviousAndNextSentences(): Tokenable[][] {
    if (this.storeService.index === 0) {
      return [
        [],
        this.storeService.store.getSentence(Annotation.raw, this.storeService.index + 1)
      ];
    }
    if (this.storeService.index === this.storeService.nbSentences) {
      return [
        this.storeService.store.getSentence(Annotation.raw, this.storeService.index - 1),
        []
      ];
    }
    return [
      this.storeService.store.getSentence(Annotation.raw, this.storeService.index - 1),
      this.storeService.store.getSentence(Annotation.raw, this.storeService.index + 1)
    ];
  }

  // **** Sentences operations START ****
  /**
   * Deletes the entire sentence from the array.
   */
  deleteSentence() {
    this.storeService.store.deleteSentence(this.storeService.index);
    this.storeService.next();
  }

  /**
   * Duplicates the sentence at the given index.
   * The duplication is index + 1.
   */
  duplicateSentence() {
    this.storeService.store.duplicateSentence(this.storeService.index);
    this.storeService.next();
  }

  /**
   * Adds a new empty sentence after the given index.
   */
  newSentenceAfter() {
    this.storeService.store.newSentenceAfter(this.storeService.index);
    this.storeService.next();
  }

  /**
   * Adds a new empty sentence before the given index.
   * @param isentence The index of the sentence
   */
  newSentenceBefore() {
    this.storeService.store.newSentenceBefore(this.storeService.index);
    // Needs to stay on the current sentence for that index should increment
    this.storeService.index = this.storeService.index + 1;
  }
  // **** Sentences operations END ****

  // **** Tokens operations START ****
  /**
   * Duplicates the token at the given index in the given sentence.
   * @param itoken The index of the token
   */
  duplicateToken(itoken: number) {
    this.storeService.store.duplicateToken(this.storeService.index, itoken);
    this.storeService.next();
  }

  /**
   * Adds a new empty token before the given index.
   * @param itoken The index of the token
   */
  newTokenBefore(itoken: number) {
    this.storeService.store.newTokenBefore(this.storeService.index, itoken);
    this.storeService.next();
  }

  /**
   * Adds a new empty token after the given index.
   * @param itoken The index of the token
   */
  newTokenAfter(itoken: number) {
    this.storeService.store.newTokenAfter(this.storeService.index, itoken);
    this.storeService.next();
  }

  /**
   * Changes the value of the token.
   * @param itoken The index of the token
   * @param value The new value
   */
  editToken(itoken: number, value: string) {
    this.storeService.store.editToken(this.storeService.index, itoken, value);
    this.storeService.next();
  }

  /**
   * Deletes the token from the sentence.
   * @param itoken The index of the token
   */
  deleteToken(itoken: number) {
    this.storeService.store.deleteToken(this.storeService.index, itoken);
    this.storeService.next();
  }
  // **** Tokens operations END ***

}
