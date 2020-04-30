import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TokenComponent } from './token.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConlluToken } from '../conllu.model';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TokenComponent', () => {
  let component: TokenComponent;
  let fixture: ComponentFixture<TokenComponent>;
  const conlluToken: ConlluToken = {
    index: '1',
    token: 'Baisse',
    lemma: 'baisse',
    upos: 'N',
    xpos: 'NC',
    feat: 'sentid=ftbRandomSample_100-593|g=f|n=s|s=c',
    head: '15',
    deprel: 'mod',
    deps: '15',
    misc: 'mod'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatAutocompleteModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: { open: () => { }, afterClosed: () => { } } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [TokenComponent]
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

  it('should init the form from the dialog.data', () => {
    expect(component.conlluTokenForm).toBeUndefined('Before ngOnInit the form should be undefined.');
    component.conlluDialog = { conlluToken, nbTokens: 5 };
    component.ngOnInit();
    expect(component.conlluTokenForm.value).toEqual(conlluToken, 'The form.value should be equal to the injected one');
  });

  it('should init the tokensIndexes from the dialog.data', () => {
    component.conlluDialog = { conlluToken, nbTokens: 5 };
    component.ngOnInit();
    const expectedArray = ['1', '2', '3', '4', '5'];
    expect(component.tokensIndexes).toEqual(expectedArray, 'The tokensArray should be equal to a nbTokens array of string');
  });

  // it('should patch value when featDialog closes', fakeAsync(() => {
  //   component.conlluDialog = { conlluToken, nbTokens: 5 };
  //   component.ngOnInit();
  //   expect(component.conlluTokenForm.get('feat').value)
  //   .toEqual(conlluToken.feat, 'The form feat value should be the same as conllu object');
  //   spyOn(component.dialogRef, 'afterClosed').and.returnValue(of('Abbr=Yes'));
  //   component.openFeatDialog();
  //   tick();
  //   expect(component.conlluTokenForm.get('feat').value)
  //   .toEqual('Abbr=Yes', 'The form feat value should have been patched.');
  // }));

  it('format should return a form.value as conlluToken', () => {
    component.conlluDialog = { conlluToken, nbTokens: 5 };
    component.ngOnInit();
    component.conlluTokenForm.get('feat').setValue('Abbr=Yes');
    expect(component.conlluTokenForm.get('feat').value)
      .toEqual('Abbr=Yes', 'The form feat value should have been patched.');
    const token: ConlluToken = {
      index: '1',
      token: 'Baisse',
      lemma: 'baisse',
      upos: 'N',
      xpos: 'NC',
      feat: 'Abbr=Yes',
      head: '15',
      deprel: 'mod',
      deps: '15',
      misc: 'mod'
    };
    expect(component.format()).toEqual(token, 'the returned object should be a ConlluToken.');
  });
});
