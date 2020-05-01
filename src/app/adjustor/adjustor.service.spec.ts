import { TestBed } from '@angular/core/testing';

import { AdjustorService } from './adjustor.service';
import { StoreService } from '../store.service';
import { MatDialogModule } from '@angular/material/dialog';

const rawContent: string[][] = [
  ['This', 'is', 'a', 'test', '.'],
  ['Yes', 'a', 'test', ';'],
  ['I', 'said', 'a', 'test', '!']
];

describe('AdjustorService', () => {
  let service: AdjustorService;
  let storeServiceStub: Partial<StoreService>;

  beforeEach(() => {
    const storeStub = {
      rawContent: rawContent.map(s => Array.from(s))
    };
    TestBed.configureTestingModule({
      imports: [ MatDialogModule],
      providers: [
        AdjustorService,
        { provide: StoreService, useValue: storeStub }
      ]
    });
    service = TestBed.inject(AdjustorService);
    storeServiceStub = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sentences should be rawContent from store service', () => {
    expect(service.sentences).toEqual(rawContent, 'sentences should be rawContent from store service');
  });

  it('should duplicate sentence', () => {
    expect(service.sentences.length).toEqual(3);
    service.duplicateSentence(1);
    expect(service.sentences.length).toEqual(4);
    expect(service.sentences[1]).toEqual(service.sentences[2], 'the duplication should be i+1');
  });

  it('should delete sentence', () => {
    expect(service.sentences.length).toEqual(3);
    service.deleteSentence(1);
    expect(service.sentences.length).toEqual(2);
  });

  it('should add new sentence before sentence', () => {
    expect(service.sentences.length).toEqual(3);
    service.newSentenceBefore(0);
    expect(service.sentences.length).toEqual(4);
    expect(service.sentences[0]).toEqual(['~'], 'new sentence before should be at i-1 and contain ~');
  });

  it('should duplicate sentence', () => {
    expect(service.sentences.length).toEqual(3);
    service.newSentenceAfter(0);
    expect(service.sentences.length).toEqual(4);
    expect(service.sentences[1]).toEqual(['~'], 'new sentence before should be at i+1 and contain ~');
  });

  it('should duplicate token', () => {
    service.duplicateToken(1, 1);
    expect(service.sentences[1][1]).toEqual('a', 'the duplication should be the same value');
    expect(service.sentences[1][2]).toEqual(service.sentences[1][2], 'the duplication should be i+1');
  });

  it('should add new token before', () => {
    service.newTokenBefore(2, 3);
    expect(service.sentences[2].length).toEqual(6, 'increment sentence length.');
    expect(service.sentences[2][3]).toEqual('~', 'the new token takes the given position');
    expect(service.sentences[2][4]).toEqual('test', 'the value of the given position should be itoken+1');
  });

  it('should add new token after', () => {
    service.newTokenAfter(2, 3);
    expect(service.sentences[2].length).toEqual(6, 'increment sentence length.');
    expect(service.sentences[2][4]).toEqual('~', 'the new token takes the given position + 1');
    expect(service.sentences[2][3]).toEqual('test', 'the value of the given position should be ~');
  });

  it('should edit token', () => {
    service.editToken(2, 3, 'Oops');
    expect(service.sentences[2][3]).toEqual('Oops', 'the edited token should be changed');
  });

  it('should delete token', () => {
    expect(service.sentences[1].length).toEqual(4);
    service.deleteToken(1, 0);
    expect(service.sentences[1].length).toEqual(3);
    expect(service.sentences[1][0]).toEqual('a', 'removing a value make move other values back');
  });
});
