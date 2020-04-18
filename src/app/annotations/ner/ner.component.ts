import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Ner } from './ner.service';
import { NerToken } from './ner.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ner',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.scss']
})
export class NerComponent implements OnInit, OnDestroy {

  sentence: NerToken[];

  private ondestroy$: Subject<any> = new Subject();

  constructor(private nerService: Ner) { }

  ngOnInit(): void {
    this.nerService.sentence$.pipe(takeUntil(this.ondestroy$)).subscribe(sentence => this.sentence = sentence);
  }

  /**
   * Need to unsubscribe when the annoatation view changes
   */
  ngOnDestroy(): void {
    this.ondestroy$.next();
  }

  @Input() set currentSentenceIndex(sentenceIndex: number) {
    this.nerService.moveSentence(sentenceIndex);
  }

}
