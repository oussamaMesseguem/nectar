import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectorComponent } from './injector.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('InjectorComponent', () => {
  let component: InjectorComponent;
  let fixture: ComponentFixture<InjectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjectorComponent ],
      imports: [ MatDialogModule, ReactiveFormsModule, MatAutocompleteModule ],
      providers: [
        { provide: FormBuilder, useValue: { group: dummy => ({}) } },
        { provide: HttpClient, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
