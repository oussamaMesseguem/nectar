import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NerPlusPlusToken } from '../nerPlusPlus.model';
import { UPos, UPOS } from '../../conllu/conllu.model';
import { NerTags, NerTypes } from '../../ner/ner.model';

export interface NerPlusPlusDialogData {
  token: NerPlusPlusToken;
}

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  uposList: UPos[] = UPOS;
  tmpType: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: NerPlusPlusDialogData) { }

  ngOnInit(): void {
  }

  get tags() {
    return NerTags;
  }

  get types() {
    return NerTypes;
  }

  setType(type: string) {
    this.tmpType = type;
  }

  setTag(tag: string) {
    this.dialogData.token.label = `${tag}-${this.tmpType}`;
  }
}
