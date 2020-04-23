import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AdjustorService } from '../adjustor.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-adjustor',
  templateUrl: './adjustor.component.html',
  styleUrls: ['./adjustor.component.scss']
})
export class AdjustorComponent implements OnInit {

  constructor(private adjustorService: AdjustorService, public dialogRef: MatDialogRef<AdjustorComponent>) { }

  ngOnInit(): void { }

  get sentences() { return this.adjustorService.sentences; }

  edit() {
    // this.router.navigateByUrl('edit');
  }
}
