import { Injectable } from '@angular/core';
import { StoreService } from '../store.service';

/**
 * Service inside Adjust Module scope.
 * Allows to add, remove and modify sentences and tokens in the raw content from the store
 */
@Injectable()
export class AdjustorService {

  constructor(private storeService: StoreService) { }

  get isentence() { return this.storeService.index; }

  /**
   * The array of sentences
   */
  getSentences(): string[][] {
    if (this.storeService.nbSentences < 3) {
      return this.storeService.rawContent;
    }
    if (this.storeService.index === 0) {
      return [
        this.storeService.rawContent[this.storeService.index],
        this.storeService.rawContent[this.storeService.index + 1],
        this.storeService.rawContent[this.storeService.index + 2]
      ];
    }
    if (this.storeService.index === this.storeService.nbSentences) {
      return [
        this.storeService.rawContent[this.storeService.index - 1],
        this.storeService.rawContent[this.storeService.index]
      ];
    }
    return [
      this.storeService.rawContent[this.storeService.index - 1],
      this.storeService.rawContent[this.storeService.index],
      this.storeService.rawContent[this.storeService.index + 1]
    ];
  }

  /**
   * Duplicates the sentence at the given index.
   * The duplication is index + 1.
   * @param isentence The index of the sentence
   */
  duplicateSentence(isentence: number) {
    this.storeService.rawContent.splice(isentence, 0, this.storeService.rawContent[isentence]);
  }

  /**
   * Deletes the entire sentence from the array.
   * @param isentence The index of the sentence
   */
  deleteSentence(isentence: number) {
    this.storeService.rawContent.splice(isentence, 1);
  }

  /**
   * Adds a new empty sentence before the given index.
   * @param isentence The index of the sentence
   */
  newSentenceBefore(isentence: number) {
    this.storeService.rawContent.splice(isentence, 0, ['~']);
  }

  /**
   * Adds a new empty sentence after the given index.
   * @param isentence The index of the sentence
   */
  newSentenceAfter(isentence: number) {
    this.storeService.rawContent.splice(isentence + 1, 0, ['~']);
  }

  /**
   * Duplicates the token at the given index in the given sentence.
   * @param isentence The index of the sentence
   * @param itoken The index of the token
   */
  duplicateToken(isentence: number, itoken: number) {
    const token = this.storeService.rawContent[isentence][itoken];
    this.storeService.rawContent[isentence].splice(itoken, 0, token);
  }

  /**
   * Adds a new empty token before the given index.
   * @param isentence The index of the sentence
   * @param itoken The index of the token
   */
  newTokenBefore(isentence: number, itoken: number) {
    this.storeService.rawContent[isentence].splice(itoken, 0, '~');
  }

  /**
   * Adds a new empty token after the given index.
   * @param isentence The index of the sentence
   * @param itoken The index of the token
   */
  newTokenAfter(isentence: number, itoken: number) {
    this.storeService.rawContent[isentence].splice(itoken + 1, 0, '~');
  }

  /**
   * Changes the value of the token.
   * @param isentence The index of the sentence
   * @param itoken The index of the token
   * @param value The new value
   */
  editToken(isentence: number, itoken: number, value: string) {
    this.storeService.rawContent[isentence].splice(itoken, 1, value);
  }

  /**
   * Deletes the token from the sentence.
   * @param isentence The index of the sentence
   * @param itoken The index of the token
   */
  deleteToken(isentence: number, itoken: number) {
    this.storeService.rawContent[isentence].splice(itoken, 1);
    if (this.storeService.rawContent[isentence].length === 0) {
      this.deleteSentence(isentence);
    }
  }

  push() {
  }
}
