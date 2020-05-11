import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() itokenHasChanged: EventEmitter<number> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  /**
   * Opens a dialog to fillform the token.
   * @param index the index of the token in the sentence
   */
  editToken(index: number) {
    this.dialog.open(TokenComponent, {
      width: '100%',
      data: {
        conlluToken: this.sentence$.value[index],
        nbTokens: this.sentence$.value.length
      }
    });
  }

  /**
   * Notify Store that a vaalue has hanged to update other annotations
   * @param itoken the token index
   */
  tokenValuesHaveChanged(itoken: number) {
    this.itokenHasChanged.emit(itoken);
  }
}
