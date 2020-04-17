import { Component, OnInit, Input } from '@angular/core';
import { Ner } from './ner.service';
import { NerToken } from './ner.model';

@Component({
  selector: 'app-ner',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.scss']
})
export class NerComponent implements OnInit {

  sentence: NerToken[];

  constructor(private nerService: Ner) { }

  ngOnInit(): void {
    this.nerService.sentence$.subscribe(sentence => this.sentence = sentence);
  }

  @Input() set currentSentenceIndex(sentenceIndex: number) {
    console.log(sentenceIndex);

    this.nerService.moveSentence(sentenceIndex);
  }

}
