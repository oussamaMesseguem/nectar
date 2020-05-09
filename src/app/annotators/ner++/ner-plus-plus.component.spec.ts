import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NerPlusPlusComponent } from './ner-plus-plus.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NerPlusPlusComponent', () => {
  let component: NerPlusPlusComponent;
  let fixture: ComponentFixture<NerPlusPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, FormsModule, MatAutocompleteModule, MatMenuModule, NoopAnimationsModule],
      declarations: [ NerPlusPlusComponent ],
      providers: [
        { provide: MatDialogRef, useValue: { open: () => { }, afterClosed: () => { } } },
        { provide: MAT_DIALOG_DATA, useValue: { } }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NerPlusPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
