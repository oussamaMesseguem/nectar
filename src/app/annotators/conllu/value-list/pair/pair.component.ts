import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * Manages the proposed keys and values for pairs
 * It's a little greedy though as values may be duplicated
 * for each key.
 * But Feat property works this way
 */
@Component({
  selector: 'app-pair',
  templateUrl: './pair.component.html',
  styleUrls: ['./pair.component.scss']
})
export class PairComponent implements OnInit {

  tagValue: string;
  valueValue: string;
  /**
   * The tags
   */
  @Input() tags:
    {
      tag: string;
      name: string;
      values: { tag: string, name: string }[]
    }[];
  /**
   * Emitted row when removed
   */
  @Output() removed: EventEmitter<void> = new EventEmitter();
  /**
   * Emitter for the tag
   */
  @Output() tagChanged: EventEmitter<string> = new EventEmitter();
  /**
   * Emmitter for the value
   */
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  /**
   * Returns the value of the tag
   */
  get tag(): string { return this.tagValue; }
  /**
   * Sets the value of the tag and emits the new value.
   */
  @Input() set tag(tag: string) {
    if (tag !== this.tagValue) {
      this.tagChanged.emit(tag);
    }
    this.tagValue = tag;
  }

  /**
   * Returns the value of the value.
   */
  get value(): string { return this.valueValue; }
  /**
   * Sets the value of the value and emits the new value.
   */
  @Input() set value(value: string) {
    if (value !== this.valueValue) {
      this.valueChanged.emit(value);
    }
    this.valueValue = value;
  }

  /**
   * Returns the possible values for the current tag.
   */
  get values(): any[] {
    return this.tags.filter(t => t.tag === this.tag).map(t => t.values)[0];
  }

  /**
   * Emits the signal to remove self
   */
  remove() {
    this.removed.emit(null);
  }
}
