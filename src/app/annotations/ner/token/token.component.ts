import { Component, OnInit, Input } from '@angular/core';
import { NerToken, NerTags, NerTypes } from '../ner.model';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  @Input() token: NerToken;
  /**
   * Temporary type. Used to save what menu type has been opened
   */
  tmpType: string;

  constructor() { }

  ngOnInit(): void {
  }

  get tags() {
    return NerTags;
  }

  get types() {
    return NerTypes;
  }

  /**
   * Called after click,
   * tag and temporary type are set
   * @param tag The tag
   */
  setTag(tag: string) {
    this.token.tag = tag;
    this.token.type = this.tmpType;
  }

  /**
   * The type remains temporary until it's set by the tag after click
   * @param type the type
   */
  setType(type: string) {
    this.tmpType = type;
  }
}
