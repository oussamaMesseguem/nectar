import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NerPlusPlusToken } from '../nerPlusPlus.model';
import { UPos, UPOS } from 'src/app/annotators/conllu/conllu.model';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: NerPlusPlusDialogData) { }

  ngOnInit(): void {
  }

}
