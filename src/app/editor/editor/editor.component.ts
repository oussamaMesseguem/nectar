import { Component, OnInit } from '@angular/core';
import { Annotation } from '../../annotators/annotations';
import { StoreService } from 'src/app/store.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ExportComponent } from '../export/export.component';
import { InjectorComponent } from 'src/app/injector/injector/injector.component';

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
  get annotations() { return Annotation; }

  /**
   * A view on the current sentence depending on the index and the annotation.
   * A behaviour subject gives the possibility to subscribe to the content by async
   * and to get the value if needed.
   */
  get sentence$(): BehaviorSubject<any[]> { return this.storeService.sentence$; }

  /**
   * The sentence length.
   */
  get sentenceLength(): number { return this.storeService.sentence$.value.length; }

  /**
   * The current annotation.
   */
  get annotation(): string { return this.storeService.annotation; }

  /**
   * The current annotation. Set in the template by a <list-annotation> output
   */
  set annotation(annotation: string) { this.storeService.annotation = annotation; }

  get selectedAnnotations(): string[] { return this.storeService.selectedAnnotations; }
  /**
   * The index of the current sentence
   */
  get index() { return this.storeService.index; }

  /**
   * Sets the new index value
   */
  set index(index: number) { this.storeService.index = index; }

  /**
   * Removes the annotation form the store.
   * @param annotation The emitted annotation
   */
  removeAnnotation(annotation: string) {
    this.storeService.removeAnnotation(annotation);
  }

  export() {
    const dialogRef = this.dialog.open(ExportComponent, {
      width: '100%',
      data: {
        annotations: this.selectedAnnotations
      }
    });

    dialogRef.afterClosed().subscribe((result: string[]) => {
      if (result !== undefined && result.length > 0) {
        console.log('selected annots', result);
        this.storeService.writeContents(result);
      }
    });
  }

  import() {
    const dialogRef = this.dialog.open(InjectorComponent, {
      width: '100%',
      data: { }
    });

    // dialogRef.afterClosed().subscribe((result: string[]) => {
    //   if (result !== undefined && result.length > 0) {
    //     console.log('selected annots', result);
    //     this.storeService.writeContents(result);
    //   }
    // });
  }
}
