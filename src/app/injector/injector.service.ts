import { Injectable } from '@angular/core';
import { Annotation, Language } from '../annotators/annotations';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ConlluParser } from '../annotators/conllu/conllu.model';
import { StoreService } from '../store.service';
import { NerParser, NerToken } from '../annotators/ner/ner.model';

@Injectable()
export class InjectorService {

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
        // const response: CoreNLPResponse = await this.corenlp(content);
        // const r = response.sentences.map((sent: CoreNLPSentence) => sent.tokens.map((tok: CoreNLPToken) => tok.originalText));
        // console.log(r);
        // r[0].splice(0, 6);
        // const lastPosition = r[r.length - 1].length;
        // r[r.length - 1].splice(lastPosition - 2, 2);
        // console.log(r);
        const r = nerSents.map(s => s.map(t => t.token));
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
    this.storeService.reset();
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
  annotation = Annotation.raw;
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

const nerSents: NerToken[][] = [
    [
        {

            token: 'Baisse',
            tag: '',
            type: ''
        },
        {

            token: 'des',
            tag: '',
            type: ''
        },
        {

            token: 'prix',
            tag: '',
            type: ''
        },
        {

            token: 'en',
            tag: '',
            type: ''
        },
        {

            token: 'Grande',
            tag: '',
            type: ''
        },
        {

            token: '-',
            tag: '',
            type: ''
        },
        {

            token: 'Bretagne',
            tag: '',
            type: ''
        },
        {

            token: ':',
            tag: '',
            type: ''
        },
        {

            token: 'en',
            tag: '',
            type: ''
        },
        {

            token: 'novembre',
            tag: '',
            type: ''
        },
        {

            token: ',',
            tag: '',
            type: ''
        },
        {

            token: 'les',
            tag: '',
            type: ''
        },
        {

            token: 'prix',
            tag: '',
            type: ''
        },
        {

            token: 'ont',
            tag: '',
            type: ''
        },
        {

            token: 'baissé',
            tag: '',
            type: ''
        },
        {

            token: 'de',
            tag: '',
            type: ''
        },
        {

            token: '0',
            tag: '',
            type: ''
        },
        {

            token: ',',
            tag: '',
            type: ''
        },
        {

            token: '1',
            tag: '',
            type: ''
        },
        {

            token: '%',
            tag: '',
            type: ''
        },
        {

            token: ',',
            tag: '',
            type: ''
        },
        {

            token: 'annonce',
            tag: '',
            type: ''
        },
        {

            token: 'l\'',
            tag: '',
            type: ''
        },
        {

            token: 'office',
            tag: '',
            type: ''
        },
        {

            token: 'des',
            tag: '',
            type: ''
        },
        {

            token: 'statistiques',
            tag: '',
            type: ''
        },
        {

            token: 'le',
            tag: '',
            type: ''
        },
        {

            token: '11',
            tag: '',
            type: ''
        },
        {

            token: 'décembre',
            tag: '',
            type: ''
        },
        {

            token: '.',
            tag: '',
            type: ''
        }
    ],
    [
        {

            token: 'Signe',
            tag: '',
            type: ''
        },
        {

            token: 'des',
            tag: '',
            type: ''
        },
        {

            token: 'temps',
            tag: '',
            type: ''
        },
        {

            token: ':',
            tag: '',
            type: ''
        },
        {

            token: 'la',
            tag: '',
            type: ''
        },
        {

            token: 'très',
            tag: '',
            type: ''
        },
        {

            token: 'britannique',
            tag: '',
            type: ''
        },
        {

            token: 'banque',
            tag: '',
            type: ''
        },
        {

            token: 'd\'',
            tag: '',
            type: ''
        },
        {

            token: 'affaires',
            tag: '',
            type: ''
        },
        {

            token: 'et',
            tag: '',
            type: ''
        },
        {

            token: 'de',
            tag: '',
            type: ''
        },
        {

            token: 'marché', tag: '',
            type: ''
        },
        {

            token: 'vient', tag: '',
            type: ''
        },
        {

            token: 'd\'', tag: '',
            type: ''

        },
        {

            token: 'acheter', tag: '',
            type: ''

        },
        {

            token: 'un', tag: '',
            type: ''

        },
        {

            token: 'siège', tag: '',
            type: ''

        },
        {

            token: 'à',
            tag: '',
            type: ''
        },
        {

            token: 'la',
            tag: '',
            type: ''

        },
        {

            token: 'Bourse',
            tag: '',
            type: ''
        },
        {

            token: 'de',
            tag: '',
            type: ''
        },
        {

            token: 'Paris',
            tag: '',
            type: ''
        },
        {

            token: '.',
            tag: '',
            type: ''
        }
    ],
    [
        {

            token: 'Comme',
            tag: '',
            type: ''
        },
        {

            token: 'le',
            tag: '',
            type: ''
        },
        {

            token: 'déplore',
            tag: '',
            type: ''
        },
        {

            token: 'le',
            tag: '',
            type: ''
        },
        {

            token: 'quotidien',
            tag: '',
            type: ''
        },
        {

            token: 'financier',
            tag: '',
            type: ''
        },
        {

            token: ',',
            tag: '',
            type: ''
        },
        {

            token: 'on',
            tag: '',
            type: ''
        },
        {

            token: 'est',
            tag: '',
            type: ''
        },
        {

            token: 'bien',
            tag: '',
            type: ''
        },
        {

            token: 'loin',
            tag: '',
            type: ''
        },
        {

            token: 'des',
            tag: '',
            type: ''
        },
        {

            token: 'quatre',
            tag: '',
            type: ''
        },
        {

            token: '-',
            tag: '',
            type: ''
        },
        {

            token: 'vingt',
            tag: '',
            type: ''
        },
        {

            token: '-',
            tag: '',
            type: ''
        },
        {

            token: 'deux',
            tag: '',
            type: ''
        },
        {

            token: 'admissions',
            tag: '',
            type: ''
        },
        {

            token: 'enregistrées',
            tag: '',
            type: ''
        },
        {

            token: 'au',
            tag: '',
            type: ''
        },
        {

            token: 'cours',
            tag: '',
            type: ''
        },
        {

            token: 'de',
            tag: '',
            type: ''
        },
        {

            token: 'l\'',
            tag: '',
            type: ''
        },
        {

            token: 'année',
            tag: '',
            type: ''
        },
        {

            token: '1987',
            tag: '',
            type: ''
        },
        {

            token: '.', tag: '',
            type: ''
        }
    ],
    [
        {

            token: 'Baisse',
            tag: '',
            type: ''
        },
        {

            token: 'des',
            tag: '',
            type: ''
        },
        {

            token: 'prix',
            tag: '',
            type: ''
        },
        {

            token: 'en',
            tag: '',
            type: ''
        },
        {

            token: 'Grande',
            tag: '',
            type: ''
        },
        {

            token: '-',
            tag: '',
            type: ''
        },
        {

            token: 'Bretagne',
            tag: '',
            type: ''
        },
        {

            token: ':',
            tag: '',
            type: ''
        },
        {

            token: 'en',
            tag: '',
            type: ''
        },
        {

            token: 'novembre',
            tag: '',
            type: ''
        },
        {

            token: ',',
            tag: '',
            type: ''
        },
        {

            token: 'les',
            tag: '',
            type: ''
        },
        {

            token: 'prix',
            tag: '',
            type: ''
        },
        {

            token: 'ont',
            tag: '',
            type: ''
        },
        {

            token: 'baissé',
            tag: '',
            type: ''
        },
        {

            token: 'de',
            tag: '',
            type: ''
        },
        {

            token: '0',
            tag: '',
            type: ''
        },
        {

            token: ',',
            tag: '',
            type: ''
        },
        {

            token: '1',
            tag: '',
            type: ''
        },
        {

            token: '%',
            tag: '',
            type: ''
        },
        {

            token: ',',
            tag: '',
            type: ''
        },
        {

            token: 'annonce',
            tag: '',
            type: ''
        },
        {

            token: 'l\'',
            tag: '',
            type: ''
        },
        {

            token: 'office',
            tag: '',
            type: ''
        },
        {

            token: 'des',
            tag: '',
            type: ''
        },
        {

            token: 'statistiques',
            tag: '',
            type: ''
        },
        {

            token: 'le',
            tag: '',
            type: ''
        },
        {

            token: '11',
            tag: '',
            type: ''
        },
        {

            token: 'décembre',
            tag: '',
            type: ''
        },
        {

            token: '.',
            tag: '',
            type: ''
        }
    ],
    [
        {

            token: 'Signe',
            tag: '',
            type: ''
        },
        {

            token: 'des',
            tag: '',
            type: ''
        },
        {

            token: 'temps',
            tag: '',
            type: ''
        },
        {

            token: ':',
            tag: '',
            type: ''
        },
        {

            token: 'la',
            tag: '',
            type: ''
        },
        {

            token: 'très',
            tag: '',
            type: ''
        },
        {

            token: 'britannique',
            tag: '',
            type: ''
        },
        {

            token: 'banque',
            tag: '',
            type: ''
        },
        {

            token: 'd\'',
            tag: '',
            type: ''
        },
        {

            token: 'affaires',
            tag: '',
            type: ''
        },
        {

            token: 'et',
            tag: '',
            type: ''
        },
        {

            token: 'de',
            tag: '',
            type: ''
        },
        {

            token: 'marché', tag: '',
            type: ''
        },
        {

            token: 'vient', tag: '',
            type: ''
        },
        {

            token: 'd\'', tag: '',
            type: ''

        },
        {

            token: 'acheter', tag: '',
            type: ''

        },
        {

            token: 'un', tag: '',
            type: ''

        },
        {

            token: 'siège', tag: '',
            type: ''

        },
        {

            token: 'à',
            tag: '',
            type: ''
        },
        {

            token: 'la',
            tag: '',
            type: ''

        },
        {

            token: 'Bourse',
            tag: '',
            type: ''
        },
        {

            token: 'de',
            tag: '',
            type: ''
        },
        {

            token: 'Paris',
            tag: '',
            type: ''
        },
        {

            token: '.',
            tag: '',
            type: ''
        }
    ],
    [
        {

            token: 'Comme',
            tag: '',
            type: ''
        },
        {

            token: 'le',
            tag: '',
            type: ''
        },
        {

            token: 'déplore',
            tag: '',
            type: ''
        },
        {

            token: 'le',
            tag: '',
            type: ''
        },
        {

            token: 'quotidien',
            tag: '',
            type: ''
        },
        {

            token: 'financier',
            tag: '',
            type: ''
        },
        {

            token: ',',
            tag: '',
            type: ''
        },
        {

            token: 'on',
            tag: '',
            type: ''
        },
        {

            token: 'est',
            tag: '',
            type: ''
        },
        {

            token: 'bien',
            tag: '',
            type: ''
        },
        {

            token: 'loin',
            tag: '',
            type: ''
        },
        {

            token: 'des',
            tag: '',
            type: ''
        },
        {

            token: 'quatre',
            tag: '',
            type: ''
        },
        {

            token: '-',
            tag: '',
            type: ''
        },
        {

            token: 'vingt',
            tag: '',
            type: ''
        },
        {

            token: '-',
            tag: '',
            type: ''
        },
        {

            token: 'deux',
            tag: '',
            type: ''
        },
        {

            token: 'admissions',
            tag: '',
            type: ''
        },
        {

            token: 'enregistrées',
            tag: '',
            type: ''
        },
        {

            token: 'au',
            tag: '',
            type: ''
        },
        {

            token: 'cours',
            tag: '',
            type: ''
        },
        {

            token: 'de',
            tag: '',
            type: ''
        },
        {

            token: 'l\'',
            tag: '',
            type: ''
        },
        {

            token: 'année',
            tag: '',
            type: ''
        },
        {

            token: '1987',
            tag: '',
            type: ''
        },
        {

            token: '.', tag: '',
            type: ''
        }
    ]
];
