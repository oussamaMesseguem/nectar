import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConlluToken, UPos, UDeprel, UFeats, UPOS, UDEPREL, UFEATS } from '../conllu.model';
import { ValueListComponent } from '../value-list/value-list.component';

/**
 * The exchanged data to filform conllu token.
 * * the conllu token itself.
 * * An array of the number of tokens in the sentence.
 */
export interface ConlluDialog {
  conlluToken: ConlluToken;
  nbTokens: number;
}

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  uposList: UPos[] = UPOS;
  udeprelList: UDeprel[] = UDEPREL;
  ufeatList: UFeats[] = UFEATS;
  tokensIndexes: string[];

  constructor(public dialogRef: MatDialogRef<TokenComponent>,
              @Inject(MAT_DIALOG_DATA) public conlluDialog: ConlluDialog,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.tokensIndexes = [...Array(this.conlluDialog.nbTokens).keys()].map(i => i += 1).map(i => i.toString());
  }

  openFeatDialog(): void {
    const tag = this.conlluDialog.conlluToken.feat;
    const dialogRef = this.dialog.open(ValueListComponent, {
      width: '600px',
      data: { tag, tags: this.ufeatList, separator: '|', equality: '=' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.conlluDialog.conlluToken.feat = result;
      }
    });
  }

  openDepsDialog(): void {
    const tags = [];
    const tag = this.conlluDialog.conlluToken.deps;
    this.tokensIndexes.forEach(nb => tags.push({ tag: nb, values: this.udeprelList }));
    const dialogRef = this.dialog.open(ValueListComponent, {
      width: '600px',
      data: { tag, tags, separator: '|', equality: ':' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.conlluDialog.conlluToken.deps = result;
      }
    });
  }
}
