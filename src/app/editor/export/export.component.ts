import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ExportDataDialog {
  annotations: string[];
}

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  exportedAnnotations: { annotation: string; selected: boolean }[] = [];
  value = '';

  constructor(
    public dialogRef: MatDialogRef<ExportComponent>,
    @Inject(MAT_DIALOG_DATA) public exportDataDialog: ExportDataDialog,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.exportDataDialog.annotations.forEach(annotation => {
      this.exportedAnnotations.push({ annotation, selected: false});
    });
  }

  touch(index: number) {
    this.exportedAnnotations[index].selected = !this.exportedAnnotations[index].selected;
  }

  export(): string[] {
    return this.exportedAnnotations.map(a => a.annotation);
  }
}
