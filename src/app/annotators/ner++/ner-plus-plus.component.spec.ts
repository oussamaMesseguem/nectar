import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NerPlusPlusComponent } from './ner-plus-plus.component';

describe('NerPlusPlusComponent', () => {
  let component: NerPlusPlusComponent;
  let fixture: ComponentFixture<NerPlusPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NerPlusPlusComponent ]
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
