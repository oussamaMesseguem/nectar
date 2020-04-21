import { Component, OnInit, Input } from '@angular/core';
import { Ner } from './ner.service';
import { NerToken, NerTags, NerTypes, NER_TAG_COLOR } from './ner.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ner',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.scss']
})
export class NerComponent implements OnInit {

  @Input() sentence$: BehaviorSubject<NerToken[]>;

  currentTokenIndex: number;
  /**
   * Temporary type. Used to save what menu type has been opened
   */
  tmpType: string;

  /**
   * The color changes when type and tag are selected
   */
  labelColor: string;

  constructor() { }

  ngOnInit(): void { }

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
    const token = this.sentence$.value[this.currentTokenIndex];
    token.tag = tag;
    token.type = this.tmpType;
    // token.color = NER_TAG_COLOR[token.type];
    this.labelColor = NER_TAG_COLOR[token.type];
    this.sentence$.next(this.sentence$.value);
    console.log(this.sentence$.value);
    
  }

  /**
   * The type remains temporary until it's set by the tag after click
   * @param type the type
   */
  setType(type: string) {
    this.tmpType = type;
  }

  /**
   * So that we know which token has been clicked
   * @param index The current token index in the sentence
   */
  setCurrentIndex(index: number) {
    this.currentTokenIndex = index;
  }
}

export interface NerTokenColor extends NerToken{
  color: string;
}
