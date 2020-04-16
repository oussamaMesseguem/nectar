import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

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

  /**
   * The form control for one row
   */
  @Input() ctrl: FormControl;
  /**
   * The tags
   */
  @Input() tags: [
    {
      tag: string;
      name: string;
      values: [
        { tag: string, name: string }
      ]
    }
  ];
  /**
   * Emitted row when removed
   */
  @Output() removed: EventEmitter<void> = new EventEmitter();

  values: BehaviorSubject<any[]> = new BehaviorSubject([]);
  values$: Observable<any[]> = this.values.asObservable();

  constructor() { }

  ngOnInit(): void {
    // When the key-tag changes the proposed values change accordingly
    this.ctrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(tag => {
        this.values.next(this.tags.filter(t => t.tag === tag.key).map(t => t.values)[0]);
      });
  }

  /**
   * Emits the signal to remove self
   */
  remove() {
    this.removed.emit();
  }
}
