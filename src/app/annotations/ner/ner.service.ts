
import { IParser } from 'src/app/injection/injection.service';
import { Annotation } from '../annotations';
import { Injectable } from '@angular/core';
import { NerToken } from './ner.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Ner implements IParser {

    private sentence: BehaviorSubject<NerToken[]> = new BehaviorSubject([]);
    sentence$: Observable<NerToken[]> = this.sentence.asObservable();

    annotation: Annotation = Annotation.ner;
    sentences: NerToken[][] = [];

    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\t/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor() {
        this.sentences = sents;
        localStorage.setItem('nbOfSentences', sents.length.toString());
    }

    tokens(): string[][] {
        return this.sentences.map(sent => sent.map(token => token.token));
    }

    ofToken(tokenAndAnnotation: string[]): NerToken {
        return NerToken.fromTab(tokenAndAnnotation);
    }

    moveSentence(index: number) {
        this.sentence.next(this.sentences[index]);
    }
}

const sents: NerToken[][] = [
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
