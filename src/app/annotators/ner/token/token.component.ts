import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NerToken, NER_TAG_COLOR } from '../ner.model';
import { NerTokenColor } from '../ner.component';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit, OnChanges {

  @Input() token: NerToken;

  /**
   * The color changes when type and tag are selected
   */
  @Input() labelColor: string;

  /**
   * Either display button or input
   * isTagged: input, so that label is displayed
   */
  isTagged = false;

  constructor() { }


  ngOnInit(): void {
    if (this.token.tag !== undefined && this.token.tag.length > 0) {
      this.labelColor = NER_TAG_COLOR[this.token.type];
      this.isTagged = true;
    }
  }

  /**
   * Used to update the color after tagging
   * @param changes the inputs
   */
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (this.token.tag !== undefined && this.token.tag.length > 0) {
      this.labelColor = NER_TAG_COLOR[this.token.type];
      this.isTagged = true;
    }
  }
}
