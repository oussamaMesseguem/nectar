import { Injectable } from '@angular/core';
import { createConlluToken, conlluIntoText } from './annotators/conllu/conllu.model';
import { BehaviorSubject } from 'rxjs';
import { createNerToken, nerIntoText } from './annotators/ner/ner.model';
import { Annotation } from './annotators/annotations';

/**
 * The main service class that holds the content and serves it to view.
 */
@Injectable({
    providedIn: 'root'
})
export class StoreService {

    /**
     * Contains the tokens per sentences.
     * Used to init new annotation objects
     */
    rawContent: string[][];

    selectedAnnotations$: BehaviorSubject<string[]> = new BehaviorSubject([]);

    /**
     * The exposed sentence to display and tag.
     */
    sentence$: BehaviorSubject<any[]> = new BehaviorSubject([]);

    /**
     * The current selected annotation. Affects the sentence observable as it changes its content.
     */
    private annotationValue: string;

    /**
     * The current sentence index among the sentences. Affects the sentence observable as it changes its content.
     */
    private indexValue = 0;

    /**
     * The store itself.
     * * Contains the content.
     * * Keys: are the annotations
     * * Values: are an array of the annotated content
     */
    private store = {};

    constructor() { }

    /**
     * Returns the current annotation.
     */
    get annotation(): string { return this.annotationValue; }

    /**
     * Sets the new current annotation.
     * * Moves the observable to the new annotation.
     */
    set annotation(annotation: string) {
        this.annotationValue = annotation;
        if (!this.keys().includes(annotation)) {
            this.init(annotation);
            this.selectedAnnotations$.next(this.keys());
        }
        this.sentence$.next(this.store[this.annotationValue][this.indexValue]);
    }

    /**
     * Returns the current index of the sentence
     */
    get index(): number { return this.indexValue; }

    /**
     * Sets the current index of the sentence.
     * * Moves the observable to the new index.
     */
    set index(index: number) {
        if (index > this.indexValue) {
            this.indexValue = this.indexValue === this.nbSentences - 1 ? 0 : this.indexValue + 1;
        } else {
            this.indexValue = this.indexValue === 0 ? this.nbSentences - 1 : this.indexValue - 1;
        }
        this.sentence$.next(this.store[this.annotationValue][this.indexValue]);
    }

    /**
     * The number of sentences in the store.
     */
    get nbSentences(): number { return this.rawContent.length; }

    /**
     * Adds a new entry in the store and sets the raw content array.
     * @param annotation new object property
     */
    addAnnotation(annotation: string, content: any[][]) {
        if (annotation !== Annotation.raw) {
            this.rawContent = content.map(l => l.map(t => t.token));
            this.store[annotation] = content;
            this.annotation = annotation;
        } else {
            this.rawContent = content;
        }
    }

    /**
     * Deletes the annotation from the store.
     * @param annotation The annotation to remove
     */
    removeAnnotation(annotation: string) {
        delete this.store[annotation];
        this.selectedAnnotations$.next(this.keys());
        if (this.selectedAnnotations$.value.length > 0) {
            this.annotation = this.selectedAnnotations$.value[0];
        }
    }

    /**
     * Iterates through the raw content and inits new tokens according to the given annotation.
     * @param annotation The new annotation to add
     */
    private init(annotation: string) {
        const annotationContent = [];
        this.rawContent.forEach(sentence => {
            const sent = [];
            sentence.forEach((token: string, index: number) => {
                if (annotation === Annotation.conllu) {
                    sent.push(createConlluToken((index + 1).toString(), token));
                }
                if (annotation === Annotation.ner) {
                    sent.push(createNerToken(token));
                }
            });
            annotationContent.push(sent);
        });
        this.store[annotation] = annotationContent;
    }

    /**
     * Returns the annotations in the store.
     */
    private keys(): string[] {
        return Object.keys(this.store);
    }

