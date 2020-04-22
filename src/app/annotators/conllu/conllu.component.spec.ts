import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConlluComponent } from './conllu.component';

describe('ConlluComponent', () => {
  let component: ConlluComponent;
  let fixture: ComponentFixture<ConlluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
