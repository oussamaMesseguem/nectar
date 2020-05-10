import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NerToken, NerTags, NerTypes } from './ner.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ner',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.scss']
})
export class NerComponent implements OnInit {

  @Input() sentence$: BehaviorSubject<NerToken[]>;
  @Output() itokenHasChanged: EventEmitter<number> = new EventEmitter();

  private currentTokenIndex: number;
  /**
   * Temporary type. Used to save what menu type has been opened
   */
  private tmpType: string;

  /**
   * Emitter to update the view after tags have been set.
   * The value doesn't matter as children get notifed when
   * the value changes.
   */
  update = false;

  constructor() { }

  ngOnInit(): void { }

  get index(): number {
    return this.currentTokenIndex;
  }

  /**
   * So that we know which token has been clicked
   * @param index The current token index in the sentence
   */
  set index(index: number) {
    this.currentTokenIndex = index;
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
    const token = this.sentence$.value[this.currentTokenIndex];
    token.label = `${tag}-${this.tmpType}`;
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
   * Notify Store that a vaalue has hanged to update other annotations
   * @param itoken the token index
   */
  tokenValuesHaveChanged(itoken: number) {
    this.itokenHasChanged.emit(itoken);
  }
}
