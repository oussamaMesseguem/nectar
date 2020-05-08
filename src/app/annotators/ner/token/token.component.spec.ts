import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenComponent } from './token.component';
import { NerToken, NER_TAG_COLOR } from '../ner.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

const nerTokenUntyped: NerToken = { token: 'dummy', tag: 'O', type: '' };
const nerTokenTyped: NerToken = { token: 'novembre', tag: 'U', type: 'DATE' };

describe('Ner TokenComponent', () => {
  let component: TokenComponent;
  let fixture: ComponentFixture<TokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('element should be a button when token.type is not typped', () => {
    component.token = nerTokenUntyped;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-form-field'))).toBeNull('Untyped tokens are not in a form field');
    const buttonElt: DebugElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElt.nativeElement.innerText).toEqual('dummy', 'The innerText should be the value of the token.');
  });

  it('element should be a colored input when token.type is typed', () => {
    component.token = nerTokenTyped;
    fixture.detectChanges();
    const inputElt: DebugElement = fixture.debugElement.query(By.css('input'));
    const expectedColor: string = NER_TAG_COLOR[nerTokenTyped.type];
    expect(fixture.debugElement.query(By.css('button'))).toBeNull('Typed tokens are in a form field not a button');
    expect(inputElt.styles.color).toEqual(expectedColor.toLowerCase(), 'A typed token should be colored.');
    expect(inputElt.properties.ngModel).toEqual(nerTokenTyped.token, 'The innerText should be the value of the token.');
  });
});
