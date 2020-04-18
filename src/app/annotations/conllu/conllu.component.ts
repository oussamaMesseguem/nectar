import { Component, OnInit, Input } from '@angular/core';
import { ConllToken } from './conllu.model';
import { Subject, Observable } from 'rxjs';
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
export class ConlluComponent implements OnInit {

  displayedColumns = ['index', 'token', 'lemma', 'upos', 'xpos', 'feat', 'head', 'deprel', 'deps', 'misc', 'edit'];

  sentence$: Observable<ConllToken[]>;

  constructor(private conlluService: Conllu, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sentence$ = this.conlluService.sentence$;
  }

  /**
   * Gets the sentence at the given index
   */
  @Input() set currentSentenceIndex(sentenceIndex: number) {
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
      data: {
        conlluToken: this.conlluService.getTokenCurrentSentence(index),
        nbTokens: this.conlluService.currentSentenceLength()
      }
    });

    /**
     * After closed if a value is sent:
     * the array is updated
     * and the subject notifies the change to the table
     */
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.conlluService.updateTokenCurrentSentence(index, result);
      }
    });
  }
}
