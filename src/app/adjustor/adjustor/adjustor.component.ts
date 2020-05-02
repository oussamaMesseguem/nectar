import { Component, OnInit } from '@angular/core';
import { AdjustorService } from '../adjustor.service';


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
