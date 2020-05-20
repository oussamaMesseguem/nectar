import { Injectable } from '@angular/core';
import { Annotation, Language } from '../annotators/annotations';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ConlluService } from '../annotators/conllu/conllu.service';
import { StoreService } from '../store/store.service';
import { NerToken } from '../annotators/ner/ner.model';
import { NerService } from '../annotators/ner/ner.service';
import { RawService } from '../adjustor/raw.service';

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
            case Annotation['Conll-U']:
                this.parser = new ConlluService();
                break;
            case Annotation.Ner:
                this.parser = new NerService();
                break;
            case Annotation.Raw:
                this.parser = new RawService();
                break;
            default:
                throw this.assertAnnotationType(annotation);
        }

        // Parsing warpped in a promise
        // Once done the isInProgress subject completes and unsubscribe
        const promise: Promise<boolean> = new Promise(async (resolve, reject) => {

            if (annotation === Annotation.Raw) {
                const rawParser = this.parser as RawService;
                content = await rawParser.split(this.http, content, lang);
            }

            // Add new entry in the store
            const parsedContent = this.parse(content);
            this.storeService.initStore(this.parser.annotation, parsedContent);

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
            .map(sent => sent.split(this.parser.tokenPattern)
                .filter(line => !line.trim().match(this.parser.ignoreLinePattern))
                .map(line => line.trim().split(this.parser.elementsPattern))
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
    
    content: any[][];
    /**
     * The pattern to split sentences on
     */
    splitPattern: RegExp;
    /**
     * The pattern to split tokens on
     */
    tokenPattern: RegExp;
    /**
     * The pattern to split elements on
     */
    elementsPattern: RegExp;
    /**
     * The pattern to ignore lines
     */
    ignoreLinePattern: RegExp;
    /**
     * Builds an Annotation Token
     * @param value the split array containing a token and its annotations
     */
    ofToken(value: string[]): any;
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
            label: 'O',

        },
        {

            token: 'des',
            label: 'O',

        },
        {

            token: 'prix',
            label: 'O',

        },
        {

            token: 'en',
            label: 'O',

        },
        {

            token: 'Grande',
            label: 'O',

        },
        {

            token: '-',
            label: 'O',

        },
        {

            token: 'Bretagne',
            label: 'O',

        },
        {

            token: ':',
            label: 'O',

        },
        {

            token: 'en',
            label: 'O',

        },
        {

            token: 'novembre',
            label: 'O',

        },
        {

            token: ',',
            label: 'O',

        },
        {

            token: 'les',
            label: 'O',

        },
        {

            token: 'prix',
            label: 'O',

        },
        {

            token: 'ont',
            label: 'O',

        },
        {

            token: 'baissé',
            label: 'O',

        },
        {

            token: 'de',
            label: 'O',

        },
        {

            token: '0',
            label: 'O',

        },
        {

            token: ',',
            label: 'O',

        },
        {

            token: '1',
            label: 'O',

        },
        {

            token: '%',
            label: 'O',

        },
        {

            token: ',',
            label: 'O',

        },
        {

            token: 'annonce',
            label: 'O',

        },
        {

            token: 'l\'',
            label: 'O',

        },
        {

            token: 'office',
            label: 'O',

        },
        {

            token: 'des',
            label: 'O',

        },
        {

            token: 'statistiques',
            label: 'O',

        },
        {

            token: 'le',
            label: 'O',

        },
        {

            token: '11',
            label: 'O',

        },
        {

            token: 'décembre',
            label: 'O',

        },
        {

            token: '.',
            label: 'O',

        }
    ],
    [
        {

            token: 'Signe',
            label: 'O',

        },
        {

            token: 'des',
            label: 'O',

        },
        {

            token: 'temps',
            label: 'O',

        },
        {

            token: ':',
            label: 'O',

        },
        {

            token: 'la',
            label: 'O',

        },
        {

            token: 'très',
            label: 'O',

        },
        {

            token: 'britannique',
            label: 'O',

        },
        {

            token: 'banque',
            label: 'O',

        },
        {

            token: 'd\'',
            label: 'O',

        },
        {

            token: 'affaires',
            label: 'O',

        },
        {

            token: 'et',
            label: 'O',

        },
        {

            token: 'de',
            label: 'O',

        },
        {

            token: 'marché', label: 'O',

        },
        {

            token: 'vient', label: 'O',

        },
        {

            token: 'd\'', label: 'O',


        },
        {

            token: 'acheter', label: 'O',


        },
        {

            token: 'un', label: 'O',


        },
        {

            token: 'siège', label: 'O',


        },
        {

            token: 'à',
            label: 'O',

        },
        {

            token: 'la',
            label: 'O',


        },
        {

            token: 'Bourse',
            label: 'O',

        },
        {

            token: 'de',
            label: 'O',

        },
        {

            token: 'Paris',
            label: 'O',

        },
        {

            token: '.',
            label: 'O',

        }
    ],
    [
        {

            token: 'Comme',
            label: 'O',

        },
        {

            token: 'le',
            label: 'O',

        },
        {

            token: 'déplore',
            label: 'O',

        },
        {

            token: 'le',
            label: 'O',

        },
        {

            token: 'quotidien',
            label: 'O',

        },
        {

            token: 'financier',
            label: 'O',

        },
        {

            token: ',',
            label: 'O',

        },
        {

            token: 'on',
            label: 'O',

        },
        {

            token: 'est',
            label: 'O',

        },
        {

            token: 'bien',
            label: 'O',

        },
        {

            token: 'loin',
            label: 'O',

        },
        {

            token: 'des',
            label: 'O',

        },
        {

            token: 'quatre',
            label: 'O',

        },
        {

            token: '-',
            label: 'O',

        },
        {

            token: 'vingt',
            label: 'O',

        },
        {

            token: '-',
            label: 'O',

        },
        {

            token: 'deux',
            label: 'O',

        },
        {

            token: 'admissions',
            label: 'O',

        },
        {

            token: 'enregistrées',
            label: 'O',

        },
        {

            token: 'au',
            label: 'O',

        },
        {

            token: 'cours',
            label: 'O',

        },
        {

            token: 'de',
            label: 'O',

        },
        {

            token: 'l\'',
            label: 'O',

        },
        {

            token: 'année',
            label: 'O',

        },
        {

            token: '1987',
            label: 'O',

        },
        {

            token: '.', label: 'O',

        }
    ],
    [
        {

            token: 'Baisse',
            label: 'O',

        },
        {

            token: 'des',
            label: 'O',

        },
        {

            token: 'prix',
            label: 'O',

        },
        {

            token: 'en',
            label: 'O',

        },
        {

            token: 'Grande',
            label: 'O',

        },
        {

            token: '-',
            label: 'O',

        },
        {

            token: 'Bretagne',
            label: 'O',

        },
        {

            token: ':',
            label: 'O',

        },
        {

            token: 'en',
            label: 'O',

        },
        {

            token: 'novembre',
            label: 'O',

        },
        {

            token: ',',
            label: 'O',

        },
        {

            token: 'les',
            label: 'O',

        },
        {

            token: 'prix',
            label: 'O',

        },
        {

            token: 'ont',
            label: 'O',

        },
        {

            token: 'baissé',
            label: 'O',

        },
        {

            token: 'de',
            label: 'O',

        },
        {

            token: '0',
            label: 'O',

        },
        {

            token: ',',
            label: 'O',

        },
        {

            token: '1',
            label: 'O',

        },
        {

            token: '%',
            label: 'O',

        },
        {

            token: ',',
            label: 'O',

        },
        {

            token: 'annonce',
            label: 'O',

        },
        {

            token: 'l\'',
            label: 'O',

        },
        {

            token: 'office',
            label: 'O',

        },
        {

            token: 'des',
            label: 'O',

        },
        {

            token: 'statistiques',
            label: 'O',

        },
        {

            token: 'le',
            label: 'O',

        },
        {

            token: '11',
            label: 'O',

        },
        {

            token: 'décembre',
            label: 'O',

        },
        {

            token: '.',
            label: 'O',

        }
    ],
    [
        {

            token: 'Signe',
            label: 'O',

        },
        {

            token: 'des',
            label: 'O',

        },
        {

            token: 'temps',
            label: 'O',

        },
        {

            token: ':',
            label: 'O',

        },
        {

            token: 'la',
            label: 'O',

        },
        {

            token: 'très',
            label: 'O',

        },
        {

            token: 'britannique',
            label: 'O',

        },
        {

            token: 'banque',
            label: 'O',

        },
        {

            token: 'd\'',
            label: 'O',

        },
        {

            token: 'affaires',
            label: 'O',

        },
        {

            token: 'et',
            label: 'O',

        },
        {

            token: 'de',
            label: 'O',

        },
        {

            token: 'marché', label: 'O',

        },
        {

            token: 'vient', label: 'O',

        },
        {

            token: 'd\'', label: 'O',


        },
        {

            token: 'acheter', label: 'O',


        },
        {

            token: 'un', label: 'O',


        },
        {

            token: 'siège', label: 'O',


        },
        {

            token: 'à',
            label: 'O',

        },
        {

            token: 'la',
            label: 'O',


        },
        {

            token: 'Bourse',
            label: 'O',

        },
        {

            token: 'de',
            label: 'O',

        },
        {

            token: 'Paris',
            label: 'O',

        },
        {

            token: '.',
            label: 'O',

        }
    ],
    [
        {

            token: 'Comme',
            label: 'O',

        },
        {

            token: 'le',
            label: 'O',

        },
        {

            token: 'déplore',
            label: 'O',

        },
        {

            token: 'le',
            label: 'O',

        },
        {

            token: 'quotidien',
            label: 'O',

        },
        {

            token: 'financier',
            label: 'O',

        },
        {

            token: ',',
            label: 'O',

        },
        {

            token: 'on',
            label: 'O',

        },
        {

            token: 'est',
            label: 'O',

        },
        {

            token: 'bien',
            label: 'O',

        },
        {

            token: 'loin',
            label: 'O',

        },
        {

            token: 'des',
            label: 'O',

        },
        {

            token: 'quatre',
            label: 'O',

        },
        {

            token: '-',
            label: 'O',

        },
        {

            token: 'vingt',
            label: 'O',

        },
        {

            token: '-',
            label: 'O',

        },
        {

            token: 'deux',
            label: 'O',

        },
        {

            token: 'admissions',
            label: 'O',

        },
        {

            token: 'enregistrées',
            label: 'O',

        },
        {

            token: 'au',
            label: 'O',

        },
        {

            token: 'cours',
            label: 'O',

        },
        {

            token: 'de',
            label: 'O',

        },
        {

            token: 'l\'',
            label: 'O',

        },
        {

            token: 'année',
            label: 'O',

        },
        {

            token: '1987',
            label: 'O',

        },
        {

            token: '.', label: 'O',

        }
    ]
];
