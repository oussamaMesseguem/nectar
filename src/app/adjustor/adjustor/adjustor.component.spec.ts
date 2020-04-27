import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustorComponent } from './adjustor.component';
import { AdjustorService } from '../adjustor.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

describe('AdjustorComponent', () => {
  let component: AdjustorComponent;
  let fixture: ComponentFixture<AdjustorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      providers: [
        AdjustorService,
        { provide: MatDialogRef, useValue: {} },
      ],
      declarations: [ AdjustorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
