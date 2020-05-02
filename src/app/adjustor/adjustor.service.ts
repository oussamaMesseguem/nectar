import { Injectable } from '@angular/core';
import { StoreService } from '../store.service';

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
  getPreviousAndNextSentences(): string[][] {
    if (this.storeService.index === 0) {
      return [
        [],
        this.storeService.rawContent[this.storeService.index + 1]
      ];
    }
    if (this.storeService.index === this.storeService.nbSentences) {
      return [
        this.storeService.rawContent[this.storeService.index - 1],
        []
      ];
    }
    return [
      this.storeService.rawContent[this.storeService.index - 1],
      this.storeService.rawContent[this.storeService.index + 1]
    ];
  }

  /**
   * Deletes the entire sentence from the array.
   */
  deleteSentence() {
    this.storeService.deleteSentence();
  }

  /**
   * Duplicates the sentence at the given index.
   * The duplication is index + 1.
   */
  duplicateSentence() {
    this.storeService.duplicateSentence();
  }

  /**
   * Adds a new empty sentence after the given index.
   */
  newSentenceAfter() {
    this.storeService.newSentenceAfter();
  }

  /**
   * Adds a new empty sentence before the given index.
   */
  newSentenceBefore() {
    this.storeService.newSentenceBefore();
  }


  /**
   * Duplicates the token at the given index in the given sentence.
   * @param itoken The index of the token
   */
  duplicateToken(itoken: number) {
    const token = this.storeService.sentence$.value[itoken];
    this.storeService.sentence$.value.splice(itoken, 0, token);
  }

  /**
   * Adds a new empty token before the given index.
   * @param itoken The index of the token
   */
  newTokenBefore(itoken: number) {
    this.storeService.sentence$.value.splice(itoken, 0, '~');
  }

  /**
   * Adds a new empty token after the given index.
   * @param itoken The index of the token
   */
  newTokenAfter(itoken: number) {
    this.storeService.sentence$.value.splice(itoken + 1, 0, '~');
  }

  /**
   * Changes the value of the token.
   * @param itoken The index of the token
   * @param value The new value
   */
  editToken(itoken: number, value: string) {
    this.storeService.sentence$.value.splice(itoken, 1, value);
  }

  /**
   * Deletes the token from the sentence.
   * @param itoken The index of the token
   */
  deleteToken(itoken: number) {
    this.storeService.sentence$.value.splice(itoken, 1);
    // if (this.storeService.rawContent[isentence].length === 0) {
    //   this.deleteSentence(isentence);
    // }
  }

  push() {
  }
}
