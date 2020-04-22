import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { AdjustorService } from '../adjustor.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  @Input() isentence: number;
  @Input() itoken: number;
  @Input() token: string;
  /**
   * When editing the original token is displayed in the mat-label
   */
  originalToken: string;

  /**
   * The input to edit the token
   * Used to close it when not needed
   */
  @ViewChild('newinput')
  newinput: ElementRef;

  inEditing = false;

  constructor(private adjustorService: AdjustorService) { }

  ngOnInit(): void {
  }

  duplicate() {
    this.adjustorService.duplicateToken(this.isentence, this.itoken);
  }

  newBefore() {
    this.adjustorService.newTokenBefore(this.isentence, this.itoken);
  }

  newAfter() {
    this.adjustorService.newTokenAfter(this.isentence, this.itoken);
  }

  edit() {
    this.adjustorService.editToken(this.isentence, this.itoken, this.token);
    this.inEditing = !this.inEditing;
  }

  delete() {
    this.adjustorService.deleteToken(this.isentence, this.itoken);
  }

  /**
   * Listen to a click aywhere in the document but the input
   * If so: close the input.
   */
  listenClick() {
    this.originalToken = this.token;
    this.inEditing = !this.inEditing;
    const source: Observable<Event> = fromEvent(document, 'click').pipe(skip(1));
    const s = source.subscribe(next => {
      if (!this.newinput.nativeElement.contains(next.target)) {
        this.edit();
        s.unsubscribe();
      }
    });
  }
}
