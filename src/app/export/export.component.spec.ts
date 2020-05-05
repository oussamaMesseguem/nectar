import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportComponent } from './export.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Annotation } from '../annotators/annotations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const annotations: string[] = Object.values(Annotation);

describe('ExportComponent', () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { annotations } }
      ],
      declarations: [ ExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selected to false in ngOnint', () => {
    component.ngOnInit();
    expect(component.exportedAnnotations.map(a => a.selected)).toEqual(Array(annotations.length).fill(false));
  });

  it('should change selected to true when touched', () => {
    component.ngOnInit();
    component.touch(1);
    expect(component.exportedAnnotations[1].selected).toBeTruthy('annotation should be true after click');
  });

  it('should export only the selected to true annotations', () => {
    component.ngOnInit();
    component.touch(0);
    const touched: string[] = component.export();
    expect(touched).toEqual([component.exportedAnnotations[0].annotation], 'annotations should be the ones that are true');

  });
});
