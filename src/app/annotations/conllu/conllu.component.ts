import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ConllToken } from './conllu.model';
import { FormBuilder } from '@angular/forms';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Conllu } from './conllu.service';
import { MatDialog } from '@angular/material/dialog';
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
  sentenceLengthIndexes: number[];
  sentenceIndex: number;

  private sentence: BehaviorSubject<ConllToken[]> = new BehaviorSubject([]);
  sentence$: Observable<ConllToken[]> = this.sentence.asObservable();

  private ondestroy$: Subject<any> = new Subject();

  constructor(private conlluService: Conllu, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.conlluService.sentence$.pipe(takeUntil(this.ondestroy$)).subscribe(sentence => {
      this.sentence.next(sentence);
      this.sentenceLengthIndexes = [...Array(sentence.length).keys()].map(i => i++);
    });
  }

  /**
   * Need to unsubscribe when the annoatation view changes
   */
  ngOnDestroy(): void {
    this.ondestroy$.next();
  }

  /**
   * Gets the sentence at the given index
   */
  @Input() set currentSentenceIndex(sentenceIndex: number) {
    this.sentenceIndex = sentenceIndex;
    this.conlluService.moveSentence(sentenceIndex);
  }

  /**
   * Opens a dialog to fillform the token.
   * The result may be undefined when closed from outside the button.
   * @param index the index of the token in the sentence
   */
  editToken(index: number) {
    console.log(index);
    const dialogRef = this.dialog.open(TokenComponent, {
      width: '100%',
      data: { conlluToken: this.sentence.value[index], nbTokens: this.sentenceLengthIndexes }
    });

    /**
     * After closed if a value is sent:
     * the array is updated
     * and the subject notifies the change to the table
     */
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.sentence.value[index] = result;
        this.sentence.next(this.sentence.value);
      }
    });
  }
}
