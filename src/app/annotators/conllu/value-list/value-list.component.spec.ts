import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueListComponent } from './value-list.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { UFEATS } from '../conllu.model';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const tags = UFEATS;

describe('ValueListComponent', () => {
  let component: ValueListComponent;
  let fixture: ComponentFixture<ValueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule, ReactiveFormsModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { tags: [], tag: ''} }
      ],
      declarations: [ ValueListComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('field array should be empty when data.tag is empty and filled according to data.tag content', () => {
    expect(component.fields.length).toEqual(0);
    component.data = { tag: 'Abbr=Yes', tags, equality: '=', separator: '|' };
    component.ngOnInit();
    expect(component.fields.length).toEqual(1);
  });

  it('field array should contain the appropriate number of elements according to data.tag content', () => {
    component.data = { tag: 'Abbr=Yes|AbsErgDatNumber', tags, equality: '=', separator: '|' };
    component.ngOnInit();
    expect(component.fields.length).toEqual(2, 'fields array should contain the number of separator sign plus 1.');
    expect(component.fields[0].length).toEqual(2, 'a pair should contain 2 elements if the string contains an equality sign.');
    expect(component.fields[1].length).toEqual(1, 'a pair should contain only 1 element if the string does not contain an equality sign.');
  });

  it('field array should contain one more element when add button is hit', () => {
    expect(component.fields.length).toEqual(0);
    component.data = { tag: 'Abbr=Yes|AbsErgDatNumber', tags, equality: '=', separator: '|' };
    component.ngOnInit();
    expect(component.fields.length).toEqual(2, 'fields array should contain the number of separator sign plus 1.');
    const addButtonElt = fixture.debugElement.query(By.css('button'));
    addButtonElt.triggerEventHandler('click', null);
    expect(component.fields.length).toEqual(3, 'fields array should contain one more element after add button hit.');
  });

  it('field array should contain one less element when removed event is intercepted', () => {
    expect(component.fields.length).toEqual(0);
    component.data = { tag: 'Abbr=Yes|AbsErgDatNumber', tags, equality: '=', separator: '|' };
    component.ngOnInit();
    expect(component.fields.length).toEqual(2, 'fields array should contain the number of separator sign plus 1.');
    component.remove(1);
    expect(component.fields.length).toEqual(1, 'fields array should contain one less element after an element has been  removed.');
    expect(component.fields[0]).toEqual(['Abbr', 'Yes'], 'the remaining element should be the first one.');
  });

  it('updateField method should update the element at the given index and position', () => {
    expect(component.fields.length).toEqual(0);
    component.data = { tag: 'Abbr=Yes|AbsErgDatNumber=abs', tags, equality: '=', separator: '|' };
    component.ngOnInit();
    expect(component.fields[1]).toEqual(['AbsErgDatNumber', 'abs'], 'the second element should have abs as value.');
    component.updateField('erg', 1, 1);
    expect(component.fields[1]).toEqual(['AbsErgDatNumber', 'erg'], 'after update the second element should have erg as value.');
    expect(component.fields[1]).toEqual(['AbsErgDatNumber', 'erg'], 'the second element should have AbsErgDatNumber as tag.');
    component.updateField('AdpType', 1, 0);
    expect(component.fields[1]).toEqual(['AdpType', 'erg'], 'after update the second element should have AdpType as tag.');
  });
});
