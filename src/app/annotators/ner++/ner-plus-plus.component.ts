import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TokenComponent } from './token/token.component';
import { NerPlusPlusToken } from './nerPlusPlus.model';

@Component({
  selector: 'app-ner-plus-plus',
  templateUrl: './ner-plus-plus.component.html',
  styleUrls: ['./ner-plus-plus.component.scss']
})
export class NerPlusPlusComponent implements OnInit {

  displayedColumns = ['token', 'pos', 'chunk', 'shortShape', 'label'];

  @Input() sentence$: BehaviorSubject<NerPlusPlusToken[]>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Opens a dialog to fillform the token.
   * @param index the index of the token in the sentence
   */
  editToken(index: number) {
    this.dialog.open(TokenComponent, {
      width: '100%',
      data: {
        token: this.sentence$.value[index]
      }
    });
  }
}
