import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { InjectionService } from '../../injection.service';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.scss']
})
export class SentenceComponent implements OnInit {

  @Input() sentence: string[];
  @Input() isent: number;

  expand = false;

  constructor(private injectionService: InjectionService) { }

  ngOnInit(): void {
    console.log(this.sentence);

  }

  moveWithinSentence(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sentence, event.previousIndex, event.currentIndex);
  }

  duplicate() {
    this.injectionService.duplicateSent(this.isent);
  }

  delete() {
    this.injectionService.deleteSent(this.isent);
  }
  newAbove() {
    this.injectionService.newAbove(this.isent);
  }
  newBelow() {
    this.injectionService.newBelow(this.isent);
  }

}
