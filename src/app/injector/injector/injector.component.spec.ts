import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectorComponent } from './injector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InjectorService } from '../injector.service';

describe('InjectorComponent', () => {
  let component: InjectorComponent;
  let fixture: ComponentFixture<InjectorComponent>;
  let service: InjectorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjectorComponent ],
      imports: [ MatDialogModule, ReactiveFormsModule, MatAutocompleteModule ],
      providers: [
        { provide: HttpClient, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: InjectorService, useValue: {} }
      ]
    })
      .compileComponents();
    service = TestBed.inject(InjectorService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectorComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
