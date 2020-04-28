import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenComponent } from './token.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConlluToken } from '../conllu.model';

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
      imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatAutocompleteModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { conlluToken, nbTokens: 20 } }
      ],
      declarations: [TokenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
