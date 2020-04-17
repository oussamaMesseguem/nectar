import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConllToken, ConllTokenForm, UPos, UPOS, UDeprel, UDEPREL, UFeats, UFEATS } from './conllu.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Conllu } from './conllu.service';
import { MatDialog } from '@angular/material/dialog';
import { ValueListComponent } from './value-list/value-list.component';

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
  displayedColumns = ['index', 'token', 'lemma', 'upos', 'xpos', 'feat', 'head', 'deprel', 'deps', 'misc'];

  conllTokensArrayForm: FormArray;

  uposList: UPos[] = UPOS;
  udeprelList: UDeprel[] = UDEPREL;
  ufeatList: UFeats[] = UFEATS;

  sentencesLength: number[];

  private ondestroy$: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, private conlluService: Conllu, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.conllTokensArrayForm = this.fb.array([]);

    this.conlluService.sentence$.pipe(takeUntil(this.ondestroy$)).subscribe(sentence => {
      this.sentencesLength = [...Array(sentence.length).keys()].map(n => n + 1);
      sentence.forEach((conlltoken: ConllToken) => {
        this.conllTokensArrayForm.push(this.fb.group(new ConllTokenForm(conlltoken)));
      });
    });

    this.conllTokensArrayForm.valueChanges.pipe(takeUntil(this.ondestroy$)).subscribe(v => console.log(v));
  }

  ngOnDestroy(): void {
    console.log(`unsubscribed ondestroyed`);
    
    this.ondestroy$.next();
  }

  openFeatDialog(tag: string, index: number): void {
    const dialogRef = this.dialog.open(ValueListComponent, {
      width: '600px',
      data: { tag, tags: this.ufeatList, separator: '|', equality: '=' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      result = result === undefined ? tag : result;
      this.conllTokensArrayForm.at(index).get('feat').patchValue(result);
    });
  }

  openDepsDialog(tag: string, index: number): void {
    const tags = [];
    this.sentencesLength.forEach(nb => tags.push({ tag: nb, values: this.udeprelList }));
    const dialogRef = this.dialog.open(ValueListComponent, {
      width: '600px',
      data: { tag, tags, separator: '|', equality: ':' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      result = result === undefined ? tag : result;
      this.conllTokensArrayForm.at(index).get('deps').patchValue(result);
    });
  }
}
