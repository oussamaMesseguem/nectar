import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-index-list',
  templateUrl: './index-list.component.html',
  styleUrls: ['./index-list.component.scss']
})
export class IndexListComponent implements OnInit {

  @Input() indexes: number[];
  @Input() currentIndex: number;
  displayedRange: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.makeDisplayedRange();
  }

  previous() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.indexes.length - 1;
    } else {
      this.currentIndex = this.currentIndex - 1;
    }
    this.makeDisplayedRange();
  }

  next() {
    if (this.currentIndex === this.indexes.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = this.currentIndex + 1;
    }
    this.makeDisplayedRange();
  }

  move(idx: number) {
    this.currentIndex = idx;
    this.makeDisplayedRange();
  }

  private makeDisplayedRange() {
    this.displayedRange[2] = this.currentIndex;
    if (this.currentIndex === 0) {
      this.displayedRange[0] = this.indexes[this.indexes.length - 2];
      this.displayedRange[1] = this.indexes[this.indexes.length - 1];
      this.displayedRange[3] = this.indexes[this.currentIndex + 1];
      this.displayedRange[4] = this.indexes[this.currentIndex + 2];
    } else if (this.currentIndex === this.indexes.length - 1) {
      this.displayedRange[0] = this.indexes[this.currentIndex - 2];
      this.displayedRange[1] = this.indexes[this.currentIndex - 1];
      this.displayedRange[3] = this.indexes[0];
      this.displayedRange[4] = this.indexes[1];
    } else if (this.currentIndex === 1) {
      this.displayedRange[0] = this.indexes[this.indexes.length - 1];
      this.displayedRange[1] = this.indexes[this.currentIndex - 1];
      this.displayedRange[3] = this.indexes[this.currentIndex + 1];
      this.displayedRange[4] = this.indexes[this.currentIndex + 2];
    } else if (this.currentIndex === this.indexes.length - 2) {
      this.displayedRange[0] = this.indexes[this.currentIndex - 2];
      this.displayedRange[1] = this.indexes[this.currentIndex - 1];
      this.displayedRange[3] = this.indexes[this.indexes.length - 1];
      this.displayedRange[4] = this.indexes[0];
    } else {
      this.displayedRange[0] = this.indexes[this.currentIndex - 2];
      this.displayedRange[1] = this.indexes[this.currentIndex - 1];
      this.displayedRange[3] = this.indexes[this.currentIndex + 1];
      this.displayedRange[4] = this.indexes[this.currentIndex + 2];
    }
    console.log(this.displayedRange);
  }


}
