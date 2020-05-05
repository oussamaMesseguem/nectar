import { Component, OnInit, Input } from '@angular/core';
import { ConlluToken } from './conllu.model';
import { BehaviorSubject } from 'rxjs';
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

  displayedColumns = ['index', 'token', 'lemma', 'upos', 'xpos', 'feat', 'head', 'deprel', 'deps', 'misc'];

  @Input() sentence$: BehaviorSubject<ConlluToken[]>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  /**
   * Opens a dialog to fillform the token.
   * The result may be undefined when closed from outside the button.
   * @param index the index of the token in the sentence
   */
  editToken(index: number) {
    const dialogRef = this.dialog.open(TokenComponent, {
      width: '100%',
      data: {
        conlluToken: this.sentence$.value[index],
        nbTokens: this.sentence$.value.length
      }
    });

    /**
     * After closed if a value is sent:
     * the array is updated
     * and the subject notifies the change to the table
     */
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.sentence$.value[index] = result;
        this.sentence$.next(this.sentence$.value);
      }
    });
  }
}
