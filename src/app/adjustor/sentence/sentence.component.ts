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
  @Input() isent: number;

  constructor(private adjustorService: AdjustorService) { }

  ngOnInit(): void { }

  moveWithinSentence(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sentence, event.previousIndex, event.currentIndex);
  }

  duplicate() {
    this.adjustorService.duplicateSent(this.isent);
  }

  delete() {
    this.adjustorService.deleteSent(this.isent);
  }
  newAbove() {
    this.adjustorService.newAbove(this.isent);
  }
  newBelow() {
    this.adjustorService.newBelow(this.isent);
  }

}
