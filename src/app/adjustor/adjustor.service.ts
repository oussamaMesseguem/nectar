import { Injectable } from '@angular/core';
import { StoreService } from '../store.service';
import { Annotation } from '../annotators/annotations';

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
        this.storeService.store[Annotation.raw][this.storeService.index + 1]
      ];
    }
    if (this.storeService.index === this.storeService.nbSentences) {
      return [
        this.storeService.store[Annotation.raw][this.storeService.index - 1],
        []
      ];
    }
    return [
      this.storeService.store[Annotation.raw][this.storeService.index - 1],
      this.storeService.store[Annotation.raw][this.storeService.index + 1]
    ];
  }

  // **** Sentences operations START ****
  /**
   * Deletes the entire sentence from the array.
   */
  deleteSentence() {
    this.storeService.keys().forEach(annotation => {
      this.storeService.store[annotation].splice(this.storeService.index, 1);
    });
    this.storeService.sentence$.next(this.storeService.store[this.storeService.annotation][this.storeService.index]);
  }

  /**
   * Duplicates the sentence at the given index.
   * The duplication is index + 1.
   */
  duplicateSentence() {
    this.storeService.keys().forEach(annotation => {
      const value = this.storeService.store[annotation][this.storeService.index];
      this.storeService.store[annotation].splice(this.storeService.index, 0, value);
    });
    this.storeService.sentence$.next(this.storeService.store[this.storeService.annotation][this.storeService.index]);
  }

  /**
   * Adds a new empty sentence after the given index.
   */
  newSentenceAfter() {
    this.storeService.keys().forEach(annotation => {
      this.storeService.store[annotation].splice(this.storeService.index + 1, 0, [this.storeService.createToken(annotation, '~', 0)]);
    });
    this.storeService.sentence$.next(this.storeService.store[this.storeService.annotation][this.storeService.index]);
  }

  /**
   * Adds a new empty sentence before the given index.
   * @param isentence The index of the sentence
   */
  newSentenceBefore() {
    this.storeService.keys().forEach(annotation => {
      this.storeService.store[annotation].splice(this.storeService.index, 0, [this.storeService.createToken(annotation, '~', 0)]);
    });
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
    this.storeService.keys().forEach(annotation => {
      const token = this.storeService.store[annotation][this.storeService.index][itoken];
      this.storeService.store[annotation][this.storeService.index].splice(itoken, 0, token);
    });
    this.storeService.sentence$.next(this.storeService.store[this.storeService.annotation][this.storeService.index]);
  }

  /**
   * Adds a new empty token before the given index.
   * @param itoken The index of the token
   */
  newTokenBefore(itoken: number) {
    this.storeService.keys().forEach(annotation => {
      this.storeService.store[annotation][this.storeService.index].splice(
        itoken, 0, this.storeService.createToken(annotation, '~', itoken));
    });
    this.storeService.sentence$.next(this.storeService.store[this.storeService.annotation][this.storeService.index]);
  }

  /**
   * Adds a new empty token after the given index.
   * @param itoken The index of the token
   */
  newTokenAfter(itoken: number) {
    this.storeService.keys().forEach(annotation => {
      this.storeService.store[annotation][this.storeService.index].splice(
        itoken + 1, 0, this.storeService.createToken(annotation, '~', itoken));
    });
    this.storeService.sentence$.next(this.storeService.store[this.storeService.annotation][this.storeService.index]);
  }

  /**
   * Changes the value of the token.
   * @param itoken The index of the token
   * @param value The new value
   */
  editToken(itoken: number, value: string) {
    this.storeService.keys().forEach(annotation => {
      this.storeService.store[annotation][this.storeService.index].splice(
        itoken, 1, this.storeService.createToken(annotation, value, itoken));
    });
    this.storeService.sentence$.next(this.storeService.store[this.storeService.annotation][this.storeService.index]);
  }

  /**
   * Deletes the token from the sentence.
   * @param itoken The index of the token
   */
  deleteToken(itoken: number) {
    let shouldDeleteSentence = false;
    this.storeService.keys().forEach(annotation => {
      this.storeService.store[annotation][this.storeService.index].splice(itoken, 1);
      // Because: if the sentence doesn't have any token, it no longer needed.
      if (this.storeService.store[annotation][this.storeService.index].length === 0) {
        shouldDeleteSentence = true;
      }
    });
    // Because: need to delete the sentence and move the subject after the deletion
    // otherwise move the subject now.
    if (shouldDeleteSentence) {
      this.deleteSentence();
    } else {
      this.storeService.sentence$.next(this.storeService.store[this.storeService.annotation][this.storeService.index]);
    }
  }
  // **** Tokens operations END ***

}
