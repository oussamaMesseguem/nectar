import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdjustorService } from '../adjustor.service';
import { BehaviorSubject } from 'rxjs';
import { Tokenable } from 'src/app/annotators/annotations';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.scss']
})
export class SentenceComponent implements OnInit {

  @Input() sentence$: BehaviorSubject<Tokenable[]>;

  constructor(private adjustorService: AdjustorService) { }

  ngOnInit(): void { }

  moveWithinSentence(event: CdkDragDrop<Tokenable[]>) {
    // moveItemInArray(this.sentence, event.previousIndex, event.currentIndex);
  }

  duplicate() {
    this.adjustorService.duplicateSentence();
  }

  delete() {
    this.adjustorService.deleteSentence();
  }

  newBefore() {
    this.adjustorService.newSentenceBefore();
  }

  newAfter() {
    this.adjustorService.newSentenceAfter();
  }
}
