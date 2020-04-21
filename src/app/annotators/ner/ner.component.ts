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

  /**
   * Emitter to update the view after tags have been set.
   * The value doesn't matter as children get notifed when
   * the value changes.
   */
  update = false;

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
    this.update = !this.update;
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
