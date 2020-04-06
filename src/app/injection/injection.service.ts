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
export class InjectionService {

  lang: string;
  annotation: string;

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

    this.parser.cancelContentInjection(false);
    this.isInProgress.next(true);

    setTimeout(() => {
      this.parser.injectContent(content).then(_ => {
        this.isInProgress.complete();
      })
        .catch((error) => {
          this.isInProgress.error(error);
        })
        .finally(() => {
          this.isInProgress.unsubscribe();
        });
    }, 5000);


    return this.isInProgress.asObservable();
  }

  /**
   * Cancel the injection of the data
   */
  cancelContentInjection() {
    this.parser.cancelContentInjection(true);
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
}

/**
 * Defines the methods parsers should implement to be used in this service
 */
export interface IParser {

  annotation: Annotation;
  sentences: any[][];

  /**
   * Injects the content string into an associated object.
   * @param content the content itself as scheme
   */
  injectContent(content: string): Promise<boolean>;

  /***
   * Cancel the content injection
   * @param value whether the injection should stop
   */
  cancelContentInjection(value: boolean): void;

  tokens(): string[][];
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

  constructor() { }

  injectContent(content: string): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      content.split('\n')
        .filter(l => !l.startsWith('#'))
        .forEach((line: string) => {
          // A sentence has been parsed
          const sentence = line.trim().split(' ');
          this.sentences.push(sentence);
        });

      if (this.stopInjecting) {
        this.stopInjecting = false;
        reject(new Error('Parsing has been asked to be stopped'));
      }
      resolve(true);
    });

    return promise;
  }

  cancelContentInjection(value: boolean): void {
    this.stopInjecting = value;
  }

  tokens(): string[][] {
    return this.sentences;
  }
}
