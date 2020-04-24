import { Component, OnInit } from '@angular/core';
import { Annotation } from '../../annotators/annotations';
import { StoreService } from 'src/app/store.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ExportComponent } from '../../export/export.component';
import { InjectorComponent } from 'src/app/injector/injector/injector.component';
import { AdjustorComponent } from 'src/app/adjustor/adjustor/adjustor.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor(private storeService: StoreService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  /**
   * The annotation list.
   */
  get annotations(): string[] { return Object.values(Annotation).filter(a => a !== Annotation.raw); }

  /**
   * The current annotation.
   */
  get annotation(): string { return this.storeService.annotation; }

  /**
   * The current annotation. Set in the template by a <list-annotation> output
   */
  set annotation(annotation: string) { this.storeService.annotation = annotation; }

  /**
   * The index of the current sentence
   */
  get index() { return this.storeService.index; }

  /**
   * Sets the new index value
   */
  set index(index: number) { this.storeService.index = index; }

  /**
   * The remaining annotations that is possible to add to the chip-list
   */
  get filteredAnnotations(): string[] {
    return this.annotations.filter(annot => !this.selectedAnnotations.value.includes(annot));
  }

  get selectedAnnotations(): BehaviorSubject<string[]> { return this.storeService.selectedAnnotations$; }

  /**
   * A view on the current sentence depending on the index and the annotation.
   * A behaviour subject gives the possibility to subscribe to the content by async
   * and to get the value if needed.
   */
  get sentence$(): BehaviorSubject<any[]> { return this.storeService.sentence$; }

  /**
   * Opens the dialog to adjust the content
   */
  adjust() {
    console.log(this.storeService.rawContent);
    this.dialog.open(AdjustorComponent, {
      width: '100%',
      data: { }
    });
  }

  /**
   * Opens a dialog to export the content.
   */
  export() {
    const dialogRef = this.dialog.open(ExportComponent, {
      width: '100%',
      data: {
        annotations: this.selectedAnnotations.value
      }
    });

    dialogRef.afterClosed().subscribe((result: string[]) => {
      if (result !== undefined && result.length > 0) {
        this.storeService.writeContents(result);
      }
    });
  }

  /**
   * Opens the dialog to import content.
   */
  import() {
    const dialogRef = this.dialog.open(InjectorComponent, {
      width: '100%',
      data: { }
    });

    // After the import dialog; opens the adjust dialog if asked.
    dialogRef.afterClosed().subscribe((result: string[]) => {
      if (result !== undefined) {
        this.adjust();
      }
    });
  }

  /**
   * Removes the annotation form the store.
   * @param annotation The emitted annotation
   */
  removeAnnotation(annotation: string) {
    this.storeService.removeAnnotation(annotation);
  }
}
