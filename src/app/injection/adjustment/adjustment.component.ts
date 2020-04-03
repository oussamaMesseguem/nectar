import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.scss']
})
export class AdjustmentComponent implements OnInit {

  sentences: string[][] = [
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi',
      'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi', '!']
  ];

  constructor() { }

  ngOnInit(): void {
  }

  moveWithinSentence(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
