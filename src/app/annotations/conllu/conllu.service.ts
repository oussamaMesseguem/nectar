
import { ConllToken } from './conllu.model';
import { IParser } from 'src/app/injection/injection.service';
import { Annotation } from '../annotations';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Conllu implements IParser {

    annotation: Annotation = Annotation.conllu;
    sentences: ConllToken[][] = [];
    private sentence: BehaviorSubject<ConllToken[]> = new BehaviorSubject(ELEMENT_DATA);
    sentence$: Observable<ConllToken[]> = this.sentence.asObservable();

    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\t/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor() { }

    tokens(): string[][] {
        return this.sentences.map(sent => sent.map(token => token.token));
    }

    ofToken(tokenAndAnnotation: string[]): ConllToken {
        return ConllToken.fromTab(tokenAndAnnotation);
    }


}

const ELEMENT_DATA: ConllToken[] = [
    {
      index: 1,
      token: 'Baisse',
      lemma: 'baisse',
      upos: 'N',
      xpos: 'NC',
      feat: 'sentid=ftbRandomSample_100-593|g=f|n=s|s=c',
      head: 15,
      deprel: 'mod',
      deps: '15',
      misc: 'mod'
    },
    {
      index: 2,
      token: 'des',
      lemma: 'de',
      upos: 'P+D',
      xpos: 'P+D',
      feat: 's=def',
      head: 1,
      deprel: 'dep',
      deps: '1',
      misc: 'dep'
    },
    {
      index: 3,
      token: 'prix',
      lemma: 'prix',
      upos: 'N',
      xpos: 'NC',
      feat: 'g=m|n=p|s=c',
      head: 2,
      deprel: 'obj.p',
      deps: '2',
      misc: 'obj.p'
    },
    {
      index: 4,
      token: 'en',
      lemma: 'en',
      upos: 'P',
      xpos: 'P',
      feat: '_',
      head: 15,
      deprel: 'mod',
      deps: '15',
      misc: 'mod'
    },
    {
      index: 5,
      token: 'Grande',
      lemma: 'grand',
      upos: 'A',
      xpos: 'ADJ',
      feat: 'g=f|mwehead=NPP+|n=s|s=qual|pred=y',
      head: 4,
      deprel: 'obj.p',
      deps: '4',
      misc: 'obj.p'
    },
    {
      index: 6,
      token: '-',
      lemma: '-',
      upos: 'PONCT',
      xpos: 'PONCT',
      feat: 's=w|pred=y',
      head: 5,
      deprel: 'dep_cpd',
      deps: '5',
      misc: 'dep_cpd'
    },
    {
      index: 7,
      token: 'Bretagne',
      lemma: 'Bretagne',
      upos: 'N',
      xpos: 'NPP',
      feat: 'g=f|n=s|s=p|pred=y',
      head: 5,
      deprel: 'dep_cpd',
      deps: '5',
      misc: 'dep_cpd'
    },
    {
      index: 8,
      token: ':',
      lemma: ':',
      upos: 'PONCT',
      xpos: 'PONCT',
      feat: 's=w',
      head: 15,
      deprel: 'ponct',
      deps: '15',
      misc: 'ponct'
    },
    {
      index: 9,
      token: 'en',
      lemma: 'en',
      upos: 'P',
      xpos: 'P',
      feat: '_',
      head: 15,
      deprel: 'mod',
      deps: '15',
      misc: 'mod'
    },
    {
      index: 10,
      token: 'novembre',
      lemma: 'novembre',
      upos: 'N',
      xpos: 'NC',
      feat: 'g=m|n=s|s=c',
      head: 9,
      deprel: 'obj.p',
      deps: '9',
      misc: 'obj.p'
    },
    {
      index: 11,
      token: ',',
      lemma: ',',
      upos: 'PONCT',
      xpos: 'PONCT',
      feat: 's=w',
      head: 15,
      deprel: 'ponct',
      deps: '15',
      misc: 'ponct'
    },
    {
      index: 12,
      token: 'les',
      lemma: 'le',
      upos: 'D',
      xpos: 'DET',
      feat: 'g=m|n=p|s=def',
      head: 13,
      deprel: 'det',
      deps: '13',
      misc: 'det'
    },
    {
      index: 13,
      token: 'prix',
      lemma: 'prix',
      upos: 'N',
      xpos: 'NC',
      feat: 'g=m|n=p|s=c',
      head: 15,
      deprel: 'suj',
      deps: '15',
      misc: 'suj'
    },
    {
      index: 14,
      token: 'ont',
      lemma: 'avoir',
      upos: 'V',
      xpos: 'V',
      feat: 'm=ind|n=p|p=3|t=pst',
      head: 15,
      deprel: 'aux.tps',
      deps: '15',
      misc: 'aux.tps'
    },
    {
      index: 15,
      token: 'baissé',
      lemma: 'baisser',
      upos: 'V',
      xpos: 'VPP',
      feat: 'g=m|m=part|n=s|t=past',
      head: 0,
      deprel: 'root',
      deps: '0',
      misc: 'root'
    },
    {
      index: 16,
      token: 'de',
      lemma: 'de',
      upos: 'P',
      xpos: 'P',
      feat: '_',
      head: 15,
      deprel: 'mod',
      deps: '15',
      misc: 'mod'
    },
    {
      index: 17,
      token: '0',
      lemma: '0',
      upos: 'D',
      xpos: 'DET',
      feat: 'mwehead=DET+|s=card|pred=y',
      head: 20,
      deprel: 'det',
      deps: '20',
      misc: 'det'
    },
    {
      index: 18,
      token: ',',
      lemma: ',',
      upos: 'PONCT',
      xpos: 'PONCT',
      feat: 's=w|pred=y',
      head: 17,
      deprel: 'dep_cpd',
      deps: '17',
      misc: 'dep_cpd'
    },
    {
      index: 19,
      token: '1',
      lemma: '1',
      upos: 'D',
      xpos: 'DET',
      feat: 's=card|pred=y',
      head: 17,
      deprel: 'dep_cpd',
      deps: '17',
      misc: 'dep_cpd'
    },
    {
      index: 20,
      token: '%',
      lemma: '%',
      upos: 'N',
      xpos: 'NC',
      feat: 'g=m|n=s|s=c',
      head: 16,
      deprel: 'obj.p',
      deps: '16',
      misc: 'obj.p'
    },
    {
      index: 21,
      token: ',',
      lemma: ',',
      upos: 'PONCT',
      xpos: 'PONCT',
      feat: 's=w',
      head: 15,
      deprel: 'ponct',
      deps: '15',
      misc: 'ponct'
    },
    {
      index: 22,
      token: 'annonce',
      lemma: 'annoncer',
      upos: 'V',
      xpos: 'V',
      feat: 'm=ind|n=s|p=3|t=pst',
      head: 15,
      deprel: 'mod',
      deps: '15',
      misc: 'mod'
    },
    {
      index: 23,
      token: 'l\'',
      lemma: 'le',
      upos: 'D',
      xpos: 'DET',
      feat: 'g=m|n=s|s=def',
      head: 24,
      deprel: 'det',
      deps: '24',
      misc: 'det'
    },
    {
      index: 24,
      token: 'office',
      lemma: 'office',
      upos: 'N',
      xpos: 'NC',
      feat: 'g=m|n=s|s=c',
      head: 22,
      deprel: 'suj',
      deps: '22',
      misc: 'suj'
    },
    {
      index: 25,
      token: 'des',
      lemma: 'de',
      upos: 'P+D',
      xpos: 'P+D',
      feat: 's=def',
      head: 24,
      deprel: 'dep',
      deps: '24',
      misc: 'dep'
    },
    {
      index: 26,
      token: 'statistiques',
      lemma: 'statistique',
      upos: 'N',
      xpos: 'NC',
      feat: 'g=f|n=p|s=c',
      head: 25,
      deprel: 'obj.p',
      deps: '25',
      misc: 'obj.p'
    },
    {
      index: 27,
      token: 'le',
      lemma: 'le',
      upos: 'D',
      xpos: 'DET',
      feat: 'g=m|n=s|s=def',
      head: 29,
      deprel: 'det',
      deps: '29',
      misc: 'det'
    },
    {
      index: 28,
      token: '11',
      lemma: '11',
      upos: 'A',
      xpos: 'ADJ',
      feat: 'g=m|n=s|s=card',
      head: 29,
      deprel: 'mod',
      deps: '29',
      misc: 'mod'
    },
    {
      index: 29,
      token: 'décembre',
      lemma: 'décembre',
      upos: 'N',
      xpos: 'NC',
      feat: 'g=m|n=s|s=c',
      head: 22,
      deprel: 'mod',
      deps: '22',
      misc: 'mod'
    },
    {
      index: 30,
      token: '.',
      lemma: '.',
      upos: 'PONCT',
      xpos: 'PONCT',
      feat: 's=s',
      head: 15,
      deprel: 'ponct',
      deps: '15',
      misc: 'ponct'
    }
  
  ];