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
}
