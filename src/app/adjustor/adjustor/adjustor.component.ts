import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AdjustorService } from '../adjustor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adjustor',
  templateUrl: './adjustor.component.html',
  styleUrls: ['./adjustor.component.scss']
})
export class AdjustorComponent implements OnInit {

  constructor(private adjustorService: AdjustorService, private router: Router) { }

  ngOnInit(): void { }

  get sentences() { return this.adjustorService.sentences; }

  edit() {
    this.router.navigateByUrl('edit');
  }
}
