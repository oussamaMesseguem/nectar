import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { AdjustorService } from '../adjustor.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  @Input() itoken: number;
  @Input() token: string;

  /**
   * Display either the button or the input
   */
  inEditing = false;

  /**
   * The input to edit the token
   * Used to close it when not needed
   */
  @ViewChild('newinput')
  newinput: ElementRef;

  /**
   * When editing the original token is displayed in the mat-label
   */
  originalToken: string;

  /**
   * To close the subscription to the click event when editing.
   */
  subscription: Subscription;

  constructor(private adjustorService: AdjustorService) { }

  ngOnInit(): void {
  }

  delete() {
    this.adjustorService.deleteToken(this.itoken);
  }

  duplicate() {
    this.adjustorService.duplicateToken(this.itoken);
  }

  edit() {
    this.adjustorService.editToken(this.itoken, this.token);
    this.inEditing = false;
    this.subscription.unsubscribe();
  }

  /**
   * Listen to a click aywhere in the document but the input
   * If so: close the input.
   */
  editing() {
    this.originalToken = this.token;
    this.inEditing = true;
    const source: Observable<Event> = fromEvent(document, 'click').pipe(skip(1));
    this.subscription = source.subscribe(next => {
      if (!this.newinput.nativeElement.contains(next.target)) {
        this.edit();
      }
    });
  }

  newAfter() {
    this.adjustorService.newTokenAfter(this.itoken);
  }

  newBefore() {
    this.adjustorService.newTokenBefore(this.itoken);
  }
}
