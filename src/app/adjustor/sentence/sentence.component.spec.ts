import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceComponent } from './sentence.component';
import { AdjustorService } from '../adjustor.service';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

const sentence: string[][] = [
  ['This', 'is', 'a', 'test', '.'],
  ['Yes', 'a', 'test', ';'],
  ['I', 'said', 'a', 'test', '!']
];

describe('SentenceComponent', () => {
  let component: SentenceComponent;
  let fixture: ComponentFixture<SentenceComponent>;
  let spyService: jasmine.SpyObj<AdjustorService>;

  beforeEach(async(() => {
    const adjustorServiceStub = jasmine.createSpyObj('AdjustorService',
      ['duplicateSentence', 'deleteSentence', 'newSentenceBefore', 'newSentenceAfter']);
    TestBed.configureTestingModule({
      imports: [MatMenuModule, BrowserAnimationsModule],
      providers: [
        { provide: AdjustorService, useValue: adjustorServiceStub }
      ],
      declarations: [SentenceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentenceComponent);
    component = fixture.componentInstance;

    spyService = TestBed.inject(AdjustorService) as jasmine.SpyObj<AdjustorService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a sentence and its index in the array when init.', () => {
    expect(component.sentence).toBeUndefined('sentence should be undefined before detecChanges');
    component.sentence = sentence[0];
    component.isentence = 0;
    fixture.detectChanges();
    expect(component.sentence).toBe(sentence[0], 'sentence should be a sentence after detecChanges');
  });

  it('should have only button first and when click 4 others.', () => {
    component.sentence = sentence[0];
    component.isentence = 0;
    fixture.detectChanges();
    let buttonElts: DebugElement[];
    buttonElts = fixture.debugElement.queryAll(By.css('button'));
    expect(buttonElts.length).toEqual(1, 'only one button should be displayed when viewing the page.');
    buttonElts[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    buttonElts = fixture.debugElement.queryAll(By.css('button'));
    expect(buttonElts.length).toEqual(5, '5 buttons should be displayed after triggering for the menu.');
  });

  it('should call duplicateSentence when duplicate button is clicked', () => {
    component.isentence = 0;
    component.duplicate();
    expect(spyService.duplicateSentence).toHaveBeenCalledWith(0);
  });

  it('should call deleteSentence when delete button is clicked', () => {
    component.isentence = 1;
    component.delete();
    expect(spyService.deleteSentence).toHaveBeenCalledWith(1);
  });

  it('should call newSentenceBefore when duplicate button is clicked', () => {
    component.isentence = 2;
    component.newBefore();
    expect(spyService.newSentenceBefore).toHaveBeenCalledWith(2);
  });

  it('should call newSentenceAfter when duplicate button is clicked', () => {
    component.isentence = 0;
    component.newAfter();
    expect(spyService.newSentenceAfter).toHaveBeenCalledWith(0);
  });

});
