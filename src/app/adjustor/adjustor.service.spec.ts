import { TestBed } from '@angular/core/testing';

import { AdjustorService } from './adjustor.service';
import { StoreService } from '../store.service';
import { Store } from '../store/store.model';

const store = {
  Raw: [
    ['This', 'is', 'a', 'test', '.'],
    ['Yes', 'a', 'test', ';'],
    ['I', 'said', 'a', 'test', '!']
  ],
  'Conll-U': [
    [
      {
        index: '1',
        token: 'This',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      },
      {
        index: '2',
        token: 'is',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      },
      {
        index: '3',
        token: 'a',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      },
      {
        index: '4',
        token: 'test',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      },
      {
        index: '5',
        token: '.',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      }
    ],
    [
      {
        index: '1',
        token: 'Yes',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      },
      {
        index: '2',
        token: 'a',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      },
      {
        index: '3',
        token: 'test',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      },
      {
        index: '4',
        token: ';',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      }
    ],
    [
      {
        index: '1',
        token: 'I',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      },
      {
        index: '2',
        token: 'said',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      },
      {
        index: '3',
        token: 'a',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      },
      {
        index: '4',
        token: 'test',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      },
      {
        index: '5',
        token: '!',
        lemma: '_',
        upos: '_',
        xpos: '_',
        feat: '_',
        head: '_',
        deprel: '_',
        deps: '_',
        misc: '_'
      }
    ]
  ],
  Ner: [
    [{ token: 'This', tag: '', type: '' }, { token: 'is', tag: '', type: '' }, { token: 'a', tag: '', type: '' },
    { token: 'test', tag: '', type: '' }, { token: '.', tag: '', type: '' }],
    [{ token: 'Yes', tag: '', type: '' }, { token: 'a', tag: '', type: '' },
    { token: 'test', tag: '', type: '' }, { token: ';', tag: '', type: '' }],
    [{ token: 'I', tag: '', type: '' }, { token: 'said', tag: '', type: '' }, { token: 'a', tag: '', type: '' },
    { token: 'test', tag: '', type: '' }, { token: '!', tag: '', type: '' }],
  ]

};

describe('AdjustorService', () => {
  let service: AdjustorService;
  let storeServiceSpy: jasmine.SpyObj<StoreService>;

  beforeEach(() => {
    // Because: we need a new store for each test independently.
    const storeStub = jasmine.createSpyObj('StoreService', ['next', 'store']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AdjustorService,
        { provide: StoreService, useValue: storeStub }
      ]
    });
    service = TestBed.inject(AdjustorService);
    storeServiceSpy = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should call delete sentence', () => {
  //   service.deleteSentence();
  //   spyOnProperty(storeServiceSpy, 'store').and.callThrough();
  //   // expect(storeServiceSpy.store.deleteSentence).toHaveBeenCalled();
  //   expect(storeServiceSpy.next).toHaveBeenCalled();
  // });

  // it('should duplicate sentence', () => {
  //   service.duplicateSentence();
  //   expect(storeServiceSpy.next).toHaveBeenCalled();
  // });

  // it('should add new sentence before sentence', () => {
  //   service.newSentenceBefore();
  //   expect(storeServiceSpy.next).toHaveBeenCalled();
  // });

  // it('should duplicate sentence', () => {
  //   service.newSentenceAfter();
  //   expect(storeServiceSpy.next).toHaveBeenCalled();
  // });

  // it('should duplicate token', () => {
  //   service.duplicateToken(1);
  //   expect(storeServiceSpy.next).toHaveBeenCalled();
  // });

  // it('should add new token before', () => {
  //   service.newTokenBefore(3);
  //   expect(storeServiceSpy.next).toHaveBeenCalled();
  // });

  // it('should add new token after', () => {
  //   service.newTokenAfter(3);
  //   expect(storeServiceSpy.next).toHaveBeenCalled();
  // });

  // it('should edit token', () => {
  //   service.editToken(3, 'Oops');
  //   expect(storeServiceSpy.next).toHaveBeenCalled();
  // });

  // it('should delete token', () => {
  //   service.deleteToken(0);
  //   expect(storeServiceSpy.next).toHaveBeenCalled();
  // });
});
