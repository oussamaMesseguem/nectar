import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdjustorService } from '../adjustor.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.scss']
})
export class SentenceComponent implements OnInit {

  @Input() sentence: string[];
  @Input() isentence: number;

  constructor(private adjustorService: AdjustorService) { }

  ngOnInit(): void { }

  moveWithinSentence(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sentence, event.previousIndex, event.currentIndex);
  }

  duplicate() {
    this.adjustorService.duplicateSentence(this.isentence);
  }

  delete() {
    this.adjustorService.deleteSentence(this.isentence);
  }

  newBefore() {
    this.adjustorService.newSentenceBefore(this.isentence);
  }

  newAfter() {
    this.adjustorService.newSentenceAfter(this.isentence);
  }
}
