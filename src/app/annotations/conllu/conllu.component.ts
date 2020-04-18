import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ConllToken, ConllTokenForm, UPos, UPOS, UDeprel, UDEPREL, UFeats, UFEATS } from './conllu.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Conllu } from './conllu.service';
import { MatDialog } from '@angular/material/dialog';
import { ValueListComponent } from './value-list/value-list.component';
import { TokenComponent } from './token/token.component';

/**
 * * Displays a form for one sentence.
 * * Changes the content whenever the sentence index changes.
 * * Is destroyed when other annotations are displayed.
 */
@Component({
  selector: 'app-conllu',
  templateUrl: './conllu.component.html',
  styleUrls: ['./conllu.component.scss']
})
export class ConlluComponent implements OnInit, OnDestroy {

  displayedColumns = ['index', 'token', 'lemma', 'upos', 'xpos', 'feat', 'head', 'deprel', 'deps', 'misc', 'edit'];

  // conllTokensArrayForm: FormArray;

  uposList: UPos[] = UPOS;
  udeprelList: UDeprel[] = UDEPREL;
  ufeatList: UFeats[] = UFEATS;

  sentenceLength: number;
  sentenceLengthIndexes: number[];

  sentence: ConllToken[];

  private ondestroy$: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, private conlluService: Conllu, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.conlluService.sentence$.pipe(takeUntil(this.ondestroy$)).subscribe(sentence => {
      this.sentence = sentence;
      this.sentenceLength = sentence.length;
      this.sentenceLengthIndexes = [...Array(this.sentenceLength).keys()].map(i => i++);
      // this.conllTokensArrayForm = this.fb.array([]);
      // sentence.forEach((conlltoken: ConllToken) => {
      //   this.conllTokensArrayForm.push(this.fb.group(new ConllTokenForm(conlltoken)));
      // });
      console.log('this.sentenceLength', this.sentenceLength);
      console.log('this.sentenceLengthIndexes', this.sentenceLengthIndexes);
    });
  }

  ngOnDestroy(): void {
    console.log(`unsubscribed ondestroyed`);

    this.ondestroy$.next();
  }

  @Input() set currentSentenceIndex(sentenceIndex: number) {
    console.log(sentenceIndex);

    this.conlluService.moveSentence(sentenceIndex);
  }

  editToken(index) {
    console.log(index);
    const dialogRef = this.dialog.open(TokenComponent, {
      width: '100%',
      data: { conlluToken: this.sentence[index], nbTokens: this.sentenceLengthIndexes }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  // openFeatDialog(tag: string, index: number): void {
  //   const dialogRef = this.dialog.open(ValueListComponent, {
  //     width: '600px',
  //     data: { tag, tags: this.ufeatList, separator: '|', equality: '=' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);
  //     result = result === undefined ? tag : result;
  //     this.conllTokensArrayForm.at(index).get('feat').patchValue(result);
  //   });
  // }

  // openDepsDialog(tag: string, index: number): void {
  //   const tags = [];
  //   this.sentenceLengthIndexes.forEach(nb => tags.push({ tag: nb, values: this.udeprelList }));
  //   const dialogRef = this.dialog.open(ValueListComponent, {
  //     width: '600px',
  //     data: { tag, tags, separator: '|', equality: ':' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);
  //     result = result === undefined ? tag : result;
  //     this.conllTokensArrayForm.at(index).get('deps').patchValue(result);
  //   });
  // }
}
