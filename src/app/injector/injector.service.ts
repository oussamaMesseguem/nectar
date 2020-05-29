import { Injectable } from '@angular/core';
import { Annotation, LanguageMap } from '../annotators/annotations';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ConlluService } from '../annotators/conllu/conllu.service';
import { StoreService } from '../store/store.service';
import { NerService } from '../annotators/ner/ner.service';
import { RawService } from '../adjustor/raw.service';
import { MiddlewareService } from '../middleware/middleware.service';
import { SpacyResponse } from '../middleware/middleware.model';

@Injectable()
export class InjectorService {

    lang: string;

    private parser: IParser;
    private isInProgress: Subject<boolean> = new BehaviorSubject(false);

    constructor(private middlwareService: MiddlewareService, private storeService: StoreService) { }

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
                content = await this.split(content, lang);
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
     * Makes an http call to middleware and send the text as:
     * - one word per line
     * - sentences separated by two new lines
     * @param content the text to be performed
     * @param lang the language of the text
     */
    private async split(content: string, lang: string): Promise<string> {
        const sentences: SpacyResponse[] = await this.middlwareService.sentsDep(content, LanguageMap[lang]).toPromise();
        const sentencesString = [];
        sentences.forEach((sentence: SpacyResponse) => {
            sentencesString.push(sentence.dep_parse.words.map(obj => obj.text).join('\n'));
        });
        return sentencesString.join('\n\n');
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
