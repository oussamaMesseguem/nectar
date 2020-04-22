import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AdjustorService } from '../adjustor.service';


@Component({
  selector: 'app-adjustor',
  templateUrl: './adjustor.component.html',
  styleUrls: ['./adjustor.component.scss']
})
export class AdjustorComponent implements OnInit {

  constructor(private adjustorService: AdjustorService) { }

  ngOnInit(): void { }

  get sentences() { return this.adjustorService.sentences; }
}
