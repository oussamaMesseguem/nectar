import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConllToken, UPos, UDeprel, UFeats, UPOS, UDEPREL, UFEATS, ConllTokenForm } from '../conllu.model';
import { ValueListComponent } from '../value-list/value-list.component';

export interface ConlluDialog {
  conlluToken: ConllToken;
  nbTokens: number[];
}

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  displayedColumns = ['index', 'token', 'lemma', 'upos', 'xpos', 'feat', 'head', 'deprel', 'deps', 'misc'];

  uposList: UPos[] = UPOS;
  udeprelList: UDeprel[] = UDEPREL;
  ufeatList: UFeats[] = UFEATS;

  conllTokensArrayForm = this.fb.array([]);

  constructor(public dialogRef: MatDialogRef<TokenComponent>,
              @Inject(MAT_DIALOG_DATA) public conlluDialog: ConlluDialog,
              public dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.conlluDialog);
    // this.conllTokensArrayForm = this.fb.group(new ConllTokenForm(this.conlluDialog.conlluToken));
    this.conllTokensArrayForm.push(this.fb.group(new ConllTokenForm(this.conlluDialog.conlluToken)));
    // this.conlluDialog.conlluToken.forEach((conlltoken: ConllToken) => {
    // });
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
    this.conlluDialog.nbTokens.forEach(nb => tags.push({ tag: nb, values: this.udeprelList }));
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
