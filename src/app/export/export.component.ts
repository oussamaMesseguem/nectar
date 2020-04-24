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

  constructor(
    public dialogRef: MatDialogRef<ExportComponent>,
    @Inject(MAT_DIALOG_DATA) public exportDataDialog: ExportDataDialog,
    public dialog: MatDialog) { }

  /**
   * At init each annotations are displayed and not selected by default.
   */
  ngOnInit(): void {
    this.exportDataDialog.annotations.forEach(annotation => {
      this.exportedAnnotations.push({ annotation, selected: false});
    });
  }

  /**
   * Marks the annotation as selected.
   * @param index The index of the selected annotation
   */
  touch(index: number) {
    this.exportedAnnotations[index].selected = !this.exportedAnnotations[index].selected;
  }

  /**
   * Returns the selected annotations.
   */
  export(): string[] {
    return this.exportedAnnotations.filter(a => a.selected).map(a => a.annotation);
  }
}
