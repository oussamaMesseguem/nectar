import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConllToken, UPos, UDeprel, UFeats, UPOS, UDEPREL, UFEATS, ConllTokenForm } from '../conllu.model';
import { ValueListComponent } from '../value-list/value-list.component';

/**
 * The exchanged data to filform conllu token.
 * * the conllu token itself.
 * * An array of the number of tokens in the sentence.
 */
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

  uposList: UPos[] = UPOS;
  udeprelList: UDeprel[] = UDEPREL;
  ufeatList: UFeats[] = UFEATS;

  conlluTokenForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<TokenComponent>,
              @Inject(MAT_DIALOG_DATA) public conlluDialog: ConlluDialog,
              public dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.conlluTokenForm = this.fb.group(new ConllTokenForm(this.conlluDialog.conlluToken));
  }

  openFeatDialog(): void {
    const tag = this.conlluTokenForm.get('feat').value;
    const dialogRef = this.dialog.open(ValueListComponent, {
      width: '600px',
      data: { tag, tags: this.ufeatList, separator: '|', equality: '=' }
    });

    dialogRef.afterClosed().subscribe(result => {
      result = result === undefined ? tag : result;
      this.conlluTokenForm.get('feat').setValue(result);
    });
  }

  openDepsDialog(): void {
    const tags = [];
    const tag = this.conlluTokenForm.get('deps').value;
    this.conlluDialog.nbTokens.forEach(nb => tags.push({ tag: nb, values: this.udeprelList }));
    const dialogRef = this.dialog.open(ValueListComponent, {
      width: '600px',
      data: { tag, tags, separator: '|', equality: ':' }
    });

    dialogRef.afterClosed().subscribe(result => {
      result = result === undefined ? tag : result;
      this.conlluTokenForm.get('deps').setValue(result);
    });
  }

  format(): ConllToken {
    return this.conlluTokenForm.value;
  }

}