    /**
     * Writes content into files.
     * @param annotations the exported annotations
     */
    writeContents(annotations: string[]) {
        annotations.forEach(annotation => {
            const a = document.createElement('a');
            let content: string;
            if (annotation === Annotation.conllu) {
                content = conlluIntoText(this.store[annotation]);
            }
            if (annotation === Annotation.ner) {
                content = nerIntoText(this.store[annotation]);
            }
            const file = new Blob([content], { type: 'text/plain'} );
            a.href = URL.createObjectURL(file);
            a.download = `${annotation}.txt`;
            a.click();
        });
      }
}

// const conlluSents: ConlluToken[][] = [
//     [
//         {
//             index: 1,
//             token: 'Baisse',
//             lemma: 'baisse',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'sentid=ftbRandomSample_100-593|g=f|n=s|s=c',
//             head: 15,
//             deprel: 'mod',
//             deps: '15',
//             misc: 'mod'
//         },
//         {
//             index: 2,
//             token: 'des',
//             lemma: 'de',
//             upos: 'P+D',
//             xpos: 'P+D',
//             feat: 's=def',
//             head: 1,
//             deprel: 'dep',
//             deps: '1',
//             misc: 'dep'
//         },
//         {
//             index: 3,
//             token: 'prix',
//             lemma: 'prix',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=m|n=p|s=c',
//             head: 2,
//             deprel: 'obj.p',
//             deps: '2',
//             misc: 'obj.p'
//         },
//         {
//             index: 4,
//             token: 'en',
//             lemma: 'en',
//             upos: 'P',
//             xpos: 'P',
//             feat: '_',
//             head: 15,
//             deprel: 'mod',
//             deps: '15',
//             misc: 'mod'
//         },
//         {
//             index: 5,
//             token: 'Grande',
//             lemma: 'grand',
//             upos: 'A',
//             xpos: 'ADJ',
//             feat: 'g=f|mwehead=NPP+|n=s|s=qual|pred=y',
//             head: 4,
//             deprel: 'obj.p',
//             deps: '4',
//             misc: 'obj.p'
//         },
//         {
//             index: 6,
//             token: '-',
//             lemma: '-',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=w|pred=y',
//             head: 5,
//             deprel: 'dep_cpd',
//             deps: '5',
//             misc: 'dep_cpd'
//         },
//         {
//             index: 7,
//             token: 'Bretagne',
//             lemma: 'Bretagne',
//             upos: 'N',
//             xpos: 'NPP',
//             feat: 'g=f|n=s|s=p|pred=y',
//             head: 5,
//             deprel: 'dep_cpd',
//             deps: '5',
//             misc: 'dep_cpd'
//         },
//         {
//             index: 8,
//             token: ':',
//             lemma: ':',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=w',
//             head: 15,
//             deprel: 'ponct',
//             deps: '15',
//             misc: 'ponct'
//         },
//         {
//             index: 9,
//             token: 'en',
//             lemma: 'en',
//             upos: 'P',
//             xpos: 'P',
//             feat: '_',
//             head: 15,
//             deprel: 'mod',
//             deps: '15',
//             misc: 'mod'
//         },
//         {
//             index: 10,
//             token: 'novembre',
//             lemma: 'novembre',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=m|n=s|s=c',
//             head: 9,
//             deprel: 'obj.p',
//             deps: '9',
//             misc: 'obj.p'
//         },
//         {
//             index: 11,
//             token: ',',
//             lemma: ',',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=w',
//             head: 15,
//             deprel: 'ponct',
//             deps: '15',
//             misc: 'ponct'
//         },
//         {
//             index: 12,
//             token: 'les',
//             lemma: 'le',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 'g=m|n=p|s=def',
//             head: 13,
//             deprel: 'det',
//             deps: '13',
//             misc: 'det'
//         },
//         {
//             index: 13,
//             token: 'prix',
//             lemma: 'prix',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=m|n=p|s=c',
//             head: 15,
//             deprel: 'suj',
//             deps: '15',
//             misc: 'suj'
//         },
//         {
//             index: 14,
//             token: 'ont',
//             lemma: 'avoir',
//             upos: 'V',
//             xpos: 'V',
//             feat: 'm=ind|n=p|p=3|t=pst',
//             head: 15,
//             deprel: 'aux.tps',
//             deps: '15',
//             misc: 'aux.tps'
//         },
//         {
//             index: 15,
//             token: 'baissé',
//             lemma: 'baisser',
//             upos: 'V',
//             xpos: 'VPP',
//             feat: 'g=m|m=part|n=s|t=past',
//             head: 0,
//             deprel: 'root',
//             deps: '0',
//             misc: 'root'
//         },
//         {
//             index: 16,
//             token: 'de',
//             lemma: 'de',
//             upos: 'P',
//             xpos: 'P',
//             feat: '_',
//             head: 15,
//             deprel: 'mod',
//             deps: '15',
//             misc: 'mod'
//         },
//         {
//             index: 17,
//             token: '0',
//             lemma: '0',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 'mwehead=DET+|s=card|pred=y',
//             head: 20,
//             deprel: 'det',
//             deps: '20',
//             misc: 'det'
//         },
//         {
//             index: 18,
//             token: ',',
//             lemma: ',',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=w|pred=y',
//             head: 17,
//             deprel: 'dep_cpd',
//             deps: '17',
//             misc: 'dep_cpd'
//         },
//         {
//             index: 19,
//             token: '1',
//             lemma: '1',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 's=card|pred=y',
//             head: 17,
//             deprel: 'dep_cpd',
//             deps: '17',
//             misc: 'dep_cpd'
//         },
//         {
//             index: 20,
//             token: '%',
//             lemma: '%',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=m|n=s|s=c',
//             head: 16,
//             deprel: 'obj.p',
//             deps: '16',
//             misc: 'obj.p'
//         },
//         {
//             index: 21,
//             token: ',',
//             lemma: ',',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=w',
//             head: 15,
//             deprel: 'ponct',
//             deps: '15',
//             misc: 'ponct'
//         },
//         {
//             index: 22,
//             token: 'annonce',
//             lemma: 'annoncer',
//             upos: 'V',
//             xpos: 'V',
//             feat: 'm=ind|n=s|p=3|t=pst',
//             head: 15,
//             deprel: 'mod',
//             deps: '15',
//             misc: 'mod'
//         },
//         {
//             index: 23,
//             token: 'l\'',
//             lemma: 'le',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 'g=m|n=s|s=def',
//             head: 24,
//             deprel: 'det',
//             deps: '24',
//             misc: 'det'
//         },
//         {
//             index: 24,
//             token: 'office',
//             lemma: 'office',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=m|n=s|s=c',
//             head: 22,
//             deprel: 'suj',
//             deps: '22',
//             misc: 'suj'
//         },
//         {
//             index: 25,
//             token: 'des',
//             lemma: 'de',
//             upos: 'P+D',
//             xpos: 'P+D',
//             feat: 's=def',
//             head: 24,
//             deprel: 'dep',
//             deps: '24',
//             misc: 'dep'
//         },
//         {
//             index: 26,
//             token: 'statistiques',
//             lemma: 'statistique',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=f|n=p|s=c',
//             head: 25,
//             deprel: 'obj.p',
//             deps: '25',
//             misc: 'obj.p'
//         },
//         {
//             index: 27,
//             token: 'le',
//             lemma: 'le',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 'g=m|n=s|s=def',
//             head: 29,
//             deprel: 'det',
//             deps: '29',
//             misc: 'det'
//         },
//         {
//             index: 28,
//             token: '11',
//             lemma: '11',
//             upos: 'A',
//             xpos: 'ADJ',
//             feat: 'g=m|n=s|s=card',
//             head: 29,
//             deprel: 'mod',
//             deps: '29',
//             misc: 'mod'
//         },
//         {
//             index: 29,
//             token: 'décembre',
//             lemma: 'décembre',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=m|n=s|s=c',
//             head: 22,
//             deprel: 'mod',
//             deps: '22',
//             misc: 'mod'
//         },
//         {
//             index: 30,
//             token: '.',
//             lemma: '.',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=s',
//             head: 15,
//             deprel: 'ponct',
//             deps: '15',
//             misc: 'ponct'
//         }
//     ],
//     [
//         {
//             index: 1,
//             token: 'Signe',
//             lemma: 'signe',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'sentid=ftbRandomSample_100-220|g=m|n=s|s=c',
//             head: 14,
//             deprel: 'mod',
//             deps: '14',
//             misc: 'mod'
//         },
//         {
//             index: 2,
//             token: 'des',
//             lemma: 'de',
//             upos: 'P+D',
//             xpos: 'P+D',
//             feat: 's=def',
//             head: 1,
//             deprel: 'dep',
//             deps: '1',
//             misc: 'dep'
//         },
//         {
//             index: 3,
//             token: 'temps',
//             lemma: 'temps',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=m|n=p|s=c',
//             head: 2,
//             deprel: 'obj.p',
//             deps: '2',
//             misc: 'obj.p'
//         },
//         {
//             index: 4,
//             token: ':',
//             lemma: ':',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=w',
//             head: 14,
//             deprel: 'ponct',
//             deps: '14',
//             misc: 'ponct'
//         },
//         {
//             index: 5,
//             token: 'la',
//             lemma: 'le',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 'g=f|n=s|s=def',
//             head: 8,
//             deprel: 'det',
//             deps: '8',
//             misc: 'det'
//         },
//         {
//             index: 6,
//             token: 'très',
//             lemma: 'très',
//             upos: 'ADV',
//             xpos: 'ADV',
//             feat: '_',
//             head: 7,
//             deprel: 'mod',
//             deps: '7',
//             misc: 'mod'
//         },
//         {
//             index: 7,
//             token: 'britannique',
//             lemma: 'britannique',
//             upos: 'A',
//             xpos: 'ADJ',
//             feat: 'g=f|n=s|s=qual',
//             head: 8,
//             deprel: 'mod',
//             deps: '8',
//             misc: 'mod'
//         },
//         {
//             index: 8,
//             token: 'banque',
//             lemma: 'banque',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=f|mwehead=NC+|n=s|s=c|pred=y',
//             head: 14,
//             deprel: 'suj',
//             deps: '14',
//             misc: 'suj'
//         },
//         {
//             index: 9,
//             token: 'd\'',
//             lemma: 'de',
//             upos: 'P',
//             xpos: 'P',
//             feat: 'pred=y',
//             head: 8,
//             deprel: 'dep_cpd',
//             deps: '8',
//             misc: 'dep_cpd'
//         },
//         {
//             index: 10,
//             token: 'affaires',
//             lemma: 'affaire',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=f|n=p|s=c|pred=y',
//             head: 8,
//             deprel: 'dep_cpd',
//             deps: '8',
//             misc: 'dep_cpd'
//         },
//         {
//             index: 11,
//             token: 'et',
//             lemma: 'et',
//             upos: 'C',
//             xpos: 'CC',
//             feat: 's=c',
//             head: 8,
//             deprel: 'coord',
//             deps: '8',
//             misc: 'coord'
//         },
//         {
//             index: 12,
//             token: 'de',
//             lemma: 'de',
//             upos: 'P',
//             xpos: 'P',
//             feat: '_',
//             head: 11,
//             deprel: 'dep.coord',
//             deps: '11',
//             misc: 'dep.coord'
//         },
//         {
//             index: 13,
//             token: 'marché',
//             lemma: 'marché',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=m|n=s|s=c',
//             head: 12,
//             deprel: 'obj.p',
//             deps: '12',
//             misc: 'obj.p'
//         },
//         {
//             index: 14,
//             token: 'vient',
//             lemma: 'venir',
//             upos: 'V',
//             xpos: 'V',
//             feat: 'm=ind|n=s|p=3|t=pst',
//             head: 0,
//             deprel: 'root',
//             deps: '0',
//             misc: 'root'
//         },
//         {
//             index: 15,
//             token: 'd\'',
//             lemma: 'de',
//             upos: 'P',
//             xpos: 'P',
//             feat: '_',
//             head: 14,
//             deprel: 'de_obj',
//             deps: '14',
//             misc: 'de_obj'
//         },
//         {
//             index: 16,
//             token: 'acheter',
//             lemma: 'acheter',
//             upos: 'V',
//             xpos: 'VINF',
//             feat: 'm=inf',
//             head: 15,
//             deprel: 'obj.p',
//             deps: '15',
//             misc: 'obj.p'
//         },
//         {
//             index: 17,
//             token: 'un',
//             lemma: 'un',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 'g=m|n=s|s=ind',
//             head: 18,
//             deprel: 'det',
//             deps: '18',
//             misc: 'det'
//         },
//         {
//             index: 18,
//             token: 'siège',
//             lemma: 'siège',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=m|n=s|s=c',
//             head: 16,
//             deprel: 'obj',
//             deps: '16',
//             misc: 'obj'
//         },
//         {
//             index: 19,
//             token: 'à',
//             lemma: 'à',
//             upos: 'P',
//             xpos: 'P',
//             feat: '_',
//             head: 16,
//             deprel: 'a_obj',
//             deps: '16',
//             misc: 'a_obj'
//         },
//         {
//             index: 20,
//             token: 'la',
//             lemma: 'le',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 'g=f|n=s|s=def',
//             head: 21,
//             deprel: 'det',
//             deps: '21',
//             misc: 'det'
//         },
//         {
//             index: 21,
//             token: 'Bourse',
//             lemma: 'bourse',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=f|n=s|s=c',
//             head: 19,
//             deprel: 'obj.p',
//             deps: '19',
//             misc: 'obj.p'
//         },
//         {
//             index: 22,
//             token: 'de',
//             lemma: 'de',
//             upos: 'P',
//             xpos: 'P',
//             feat: '_',
//             head: 21,
//             deprel: 'dep',
//             deps: '21',
//             misc: 'dep'
//         },
//         {
//             index: 23,
//             token: 'Paris',
//             lemma: 'Paris',
//             upos: 'N',
//             xpos: 'NPP',
//             feat: 'g=m|n=s|s=p',
//             head: 22,
//             deprel: 'obj.p',
//             deps: '22',
//             misc: 'obj.p'
//         },
//         {
//             index: 24,
//             token: '.',
//             lemma: '.',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=s',
//             head: 14,
//             deprel: 'ponct',
//             deps: '14',
//             misc: 'ponct'
//         }
//     ],
//     [
//         {
//             index: 1,
//             token: 'Comme',
//             lemma: 'comme',
//             upos: 'C',
//             xpos: 'CS',
//             feat: 'sentid=ftbRandomSample_100-843|s=s',
//             head: 9,
//             deprel: 'mod',
//             deps: '9',
//             misc: 'mod'
//         },
//         {
//             index: 2,
//             token: 'le',
//             lemma: 'le',
//             upos: 'CL',
//             xpos: 'CLO',
//             feat: 'g=m|n=s|p=3|s=obj',
//             head: 3,
//             deprel: 'obj',
//             deps: '3',
//             misc: 'obj'
//         },
//         {
//             index: 3,
//             token: 'déplore',
//             lemma: 'déplorer',
//             upos: 'V',
//             xpos: 'V',
//             feat: 'm=ind|n=s|p=3|t=pst',
//             head: 1,
//             deprel: 'obj.cpl',
//             deps: '1',
//             misc: 'obj.cpl'
//         },
//         {
//             index: 4,
//             token: 'le',
//             lemma: 'le',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 'g=m|n=s|s=def',
//             head: 5,
//             deprel: 'det',
//             deps: '5',
//             misc: 'det'
//         },
//         {
//             index: 5,
//             token: 'quotidien',
//             lemma: 'quotidien',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=m|mwehead=NC+|n=s|s=c|pred=y',
//             head: 3,
//             deprel: 'suj',
//             deps: '3',
//             misc: 'suj'
//         },
//         {
//             index: 6,
//             token: 'financier',
//             lemma: 'financier',
//             upos: 'A',
//             xpos: 'ADJ',
//             feat: 'g=m|n=s|s=qual|pred=y',
//             head: 5,
//             deprel: 'dep_cpd',
//             deps: '5',
//             misc: 'dep_cpd'
//         },
//         {
//             index: 7,
//             token: ',',
//             lemma: ',',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=w',
//             head: 3,
//             deprel: 'ponct',
//             deps: '3',
//             misc: 'ponct'
//         },
//         {
//             index: 8,
//             token: 'on',
//             lemma: 'il',
//             upos: 'CL',
//             xpos: 'CLS',
//             feat: 'g=m|n=s|p=3|s=suj',
//             head: 9,
//             deprel: 'suj',
//             deps: '9',
//             misc: 'suj'
//         },
//         {
//             index: 9,
//             token: 'est',
//             lemma: 'être',
//             upos: 'V',
//             xpos: 'V',
//             feat: 'm=ind|n=s|p=3|t=pst',
//             head: 0,
//             deprel: 'root',
//             deps: '0',
//             misc: 'root'
//         },
//         {
//             index: 10,
//             token: 'bien',
//             lemma: 'bien',
//             upos: 'ADV',
//             xpos: 'ADV',
//             feat: '_',
//             head: 11,
//             deprel: 'mod',
//             deps: '11',
//             misc: 'mod'
//         },
//         {
//             index: 11,
//             token: 'loin',
//             lemma: 'loin',
//             upos: 'ADV',
//             xpos: 'ADV',
//             feat: '_',
//             head: 9,
//             deprel: 'mod',
//             deps: '9',
//             misc: 'mod'
//         },
//         {
//             index: 12,
//             token: 'des',
//             lemma: 'de',
//             upos: 'P+D',
//             xpos: 'P+D',
//             feat: 's=def',
//             head: 11,
//             deprel: 'de_obj',
//             deps: '11',
//             misc: 'de_obj'
//         },
//         {
//             index: 13,
//             token: 'quatre',
//             lemma: 'quatre',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 'mwehead=DET+|s=card|pred=y',
//             head: 18,
//             deprel: 'det',
//             deps: '18',
//             misc: 'det'
//         },
//         {
//             index: 14,
//             token: '-',
//             lemma: '-',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=w|pred=y',
//             head: 13,
//             deprel: 'dep_cpd',
//             deps: '13',
//             misc: 'dep_cpd'
//         },
//         {
//             index: 15,
//             token: 'vingt',
//             lemma: 'vingt',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 's=card|pred=y',
//             head: 13,
//             deprel: 'dep_cpd',
//             deps: '13',
//             misc: 'dep_cpd'
//         },
//         {
//             index: 16,
//             token: '-',
//             lemma: '-',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=w|pred=y',
//             head: 13,
//             deprel: 'dep_cpd',
//             deps: '13',
//             misc: 'dep_cpd'
//         },
//         {
//             index: 17,
//             token: 'deux',
//             lemma: 'deux',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 's=card|pred=y',
//             head: 13,
//             deprel: 'dep_cpd',
//             deps: '13',
//             misc: 'dep_cpd'
//         },
//         {
//             index: 18,
//             token: 'admissions',
//             lemma: 'admission',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=f|n=p|s=c',
//             head: 12,
//             deprel: 'obj.p',
//             deps: '12',
//             misc: 'obj.p'
//         },
//         {
//             index: 19,
//             token: 'enregistrées',
//             lemma: 'enregistrer',
//             upos: 'V',
//             xpos: 'VPP',
//             feat: 'g=f|m=part|n=p|t=past',
//             head: 18,
//             deprel: 'mod',
//             deps: '18',
//             misc: 'mod'
//         },
//         {
//             index: 20,
//             token: 'au',
//             lemma: 'à',
//             upos: 'P+D',
//             xpos: 'P+D',
//             feat: 's=def',
//             head: 19,
//             deprel: 'a_obj',
//             deps: '19',
//             misc: 'a_obj'
//         },
//         {
//             index: 21,
//             token: 'cours',
//             lemma: 'cours',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=m|n=s|s=c',
//             head: 20,
//             deprel: 'obj.p',
//             deps: '20',
//             misc: 'obj.p'
//         },
//         {
//             index: 22,
//             token: 'de',
//             lemma: 'de',
//             upos: 'P',
//             xpos: 'P',
//             feat: '_',
//             head: 21,
//             deprel: 'dep',
//             deps: '21',
//             misc: 'dep'
//         },
//         {
//             index: 23,
//             token: 'l\'',
//             lemma: 'le',
//             upos: 'D',
//             xpos: 'DET',
//             feat: 'g=f|n=s|s=def',
//             head: 24,
//             deprel: 'det',
//             deps: '24',
//             misc: 'det'
//         },
//         {
//             index: 24,
//             token: 'année',
//             lemma: 'année',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=f|n=s|s=c',
//             head: 22,
//             deprel: 'obj.p',
//             deps: '22',
//             misc: 'obj.p'
//         },
//         {
//             index: 25,
//             token: '1987',
//             lemma: '1987',
//             upos: 'N',
//             xpos: 'NC',
//             feat: 'g=f|n=s|s=card',
//             head: 24,
//             deprel: 'mod',
//             deps: '24',
//             misc: 'mod'
//         },
//         {
//             index: 26,
//             token: '.',
//             lemma: '.',
//             upos: 'PONCT',
//             xpos: 'PONCT',
//             feat: 's=s',
//             head: 9,
//             deprel: 'ponct',
//             deps: '9',
//             misc: 'ponct'
//         }
//     ]
// ];

