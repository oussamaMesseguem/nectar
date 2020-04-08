import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { InjectionService } from '../../injection.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  @Input() token: string;
  @Input() isent: number;
  @Input() itok: number;

  constructor(private injectionService: InjectionService) { }

  ngOnInit(): void {
  }

  duplicate() {
    this.injectionService.duplicate(this.isent, this.itok);
  }

  newLeft() {
    this.injectionService.newLeft(this.isent, this.itok);
  }

  newRight() {
    this.injectionService.newRight(this.isent, this.itok);
  }

  changeValue() {
    this.injectionService.changeValue(this.isent, this.itok, 'new item');
  }

  delete() {
    this.injectionService.delete(this.isent, this.itok);
  }
}
