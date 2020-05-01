import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NerComponent } from './ner.component';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TokenComponent } from './token/token.component';
import { BehaviorSubject } from 'rxjs';
import { NerToken } from './ner.model';

const nerTokens: NerToken[] = [
  {
    token: 'Baisse',
    tag: '',
    type: ''
  },
  {
    token: 'des',
    tag: '',
    type: ''
  },
  {

    token: 'prix',
    tag: '',
    type: ''
  }
];

describe('NerComponent', () => {
  let component: NerComponent;
  let fixture: ComponentFixture<NerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatMenuModule],
      providers: [{ provide: MatDialogRef, useValue: {} }],
      declarations: [NerComponent, TokenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NerComponent);
    component = fixture.componentInstance;
    component.sentence$ = new BehaviorSubject(nerTokens);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a behaviourSubject that serves the current sentence', () => {
    expect(component.sentence$.value).toBe(nerTokens, 'BehaviourSubject should be a view on the sentence.');
  });

  it('should tag the current token with the given tag when type and index are set', () => {
    expect(component.sentence$.value[0]).toEqual({ token: 'Baisse', tag: '', type: '' }, 'tokens should be as they are in the array.');
    component.index = 0;
    component.setType('DATE');
    expect(component.update).toBeFalsy('update property should be false at init.');
    expect(component.sentence$.value[0]).not.toEqual({ token: 'Baisse', tag: 'U', type: 'DATE' },
    'tokens should not have been modified before calling setTag.');
    component.setTag('U');
    expect(component.update).toBeTruthy('update property should be true after calling settag');
    expect(component.sentence$.value[0]).toEqual({ token: 'Baisse', tag: 'U', type: 'DATE' },
      'tokens should have been modified after calling setTag.');
  });

  it('should set the current index of the token in the sentence when click on it', () => {
    expect(component.index).toBeUndefined('Before ngOnInit currentTokenIndex should be undefined');
    const tokenElts: DebugElement[] = fixture.debugElement.queryAll(By.css('app-token'));
    tokenElts[1].triggerEventHandler('click', null);
    expect(component.index).toEqual(1, 'Click on second token therefore current index should be 1');
  });
});
