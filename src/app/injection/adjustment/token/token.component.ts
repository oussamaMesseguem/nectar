import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { InjectionService } from '../../injection.service';
import { fromEvent, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  @Input() token: string;
  @Input() isent: number;
  @Input() itok: number;

  /**
   * The input to edit the token
   * Used to close it when not needed
   */
  @ViewChild('newinput')
  newinput: ElementRef;

  inEditing = false;

  constructor(private injectionService: InjectionService) { }

  ngOnInit(): void {
  }

  duplicate() {
    this.injectionService.duplicateTok(this.isent, this.itok);
  }

  newLeft() {
    this.injectionService.newLeft(this.isent, this.itok);
  }

  newRight() {
    this.injectionService.newRight(this.isent, this.itok);
  }

  edit() {
    this.injectionService.edit(this.isent, this.itok, this.token);
    this.inEditing = !this.inEditing;
  }

  delete() {
    this.injectionService.deleteTok(this.isent, this.itok);
  }

  /**
   * Listen to a click aywhere in the document but the input
   * If so: close the input.
   */
  listenClick() {
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
