import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
  nbTokens: number[];
  conlluTokenForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<TokenComponent>,
              @Inject(MAT_DIALOG_DATA) public conlluDialog: ConlluDialog,
              public dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.conlluTokenForm = this.fb.group(new ConllTokenForm(this.conlluDialog.conlluToken));
    this.nbTokens = [...Array(this.conlluDialog.nbTokens).keys()].map(i => i++);
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
    this.nbTokens.forEach(nb => tags.push({ tag: nb, values: this.udeprelList }));
    const dialogRef = this.dialog.open(ValueListComponent, {
      width: '600px',
      data: { tag, tags, separator: '|', equality: ':' }
    });

    dialogRef.afterClosed().subscribe(result => {
      result = result === undefined ? tag : result;
      this.conlluTokenForm.get('deps').setValue(result);
    });
  }

  format(): ConlluToken {
    return this.conlluTokenForm.value;
  }

}

/**
 * A form for the Conllu Token
 */
class ConllTokenForm {
  index = new FormControl();
  token = new FormControl();
  lemma = new FormControl();
  upos = new FormControl();
  xpos = new FormControl();
  feat = new FormControl();
  head = new FormControl();
  deprel = new FormControl();
  deps = new FormControl();
  misc = new FormControl();

  constructor(conll: ConlluToken) {
      this.index.setValue(conll.index);
      this.token.setValue(conll.token);
      this.lemma.setValue(conll.lemma);
      this.upos.setValue(conll.upos);
      this.xpos.setValue(conll.xpos);
      this.feat.setValue(conll.feat);
      this.head.setValue(conll.head);
      this.deprel.setValue(conll.deprel);
      this.deps.setValue(conll.deps);
      this.misc.setValue(conll.misc);
  }
}