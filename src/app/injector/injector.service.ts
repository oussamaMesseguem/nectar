import { Injectable } from '@angular/core';
import { Annotation, Language } from '../annotators/annotations';
import { Conllu } from '../annotators/conllu/conllu.service';
import { HttpClient } from '@angular/common/http';
import { Conllx } from '../annotators/conllx/conllx.service';
import { Ner } from '../annotators/ner/ner.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InjectionService implements AdjustmentService {

  lang: string;
  annotation: string;
  sentences2: string[][] = [
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.']];
  private parser: IParser;
  private isInProgress: Subject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private conlluService: Conllu, private conllxService: Conllx, private nerService: Ner) { }

  injectContent(lang: string, annotation: string, content: string): Observable<boolean> {
    this.lang = lang;
    this.annotation = annotation;
    // New Behaviour might have been destroyed by an unsubscribing
    this.isInProgress = new BehaviorSubject(true);

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

    // Parsing warpped in a promise
    // Once done the isInProgress subject completes and unsubscribe
    const promise: Promise<boolean> = new Promise(async (resolve, reject) => {

      if (annotation === Annotation.raw) {
        const response: CoreNLPResponse = await this.corenlp(content);
        const r = response.sentences.map((sent: CoreNLPSentence) => sent.tokens.map((tok: CoreNLPToken) => tok.originalText));
        console.log(r);
        r[0].splice(0, 6);
        const lastPosition = r[r.length - 1].length;
        r[r.length - 1].splice(lastPosition - 2, 2);
        console.log(r);
        content = r.map(tab => tab.join('\n')).join('\n\n');

      }

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
    // return this.parser.sentences;
    return this.sentences2;
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

  private async corenlp(content: string): Promise<any> {
    return await this.http.post<any>(
      'https://cors-anywhere.herokuapp.com/http://corenlp.run/?properties={"annotators":"tokenize,ssplit","outputFormat":"json"}',
      { data: content }
    ).toPromise();
  }

  duplicateSent(isent: number) {
    this.sentences().splice(isent, 0, this.sentences()[isent]);

  }
  deleteSent(isent: number) {
    this.sentences().splice(isent, 1);
  }
  newAbove(isent: number) {
    this.sentences().splice(isent, 0, ['~']);
  }
  newBelow(isent: number) {
    this.sentences().splice(isent + 1, 0, ['~']);
  }

  duplicateTok(isent: number, itok: number) {
    const token = this.sentences()[isent][itok];
    this.sentences()[isent].splice(itok, 0, token);
  }

  newLeft(isent: number, itok: number) {
    this.sentences()[isent].splice(itok, 0, '~');
  }

  newRight(isent: number, itok: number) {
    this.sentences()[isent].splice(itok + 1, 0, '~');
  }

  edit(isent: number, itok: number, value: string) {
    this.sentences()[isent].splice(itok, 1, value);
  }

  deleteTok(isent: number, itok: number) {
    console.log(this.sentences()[isent]);

    this.sentences()[isent].splice(itok, 1);
    if (this.sentences()[isent].length === 0) {
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
  sentences: string[][] = [];
  stopInjecting: boolean;

  splitPattern: RegExp = new RegExp(/\n\s*\n/);
  tokenPattern: RegExp = new RegExp(/\s/);
  ignoreLinePattern: RegExp = new RegExp('#');

  constructor() { }

  // TODO Needs to be fixed for async call
  tokens(): string[][] {
    return this.sentences;
  }

  ofToken(tokenAndAnnotation: string[]): string {
    return tokenAndAnnotation[0];
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

  edit(isent: number, itok: number, value: string);

  deleteTok(isent: number, itok: number);
}


interface CoreNLPResponse {
  docDate: any;
  sentences: CoreNLPSentence[];
}
interface CoreNLPSentence {
  index: number;
  tokens: CoreNLPToken[];
}

interface CoreNLPToken {
  originalText: string;
}