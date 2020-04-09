import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { InjectionService } from '../injection.service';


@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.scss']
})
export class AdjustmentComponent implements OnInit {

  // sentences: string[][];
  sentences: string[][] = [
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', '.'],
    ['je', 'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi', 'je', 'suis', 'le',
      'roi', 'je', 'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi',
      'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi', 'je', 'suis', 'le',
      'roi', 'je', 'suis', 'le', 'roi', 'je', 'suis', 'le', 'roi', '!']
  ];

  constructor(private injectionService: InjectionService) { }

  ngOnInit(): void {
    try {
      // this.injectionService.sentences2 = this.sentences;
      this.sentences = this.injectionService.sentences();
    } catch (error) {
    }
  }

}