// const nerSents: NerToken[][] = [
//     [
//         {

//             token: 'Baisse',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'des',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'prix',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'en',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'Grande',
//             tag: '',
//             type: ''
//         },
//         {

//             token: '-',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'Bretagne',
//             tag: '',
//             type: ''
//         },
//         {

//             token: ':',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'en',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'novembre',
//             tag: '',
//             type: ''
//         },
//         {

//             token: ',',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'les',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'prix',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'ont',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'baissé',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'de',
//             tag: '',
//             type: ''
//         },
//         {

//             token: '0',
//             tag: '',
//             type: ''
//         },
//         {

//             token: ',',
//             tag: '',
//             type: ''
//         },
//         {

//             token: '1',
//             tag: '',
//             type: ''
//         },
//         {

//             token: '%',
//             tag: '',
//             type: ''
//         },
//         {

//             token: ',',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'annonce',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'l\'',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'office',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'des',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'statistiques',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'le',
//             tag: '',
//             type: ''
//         },
//         {

//             token: '11',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'décembre',
//             tag: '',
//             type: ''
//         },
//         {

//             token: '.',
//             tag: '',
//             type: ''
//         }
//     ],
//     [
//         {

//             token: 'Signe',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'des',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'temps',
//             tag: '',
//             type: ''
//         },
//         {

