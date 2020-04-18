
import { ConllToken } from './conllu.model';
import { IParser } from 'src/app/injection/injection.service';
import { Annotation } from '../annotations';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Conllu implements IParser {

  private sentence: BehaviorSubject<ConllToken[]> = new BehaviorSubject([]);
  sentence$: Observable<ConllToken[]> = this.sentence.asObservable();

  annotation: Annotation = Annotation.conllu;
  sentences: ConllToken[][] = [];

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

  ofToken(tokenAndAnnotation: string[]): ConllToken {
    return ConllToken.fromTab(tokenAndAnnotation);
  }

  moveSentence(index: number) {
    this.sentence.next(this.sentences[index]);
  }

}

const sents: ConllToken[][] = [
  [
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
  ],
  [
      {
          index: 1,
          token: 'Signe',
          lemma: 'signe',
          upos: 'N',
          xpos: 'NC',
          feat: 'sentid=ftbRandomSample_100-220|g=m|n=s|s=c',
          head: 14,
          deprel: 'mod',
          deps: '14',
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
          token: 'temps',
          lemma: 'temps',
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
          token: ':',
          lemma: ':',
          upos: 'PONCT',
          xpos: 'PONCT',
          feat: 's=w',
          head: 14,
          deprel: 'ponct',
          deps: '14',
          misc: 'ponct'
      },
      {
          index: 5,
          token: 'la',
          lemma: 'le',
          upos: 'D',
          xpos: 'DET',
          feat: 'g=f|n=s|s=def',
          head: 8,
          deprel: 'det',
          deps: '8',
          misc: 'det'
      },
      {
          index: 6,
          token: 'très',
          lemma: 'très',
          upos: 'ADV',
          xpos: 'ADV',
          feat: '_',
          head: 7,
          deprel: 'mod',
          deps: '7',
          misc: 'mod'
      },
      {
          index: 7,
          token: 'britannique',
          lemma: 'britannique',
          upos: 'A',
          xpos: 'ADJ',
          feat: 'g=f|n=s|s=qual',
          head: 8,
          deprel: 'mod',
          deps: '8',
          misc: 'mod'
      },
      {
          index: 8,
          token: 'banque',
          lemma: 'banque',
          upos: 'N',
          xpos: 'NC',
          feat: 'g=f|mwehead=NC+|n=s|s=c|pred=y',
          head: 14,
          deprel: 'suj',
          deps: '14',
          misc: 'suj'
      },
      {
          index: 9,
          token: 'd\'',
          lemma: 'de',
          upos: 'P',
          xpos: 'P',
          feat: 'pred=y',
          head: 8,
          deprel: 'dep_cpd',
          deps: '8',
          misc: 'dep_cpd'
      },
      {
          index: 10,
          token: 'affaires',
          lemma: 'affaire',
          upos: 'N',
          xpos: 'NC',
          feat: 'g=f|n=p|s=c|pred=y',
          head: 8,
          deprel: 'dep_cpd',
          deps: '8',
          misc: 'dep_cpd'
      },
      {
          index: 11,
          token: 'et',
          lemma: 'et',
          upos: 'C',
          xpos: 'CC',
          feat: 's=c',
          head: 8,
          deprel: 'coord',
          deps: '8',
          misc: 'coord'
      },
      {
          index: 12,
          token: 'de',
          lemma: 'de',
          upos: 'P',
          xpos: 'P',
          feat: '_',
          head: 11,
          deprel: 'dep.coord',
          deps: '11',
          misc: 'dep.coord'
      },
      {
          index: 13,
          token: 'marché',
          lemma: 'marché',
          upos: 'N',
          xpos: 'NC',
          feat: 'g=m|n=s|s=c',
          head: 12,
          deprel: 'obj.p',
          deps: '12',
          misc: 'obj.p'
      },
      {
          index: 14,
          token: 'vient',
          lemma: 'venir',
          upos: 'V',
          xpos: 'V',
          feat: 'm=ind|n=s|p=3|t=pst',
          head: 0,
          deprel: 'root',
          deps: '0',
          misc: 'root'
      },
      {
          index: 15,
          token: 'd\'',
          lemma: 'de',
          upos: 'P',
          xpos: 'P',
          feat: '_',
          head: 14,
          deprel: 'de_obj',
          deps: '14',
          misc: 'de_obj'
      },
      {
          index: 16,
          token: 'acheter',
          lemma: 'acheter',
          upos: 'V',
          xpos: 'VINF',
          feat: 'm=inf',
          head: 15,
          deprel: 'obj.p',
          deps: '15',
          misc: 'obj.p'
      },
      {
          index: 17,
          token: 'un',
          lemma: 'un',
          upos: 'D',
          xpos: 'DET',
          feat: 'g=m|n=s|s=ind',
          head: 18,
          deprel: 'det',
          deps: '18',
          misc: 'det'
      },
      {
          index: 18,
          token: 'siège',
          lemma: 'siège',
          upos: 'N',
          xpos: 'NC',
          feat: 'g=m|n=s|s=c',
          head: 16,
          deprel: 'obj',
          deps: '16',
          misc: 'obj'
      },
      {
          index: 19,
          token: 'à',
          lemma: 'à',
          upos: 'P',
          xpos: 'P',
          feat: '_',
          head: 16,
          deprel: 'a_obj',
          deps: '16',
          misc: 'a_obj'
      },
      {
          index: 20,
          token: 'la',
          lemma: 'le',
          upos: 'D',
          xpos: 'DET',
          feat: 'g=f|n=s|s=def',
          head: 21,
          deprel: 'det',
          deps: '21',
          misc: 'det'
      },
      {
          index: 21,
          token: 'Bourse',
          lemma: 'bourse',
          upos: 'N',
          xpos: 'NC',
          feat: 'g=f|n=s|s=c',
          head: 19,
          deprel: 'obj.p',
          deps: '19',
          misc: 'obj.p'
      },
      {
          index: 22,
          token: 'de',
          lemma: 'de',
          upos: 'P',
          xpos: 'P',
          feat: '_',
          head: 21,
          deprel: 'dep',
          deps: '21',
          misc: 'dep'
      },
      {
          index: 23,
          token: 'Paris',
          lemma: 'Paris',
          upos: 'N',
          xpos: 'NPP',
          feat: 'g=m|n=s|s=p',
          head: 22,
          deprel: 'obj.p',
          deps: '22',
          misc: 'obj.p'
      },
      {
          index: 24,
          token: '.',
          lemma: '.',
          upos: 'PONCT',
          xpos: 'PONCT',
          feat: 's=s',
          head: 14,
          deprel: 'ponct',
          deps: '14',
          misc: 'ponct'
      }
  ],
  [
      {
          index: 1,
          token: 'Comme',
          lemma: 'comme',
          upos: 'C',
          xpos: 'CS',
          feat: 'sentid=ftbRandomSample_100-843|s=s',
          head: 9,
          deprel: 'mod',
          deps: '9',
          misc: 'mod'
      },
      {
          index: 2,
          token: 'le',
          lemma: 'le',
          upos: 'CL',
          xpos: 'CLO',
          feat: 'g=m|n=s|p=3|s=obj',
          head: 3,
          deprel: 'obj',
          deps: '3',
          misc: 'obj'
      },
      {
          index: 3,
          token: 'déplore',
          lemma: 'déplorer',
          upos: 'V',
          xpos: 'V',
          feat: 'm=ind|n=s|p=3|t=pst',
          head: 1,
          deprel: 'obj.cpl',
          deps: '1',
          misc: 'obj.cpl'
      },
      {
          index: 4,
          token: 'le',
          lemma: 'le',
          upos: 'D',
          xpos: 'DET',
          feat: 'g=m|n=s|s=def',
          head: 5,
          deprel: 'det',
          deps: '5',
          misc: 'det'
      },
      {
          index: 5,
          token: 'quotidien',
          lemma: 'quotidien',
          upos: 'N',
          xpos: 'NC',
          feat: 'g=m|mwehead=NC+|n=s|s=c|pred=y',
          head: 3,
          deprel: 'suj',
          deps: '3',
          misc: 'suj'
      },
      {
          index: 6,
          token: 'financier',
          lemma: 'financier',
          upos: 'A',
          xpos: 'ADJ',
          feat: 'g=m|n=s|s=qual|pred=y',
          head: 5,
          deprel: 'dep_cpd',
          deps: '5',
          misc: 'dep_cpd'
      },
      {
          index: 7,
          token: ',',
          lemma: ',',
          upos: 'PONCT',
          xpos: 'PONCT',
          feat: 's=w',
          head: 3,
          deprel: 'ponct',
          deps: '3',
          misc: 'ponct'
      },
      {
          index: 8,
          token: 'on',
          lemma: 'il',
          upos: 'CL',
          xpos: 'CLS',
          feat: 'g=m|n=s|p=3|s=suj',
          head: 9,
          deprel: 'suj',
          deps: '9',
          misc: 'suj'
      },
      {
          index: 9,
          token: 'est',
          lemma: 'être',
          upos: 'V',
          xpos: 'V',
          feat: 'm=ind|n=s|p=3|t=pst',
          head: 0,
          deprel: 'root',
          deps: '0',
          misc: 'root'
      },
      {
          index: 10,
          token: 'bien',
          lemma: 'bien',
          upos: 'ADV',
          xpos: 'ADV',
          feat: '_',
          head: 11,
          deprel: 'mod',
          deps: '11',
          misc: 'mod'
      },
      {
          index: 11,
          token: 'loin',
          lemma: 'loin',
          upos: 'ADV',
          xpos: 'ADV',
          feat: '_',
          head: 9,
          deprel: 'mod',
          deps: '9',
          misc: 'mod'
      },
      {
          index: 12,
          token: 'des',
          lemma: 'de',
          upos: 'P+D',
          xpos: 'P+D',
          feat: 's=def',
          head: 11,
          deprel: 'de_obj',
          deps: '11',
          misc: 'de_obj'
      },
      {
          index: 13,
          token: 'quatre',
          lemma: 'quatre',
          upos: 'D',
          xpos: 'DET',
          feat: 'mwehead=DET+|s=card|pred=y',
          head: 18,
          deprel: 'det',
          deps: '18',
          misc: 'det'
      },
      {
          index: 14,
          token: '-',
          lemma: '-',
          upos: 'PONCT',
          xpos: 'PONCT',
          feat: 's=w|pred=y',
          head: 13,
          deprel: 'dep_cpd',
          deps: '13',
          misc: 'dep_cpd'
      },
      {
          index: 15,
          token: 'vingt',
          lemma: 'vingt',
          upos: 'D',
          xpos: 'DET',
          feat: 's=card|pred=y',
          head: 13,
          deprel: 'dep_cpd',
          deps: '13',
          misc: 'dep_cpd'
      },
      {
          index: 16,
          token: '-',
          lemma: '-',
          upos: 'PONCT',
          xpos: 'PONCT',
          feat: 's=w|pred=y',
          head: 13,
          deprel: 'dep_cpd',
          deps: '13',
          misc: 'dep_cpd'
      },
      {
          index: 17,
          token: 'deux',
          lemma: 'deux',
          upos: 'D',
          xpos: 'DET',
          feat: 's=card|pred=y',
          head: 13,
          deprel: 'dep_cpd',
          deps: '13',
          misc: 'dep_cpd'
      },
      {
          index: 18,
          token: 'admissions',
          lemma: 'admission',
          upos: 'N',
          xpos: 'NC',
          feat: 'g=f|n=p|s=c',
          head: 12,
          deprel: 'obj.p',
          deps: '12',
          misc: 'obj.p'
      },
      {
          index: 19,
          token: 'enregistrées',
          lemma: 'enregistrer',
          upos: 'V',
          xpos: 'VPP',
          feat: 'g=f|m=part|n=p|t=past',
          head: 18,
          deprel: 'mod',
          deps: '18',
          misc: 'mod'
      },
      {
          index: 20,
          token: 'au',
          lemma: 'à',
          upos: 'P+D',
          xpos: 'P+D',
          feat: 's=def',
          head: 19,
          deprel: 'a_obj',
          deps: '19',
          misc: 'a_obj'
      },
      {
          index: 21,
          token: 'cours',
          lemma: 'cours',
          upos: 'N',
          xpos: 'NC',
          feat: 'g=m|n=s|s=c',
          head: 20,
          deprel: 'obj.p',
          deps: '20',
          misc: 'obj.p'
      },
      {
          index: 22,
          token: 'de',
          lemma: 'de',
          upos: 'P',
          xpos: 'P',
          feat: '_',
          head: 21,
          deprel: 'dep',
          deps: '21',
          misc: 'dep'
      },
      {
          index: 23,
          token: 'l\'',
          lemma: 'le',
          upos: 'D',
          xpos: 'DET',
          feat: 'g=f|n=s|s=def',
          head: 24,
          deprel: 'det',
          deps: '24',
          misc: 'det'
      },
      {
          index: 24,
          token: 'année',
          lemma: 'année',
          upos: 'N',
          xpos: 'NC',
          feat: 'g=f|n=s|s=c',
          head: 22,
          deprel: 'obj.p',
          deps: '22',
          misc: 'obj.p'
      },
      {
          index: 25,
          token: '1987',
          lemma: '1987',
          upos: 'N',
          xpos: 'NC',
          feat: 'g=f|n=s|s=card',
          head: 24,
          deprel: 'mod',
          deps: '24',
          misc: 'mod'
      },
      {
          index: 26,
          token: '.',
          lemma: '.',
          upos: 'PONCT',
          xpos: 'PONCT',
          feat: 's=s',
          head: 9,
          deprel: 'ponct',
          deps: '9',
          misc: 'ponct'
      }
  ]
];

