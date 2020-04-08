import { Injectable } from '@angular/core';
import { Annotation, Language } from '../annotations/annotations';
import { Conllu } from '../annotations/conllu/conllu.service';
import { HttpClient } from '@angular/common/http';
import { Conllx } from '../annotations/conllx/conllx.service';
import { Ner } from '../annotations/ner/ner.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InjectionService implements AdjustmentService {

  lang: string;
  annotation: string;
  sentences2: string[][];
  private parser: IParser;
  private isInProgress: Subject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private conlluService: Conllu, private conllxService: Conllx, private nerService: Ner) { }

  injectContent(lang: string, annotation: string, content: string): Observable<boolean> {
    this.lang = lang;
    this.annotation = annotation;

    switch (annotation) {
      case Annotation.conllu:
        this.parser = this.conlluService;
        break;
      case Annotation.conllx:
        this.parser = this.conllxService;
        break;
      case Annotation.ner:
        this.parser = this.nerService;
        break;
      case Annotation.raw:
        this.parser = new Raw();
        break;
      default:
        throw this.assertAnnotationType(annotation);
    }

    // New Behaviour might have been destroyed by an unsubscribing
    this.isInProgress = new BehaviorSubject(true);

    // Parsing warpped in a promise
    // Once done the isInProgress subject completes and unsubscribe
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      this.parser.sentences = this.parse(content);

      if (this.parser.sentences.length === 0) {
        reject(new Error('Parsing has been asked to be stopped'));
      }
      resolve(true);
    });

    promise
      .then(_ => {
        this.isInProgress.complete();
      })
      .catch((error) => {
        this.isInProgress.error(error);
      })
      .finally(() => {
        this.isInProgress.unsubscribe();
      });

    return this.isInProgress.asObservable();
  }

  /**
   * Cancel the injection of the data
   */
  cancelContentInjection() {
    this.isInProgress.unsubscribe();
    this.parser.sentences = [];
  }

  private assertAnnotationType(annotation: string): never {
    throw new Error(`Annotation type '${annotation}' not recognized`);
  }

  sentences() {
    return this.parser.sentences;
  }

  tokens() {
    return this.parser.tokens();
  }

  /**
   * Parses the content according to the right parser
   * @param content The content to parse
   */
  private parse(content: string) {
    // Parsing algo
    // Split into array of sentences
    // Split into array of tokens
    // Split into tokens and annotations
    return content.split(this.parser.splitPattern)
      .map(sent => sent.split(/\n/)
        .filter(line => !line.trim().match(this.parser.ignoreLinePattern))
        .map(line => line.trim().split(this.parser.tokenPattern))
        .filter(tab => tab[0].length > 0)
        .map(line => this.parser.ofToken(line))
      );
  }

  duplicateSent(isent: number) {
    this.sentences2.splice(isent, 0, this.sentences2[isent]);

  }
  deleteSent(isent: number) {
    this.sentences2.splice(isent, 1);
  }
  newAbove(isent: number) {
    this.sentences2.splice(isent, 0, ['~']);
  }
  newBelow(isent: number) {
    this.sentences2.splice(isent + 1, 0, ['~']);
  }

  duplicateTok(isent: number, itok: number) {
    const token = this.sentences2[isent][itok];
    this.sentences2[isent].splice(itok, 0, token);
  }

  newLeft(isent: number, itok: number) {
    this.sentences2[isent].splice(itok, 0, '~');
  }

  newRight(isent: number, itok: number) {
    this.sentences2[isent].splice(itok + 1, 0, '~');
  }

  changeValue(isent: number, itok: number, value: string) {
    this.sentences2[isent].splice(itok, 1, value);
  }

  deleteTok(isent: number, itok: number) {
    console.log(this.sentences2[isent]);

    this.sentences2[isent].splice(itok, 1);
    if (this.sentences2[isent].length === 0) {
      this.deleteSent(isent);
    }
  }

}

/**
 * Defines the methods parsers should implement to be used in this service
 */
export interface IParser {

  annotation: Annotation;
  sentences: any[][];
  /**
   * The pattern to split sentences on
   */
  splitPattern: RegExp;
  /**
   * The pattern to split tokens on
   */
  tokenPattern: RegExp;
  /**
   * The pattern to ignore lines
   */
  ignoreLinePattern: RegExp;

  /**
   * Returns the tokens only
   */
  tokens(): string[][];

  /**
   * Builds an Anootation Token
   * @param tokenAndAnnotation the split array containing a token and its annotations
   */
  ofToken(tokenAndAnnotation: string[]): any;
}

/**
 * Used by this Injection service to split and tokenise the content
 * in case of Raw content.
 * Since it isn't a proper annotation it behaves a little differently
 */
export class Raw implements IParser {
  annotation: Annotation.raw;
  private privateSentences: any = [];
  stopInjecting: boolean;

  splitPattern: RegExp = new RegExp(/\n/);
  tokenPattern: RegExp = new RegExp(/\s/);
  ignoreLinePattern: RegExp = new RegExp('#');

  constructor() { }

  get sentences(): string[][] {
    return Array.from(this.privateSentences.filter((tab: string[][]) => tab.length > 0).map((tab: string[][]) => tab[0]));
  }

  set sentences(sentences: string[][]) {
    this.privateSentences = sentences;
  }
  // TODO Needs to be fixed for async call
  tokens(): string[][] {
    return this.sentences;
  }

  ofToken(tokenAndAnnotation: string[]): string[] {
    return tokenAndAnnotation;
  }
}


export interface AdjustmentService {

  duplicateSent(isent: number);
  deleteSent(isent: number);
  newAbove(isent: number);
  newBelow(isent: number);

  duplicateTok(isent: number, itok: number);

  newLeft(isent: number, itok: number);

  newRight(isent: number, itok: number);

  changeValue(isent: number, itok: number, value: string);

  deleteTok(isent: number, itok: number);
}
