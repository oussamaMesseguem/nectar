import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairComponent } from './pair.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { UFEATS } from '../../conllu.model';

const tags = UFEATS;

describe('PairComponent', () => {
  let component: PairComponent;
  let fixture: ComponentFixture<PairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatAutocompleteModule, FormsModule],
      declarations: [PairComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairComponent);
    component = fixture.componentInstance;
    component.tags = tags;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Tag should be undefined before detectchanges() and not undefined afterwards', () => {
    expect(component.tag).toBeUndefined();
    component.tag = 'Abbr';
    fixture.detectChanges();
    expect(component.tag).not.toBeUndefined();
    expect(component.tagValue).toEqual('Abbr', 'Tag setter sets the property tagValue');
  });

  it('Tag setter should trigger an event emitter when changed', () => {
    let tag = '';
    expect(component.tag).toBeUndefined();
    component.tagChanged.subscribe((t: string) => tag = t);
    expect(tag).toBe('');
    component.tag = 'Abbr';
    expect(tag).toBe('Abbr');
  });

  it('When Tags change values array should change', () => {
    expect(component.tag).toBeUndefined();
    expect(component.values).toBeUndefined();
    component.tag = 'Abbr';
    expect(component.values.length).toEqual(1);
    component.tag = 'AbsErgDatNumber';
    expect(component.values.length).toEqual(3);
  });

  it('Value should be undefined before detectchanges() and not undefined afterwards', () => {
    expect(component.value).toBeUndefined();
    component.value = 'Yes';
    fixture.detectChanges();
    expect(component.value).not.toBeUndefined();
    expect(component.valueValue).toEqual('Yes', 'Value setter sets the property valueValue');
  });

  it('Value setter should trigger an event emitter when changed', () => {
    let value = '';
    expect(component.value).toBeUndefined();
    component.valueChanged.subscribe((v: string) => value = v);
    expect(value).toBe('');
    component.value = 'Yes';
    expect(value).toBe('Yes');
  });

  it('Click on remove button should trigger a null event emitter', () => {
    let value;
    const buttonElt = fixture.debugElement.query(By.css('button'));
    component.removed.subscribe((v) => {value = v; console.log(v);
    });
    expect(value).toBeUndefined();
    buttonElt.triggerEventHandler('click', null);
    expect(value).toBeNull('The emitted event should be null.');
  });
});
