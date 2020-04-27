import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConlluComponent } from './conllu.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ConlluComponent', () => {
  let component: ConlluComponent;
  let fixture: ComponentFixture<ConlluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      providers: [ { provide: MatDialogRef, useValue: {} } ],
      declarations: [ ConlluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConlluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
