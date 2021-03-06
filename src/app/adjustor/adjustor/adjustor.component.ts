import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AdjustorService } from '../adjustor.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Tokenable } from 'src/app/annotators/annotations';


@Component({
  selector: 'app-adjustor',
  templateUrl: './adjustor.component.html',
  styleUrls: ['./adjustor.component.scss']
})
export class AdjustorComponent implements OnInit, OnDestroy {

  @Input() sentence$: BehaviorSubject<Tokenable[]>;

  nextSentence: Tokenable[];
  previousSentence: Tokenable[];

  ondestroy: Subject<boolean> = new Subject();

  constructor(private adjustorService: AdjustorService) { }

  ngOnInit(): void {
    this.sentence$.pipe(takeUntil(this.ondestroy)).subscribe(next => {
      [this.previousSentence, this.nextSentence] = this.adjustorService.getPreviousAndNextSentences();
    });
  }

  ngOnDestroy(): void {
    this.ondestroy.complete();
  }
}
