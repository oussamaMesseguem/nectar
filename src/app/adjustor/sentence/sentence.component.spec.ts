import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceComponent } from './sentence.component';
import { AdjustorService } from '../adjustor.service';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';


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
    component.sentence$ = new BehaviorSubject(['This', 'is', 'a', 'test', '.']);
    spyService = TestBed.inject(AdjustorService) as jasmine.SpyObj<AdjustorService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a sentence and its index in the array when init.', () => {
    fixture.detectChanges();
    expect(component.sentence$.value).toEqual(['This', 'is', 'a', 'test', '.'], 'sentence should be a sentence after detecChanges');
  });

  it('should have only button first and when click 4 others.', () => {
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
    component.duplicate();
    expect(spyService.duplicateSentence).toHaveBeenCalled();
  });

  it('should call deleteSentence when delete button is clicked', () => {
    component.delete();
    expect(spyService.deleteSentence).toHaveBeenCalled();
  });

  it('should call newSentenceBefore when duplicate button is clicked', () => {
    component.newBefore();
    expect(spyService.newSentenceBefore).toHaveBeenCalled();
  });

  it('should call newSentenceAfter when duplicate button is clicked', () => {
    component.newAfter();
    expect(spyService.newSentenceAfter).toHaveBeenCalled();
  });

});
