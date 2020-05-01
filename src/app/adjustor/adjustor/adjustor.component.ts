import { Component, OnInit, Input } from '@angular/core';
import { AdjustorService } from '../adjustor.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-adjustor',
  templateUrl: './adjustor.component.html',
  styleUrls: ['./adjustor.component.scss']
})
export class AdjustorComponent implements OnInit {

  constructor(private adjustorService: AdjustorService) { }

  ngOnInit(): void { }

  get isentence() { return this.adjustorService.isentence; }

  get sentences() { return this.adjustorService.getSentences(); }


}