//             token: ':',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'la',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'très',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'britannique',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'banque',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'd\'',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'affaires',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'et',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'de',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'marché', tag: '',
//             type: ''
//         },
//         {

//             token: 'vient', tag: '',
//             type: ''
//         },
//         {

//             token: 'd\'', tag: '',
//             type: ''

//         },
//         {

//             token: 'acheter', tag: '',
//             type: ''

//         },
//         {

//             token: 'un', tag: '',
//             type: ''

//         },
//         {

//             token: 'siège', tag: '',
//             type: ''

//         },
//         {

//             token: 'à',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'la',
//             tag: '',
//             type: ''

//         },
//         {

//             token: 'Bourse',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'de',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'Paris',
//             tag: '',
//             type: ''
//         },
//         {

//             token: '.',
//             tag: '',
//             type: ''
//         }
//     ],
//     [
//         {

//             token: 'Comme',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'le',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'déplore',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'le',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'quotidien',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'financier',
//             tag: '',
//             type: ''
//         },
//         {

//             token: ',',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'on',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'est',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'bien',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'loin',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'des',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'quatre',
//             tag: '',
//             type: ''
//         },
//         {

//             token: '-',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'vingt',
//             tag: '',
//             type: ''
//         },
//         {

//             token: '-',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'deux',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'admissions',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'enregistrées',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'au',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'cours',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'de',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'l\'',
//             tag: '',
//             type: ''
//         },
//         {

//             token: 'année',
//             tag: '',
//             type: ''
//         },
//         {

//             token: '1987',
//             tag: '',
//             type: ''
//         },
//         {

//             token: '.', tag: '',
//             type: ''
//         }
//     ]
// ];
