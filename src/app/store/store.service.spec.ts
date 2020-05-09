import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { Annotation, Tokenable } from '../annotators/annotations';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should init Store', () => {
    const content: any[][] = [];
    const annotation = Annotation.conllu;
    service.initStore(annotation, content);
    expect(service.nbSentences).toEqual(content.length, 'The number of sentences should be the length of content');
    expect(service.annotation).toEqual(annotation, 'The current annotation should be the given annotation');
    expect(service.selectedAnnotations$.value).toContain(annotation, 'the exposed annotations should contain the annotation');
  });

  it('should reset Store', () => {
    const content: any[][] = [];
    const annotation = Annotation.conllu;
    service.initStore(annotation, content);
    service.reset();
    expect(service.nbSentences).toEqual(0, 'The number of sentences should be empty');
    expect(service.annotation).toEqual('', 'The current annotation should be empty');
    expect(service.selectedAnnotations$.value).toEqual([], 'the exposed annotations should be empty');
  });

  it('should add a new entry in the Store when setting annotation', () => {
    const content: Tokenable[][] = [[{ token: 'A' }, { token: 'test' }], [{ token: 'Other' }, { token: 'test' }]];
    const annotation = Annotation.raw;
    service.initStore(annotation, content);
    expect(service.store.getSentence(Annotation.raw, 0)[0])
    .toEqual({ token: 'A' }, 'The raw annotation content should have been init in the store as tokenable');

    service.annotation = Annotation.conllu;
    expect(service.store.getSentence(Annotation.conllu, 0)[0])
      .toEqual({
        index: '1', token: 'A', lemma: '_', upos: '_', xpos: '_',
        feat: '_', head: '_', deprel: '_', deps: '_', misc: '_'
      }, 'The new annotation content should have been init in the store');
    expect(service.annotation)
      .toEqual(Annotation.conllu, 'The current annotation should have been moved to new one');
    expect(service.selectedAnnotations$.value)
      .toEqual([Annotation.raw, Annotation.conllu], 'the exposed annotations should the init one and the added one');
    expect(service.sentence$.value[0])
      .toEqual({
        index: '1', token: 'A', lemma: '_', upos: '_', xpos: '_',
        feat: '_', head: '_', deprel: '_', deps: '_', misc: '_'
      }, 'the exposed sentence should have been moved to the new one');
  });

  it('should remove a new entry but not from the Store and push it into the removed array when setting annotation', () => {
    const content: any[][] = [[{ token: 'A' }, { token: 'test' }], [{ token: 'Other' }, { token: 'test' }]];
    const annotation = Annotation.raw;
    service.initStore(annotation, content);
    service.annotation = Annotation.conllu;
    service.removeAnnotation(Annotation.conllu);
    expect(service.selectedAnnotations$.value)
      .toEqual([Annotation.raw], 'the exposed annotations should have been updated and removed the annotation from the array');
    expect(service.sentence$.value[0])
      .toEqual({ token: 'A' }, 'the exposed sentence should have been moved to the first one in the annotations array');
  });

  it('should move the current sentence into the given index', () => {
    const content: any[][] = [[{ token: 'A' }, { token: 'test' }], [{ token: 'Other' }, { token: 'test' }]];
    const annotation = Annotation.raw;
    service.initStore(annotation, content);
    service.index = 1;
    expect(service.sentence$.value[0])
      .toEqual({ token: 'Other' }, 'the exposed sentence should have been moved to the second sentence');
    service.index = 2;
    expect(service.sentence$.value[0])
      .toEqual({ token: 'A' }, 'adding a number higher than nb sentence should move back to 0');
    service.index -= 1;
    expect(service.sentence$.value[0])
      .toEqual({ token: 'Other' }, 'adding a number smaller than nb 0 should move back to last sentence');
  });

  it('should remove a new entry but not from the Store and push it into the removed array when setting annotation', () => {
    const content: any[][] = [[{ token: 'A' }, { token: 'test' }], [{ token: 'Other' }, { token: 'test' }]];
    const annotation = Annotation.raw;
    service.initStore(annotation, content);
    service.annotation = Annotation.conllu;
    service.removeAnnotation(Annotation.conllu);
    expect(service.selectedAnnotations$.value)
      .toEqual([Annotation.raw], 'the exposed annotations should have been updated and removed the annotation from the array');
    expect(service.sentence$.value[0])
      .toEqual({ token: 'A' }, 'the exposed sentence should have been moved to the first one in the annotations array');
  });

});
