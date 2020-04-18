import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Ner } from './ner.service';
import { NerToken } from './ner.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ner',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.scss']
})
export class NerComponent implements OnInit {

  sentence$: Observable<NerToken[]>;

  constructor(private nerService: Ner) { }

  ngOnInit(): void {
    this.sentence$ = this.nerService.sentence$;
  }


  @Input() set currentSentenceIndex(sentenceIndex: number) {
    this.nerService.moveSentence(sentenceIndex);
  }

}
