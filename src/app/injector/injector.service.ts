import { Injectable } from '@angular/core';
import { Annotation, Language } from '../annotators/annotations';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ConlluParser } from '../annotators/conllu/conllu.model';
import { StoreService } from '../store.service';
import { NerParser } from '../annotators/ner/ner.model';
import { ConllxParser } from '../annotators/conllx/conllx.model';

@Injectable()
export class InjectionService {

  lang: string;

  private parser: IParser;
  private isInProgress: Subject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private storeService: StoreService) { }

  injectContent(lang: string, annotation: string, content: string): Observable<boolean> {
    this.lang = lang;
    // New Behaviour might have been destroyed by an unsubscribing
    this.isInProgress = new BehaviorSubject(true);

    switch (annotation) {
      case Annotation.conllu:
        this.parser = new ConlluParser();
        break;
      case Annotation.conllx:
        this.parser = new ConllxParser();
        break;
      case Annotation.ner:
        this.parser = new NerParser();
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

      // Add new entry in the store
      const parsedContent = this.parse(content);
      this.storeService.addAnnotation(this.parser.annotation, parsedContent);

      if (this.storeService.nbSentences === 0) {
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
    this.storeService.removeAnnotation(this.parser.annotation);
  }

  private assertAnnotationType(annotation: string): never {
    throw new Error(`Annotation type '${annotation}' not recognized`);
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

}

/**
 * Defines the methods parsers should implement to be used in this service
 */
export interface IParser {

  annotation: Annotation;
  // sentences: any[][];
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
  // tokens(): string[][];

  /**
   * Builds an Anootation Token
   * @param value the split array containing a token and its annotations
   */
  ofToken(value: string[]): any;
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
