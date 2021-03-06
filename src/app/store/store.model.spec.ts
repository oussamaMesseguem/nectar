import { Store } from './store.model';
import { Annotation } from '../annotators/annotations';
import { ConlluToken } from '../annotators/conllu/conllu.model';
import { NerPlusPlusToken } from '../annotators/ner++/nerPlusPlus.model';
import { fakeAsync, tick } from '@angular/core/testing';

const storeContent = {
    Raw: [
        [{ token: 'This' }, { token: 'is' }, { token: 'a' }, { token: 'test' }, { token: '.' }],
        [{ token: 'Yes' }, { token: 'a' }, { token: 'test' }, { token: ';' }],
        [{ token: 'I' }, { token: 'said' }, { token: 'a' }, { token: 'test' }, { token: '!' }]
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

describe('Store class', () => {
    let store: Store;

    beforeEach(() => {
        store = new Store();
    });

    // **** Init Tests START ****
    it('should init store from conllu and created store.Raw entry', () => {
        store.initStore(Annotation['Conll-U'], JSON.parse(JSON.stringify(storeContent['Conll-U'])));
        // nbSentences reads from store.Raw, therefore it's been created.
        expect(store.nbSentences()).toEqual(3);
    });

    it('should init store from ner and created store.Raw entry', () => {
        store.initStore(Annotation.Ner, JSON.parse(JSON.stringify(storeContent.Ner)));
        // nbSentences reads from store.Raw, therefore it's been created.
        expect(store.nbSentences()).toEqual(3);
    });

    it('should add a new ner entry to store and init it', () => {
        store.initStore(Annotation.Raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.addEntry(Annotation.Ner);
        expect(store.keys()).toContain(Annotation.Ner);
        expect(store.getSentence(Annotation.Ner, 2).length).toEqual(5);
        expect(store.getSentence(Annotation.Ner, 2)[0]).toEqual({ token: 'I', label: '' });
    });

    it('should add a new conllu entry to store and init it', () => {
        store.initStore(Annotation.Raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.addEntry(Annotation['Conll-U']);
        expect(store.keys()).toContain(Annotation['Conll-U']);
        expect(store.getSentence(Annotation['Conll-U'], 1).length).toEqual(4);
        expect(store.getSentence(Annotation['Conll-U'], 1)[0])
            .toEqual({
                index: '1', token: 'Yes', lemma: '_', upos: '_', xpos: '_',
                feat: '_', head: '_', deprel: '_', deps: '_', misc: '_'
            });
    });
    // **** Init Tests END ****

    // **** Raw Tests START ****
    it('should delete sentence', () => {
        store.initStore(Annotation.Raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        expect(store.nbSentences()).toEqual(3);
        store.deleteSentence(1);
        expect(store.nbSentences()).toEqual(2);
    });

    it('should duplicate sentence', () => {
        store.initStore(Annotation.Raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        expect(store.nbSentences()).toEqual(3);
        store.duplicateSentence(1);
        expect(store.nbSentences()).toEqual(4);
        expect(store.getSentence(Annotation.Raw, 1))
            .not.toBe(store.getSentence(Annotation.Raw, 2), 'the duplication should not be the same reference to i');
        expect(store.getSentence(Annotation.Raw, 1))
            .toEqual(store.getSentence(Annotation.Raw, 2), 'the duplication should be the same value as i');
    });

    it('should add new sentence before sentence', () => {
        store.initStore(Annotation.Raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        expect(store.nbSentences()).toEqual(3);
        store.newSentenceBefore(1);
        expect(store.nbSentences()).toEqual(4);
        expect(store.getSentence(Annotation.Raw, 1)).toEqual([{ token: '~' }], 'new sentence before should be at i and contain ~');
    });

    it('should duplicate sentence', () => {
        store.initStore(Annotation.Raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        expect(store.nbSentences()).toEqual(3);
        store.newSentenceAfter(1);
        expect(store.nbSentences()).toEqual(4);
        expect(store.getSentence(Annotation.Raw, 2)).toEqual([{ token: '~' }], 'new sentence before should be at i+1 and contain ~');
    });

    it('should duplicate token', () => {
        store.initStore(Annotation.Raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.duplicateToken(1, 1);
        expect(store.getSentence(Annotation.Raw, 1)[2]).toEqual({ token: 'a' }, 'the duplication should be the same value and at i+1');
        // expect(store.getSentence(Annotation.Raw, 1)[2])
        //     .not.toBe(store.getSentence(Annotation.Raw, 1)[1], 'the duplication should not be the same reference as i');
    });

    it('should add new token before', () => {
        store.initStore(Annotation.Raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.newTokenBefore(2, 3);
        expect(store.getSentence(Annotation.Raw, 2).length).toEqual(6, 'increment sentence length.');
        expect(store.getSentence(Annotation.Raw, 2)[3]).toEqual({ token: '~' }, 'the new token takes the given position');
        expect(store.getSentence(Annotation.Raw, 2)[4]).toEqual({ token: 'test' }, 'the value of the given position should be itoken+1');
    });

    it('should add new token after', () => {
        store.initStore(Annotation.Raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.newTokenAfter(2, 3);
        expect(store.getSentence(Annotation.Raw, 2).length).toEqual(6, 'increment sentence length.');
        expect(store.getSentence(Annotation.Raw, 2)[4]).toEqual({ token: '~' }, 'the new token takes the given position + 1');
        expect(store.getSentence(Annotation.Raw, 2)[3]).toEqual({ token: 'test' }, 'the value of the given position should be ~');
    });

    it('should edit token', () => {
        store.initStore(Annotation.Raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.editToken(2, 3, 'Oops');
        expect(store.getSentence(Annotation.Raw, 2)[3]).toEqual({ token: 'Oops' }, 'the edited token should be changed');
    });

    it('should delete token', () => {
        store.initStore(Annotation.Raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        expect(store.getSentence(Annotation.Raw, 1).length).toEqual(4);
        store.deleteToken(1, 0);
        expect(store.getSentence(Annotation.Raw, 1).length).toEqual(3);
        expect(store.getSentence(Annotation.Raw, 1)[0]).toEqual({ token: 'a' }, 'removing a value make move other values back');
    });
    // **** Raw Tests END ****

    // **** Communication between annotations START ****
    it('should update ner++[pos] and ner++[label] on conllu and ner content as it\'s a new entry', fakeAsync(() => {
        store.initStore(Annotation['Conll-U'], JSON.parse(JSON.stringify(storeContent['Conll-U'])));
        const conlluToken: ConlluToken = store.getSentence(Annotation['Conll-U'], 0)[0];
        conlluToken.upos = 'NEW';
        store.addEntry(Annotation.Ner);
        const beenAdded = store.addEntry(Annotation['Ner++']);
        store.getSentence(Annotation.Ner, 0)[0].label = 'NEW-LABEL';

        expect(beenAdded).toBeTruthy('should be true since Ner++ is a new entry.');
        // should call after a new entry to updtate the new entry on previous annotations.
        store.updateContentProperties(Annotation['Conll-U']);
        store.updateContentProperties(Annotation.Ner);
        tick();
        const nerPlusPlusToken: NerPlusPlusToken = store.getSentence(Annotation['Ner++'], 0)[0];
        expect(nerPlusPlusToken.pos)
        .toEqual('NEW', 'NER++[pos] should have been updated on Conll-U[upos] since it\'s newly added to store.');
        expect(nerPlusPlusToken.label)
        .toEqual('NEW-LABEL', 'NER++[label] should have been updated on Ner[label] since it\'s newly added to store.');
    }));

    it('should update ner++[pos] when conllu[upos] changes', fakeAsync(() => {
        store.initStore(Annotation['Conll-U'], JSON.parse(JSON.stringify(storeContent['Conll-U'])));
        const conlluToken: ConlluToken = store.getSentence(Annotation['Conll-U'], 0)[0];
        store.addEntry(Annotation['Ner++']);

        conlluToken.upos = 'UPDATED';
        store.updateProperties(Annotation['Conll-U'], 0, 0, conlluToken);
        tick();

        const nerPlusPlusToken: NerPlusPlusToken  = store.getSentence(Annotation['Ner++'], 0)[0];
        console.log(nerPlusPlusToken);
        expect(nerPlusPlusToken.pos)
        .toEqual('UPDATED', 'NER++[pos] should have been updated on Conll-U[upos] since conllu has been modified.');
    }));
    // **** Communication between annotations END ****
});
