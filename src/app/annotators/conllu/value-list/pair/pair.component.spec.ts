import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairComponent } from './pair.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('PairComponent', () => {
  let component: PairComponent;
  let fixture: ComponentFixture<PairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatAutocompleteModule ],
      declarations: [ PairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
