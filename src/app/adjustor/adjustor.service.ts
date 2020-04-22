import { Injectable } from '@angular/core';
import { StoreService } from '../store.service';
import { Annotation } from '../annotators/annotations';
import { Observable } from 'rxjs';

@Injectable()
export class AdjustorService {

  constructor(private storeService: StoreService) { }

  get sentences() { return this.storeService.rawContent; }

  duplicateSent(isent: number) {
    this.storeService.rawContent.splice(isent, 0, this.storeService.rawContent[isent]);

  }
  deleteSent(isent: number) {
    this.storeService.rawContent.splice(isent, 1);
  }
  newAbove(isent: number) {
    this.storeService.rawContent.splice(isent, 0, ['~']);
  }
  newBelow(isent: number) {
    this.storeService.rawContent.splice(isent + 1, 0, ['~']);
  }

  duplicateTok(isent: number, itok: number) {
    const token = this.storeService.rawContent[isent][itok];
    this.storeService.rawContent[isent].splice(itok, 0, token);
  }

  newLeft(isent: number, itok: number) {
    this.storeService.rawContent[isent].splice(itok, 0, '~');
  }

  newRight(isent: number, itok: number) {
    this.storeService.rawContent[isent].splice(itok + 1, 0, '~');
  }

  edit(isent: number, itok: number, value: string) {
    this.storeService.rawContent[isent].splice(itok, 1, value);
  }

  deleteTok(isent: number, itok: number) {
    console.log(this.storeService.rawContent[isent]);

    this.storeService.rawContent[isent].splice(itok, 1);
    if (this.storeService.rawContent[isent].length === 0) {
      this.deleteSent(isent);
    }
  }

  push() {
  }
}
