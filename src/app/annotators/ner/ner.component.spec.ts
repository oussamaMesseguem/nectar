import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NerComponent } from './ner.component';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

describe('NerComponent', () => {
  let component: NerComponent;
  let fixture: ComponentFixture<NerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule, MatMenuModule ],
      providers: [ { provide: MatDialogRef, useValue: {} } ],
      declarations: [ NerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
