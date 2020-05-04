import { Store } from './store.model';
import { Annotation } from '../annotators/annotations';
import { NerToken } from '../annotators/ner/ner.model';

const storeContent = {
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

describe('Store class', () => {
    let store: Store;

    beforeEach(() => {
        store = new Store();
    });

    // **** Init Tests START ****
    it('should init store from conllu and created store.raw entry', () => {
        store.initStore(Annotation.conllu, JSON.parse(JSON.stringify(storeContent['Conll-U'])));
        // nbSentences reads from store.Raw, therefore it's been created.
        expect(store.nbSentences()).toEqual(3);
    });

    it('should init store from ner and created store.raw entry', () => {
        store.initStore(Annotation.ner, JSON.parse(JSON.stringify(storeContent.Ner)));
        // nbSentences reads from store.Raw, therefore it's been created.
        expect(store.nbSentences()).toEqual(3);
    });

    it('should add a new ner entry to store and init it', () => {
        store.initStore(Annotation.raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.addEntry(Annotation.ner);
        expect(store.keys()).toContain(Annotation.ner);
        expect(store.getSentence(Annotation.ner, 2).length).toEqual(5);
        expect(store.getSentence(Annotation.ner, 2)[0]).toEqual({ token: 'I', type: '', tag: '' });
    });

    it('should add a new conllu entry to store and init it', () => {
        store.initStore(Annotation.raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.addEntry(Annotation.conllu);
        expect(store.keys()).toContain(Annotation.conllu);
        expect(store.getSentence(Annotation.conllu, 1).length).toEqual(4);
        expect(store.getSentence(Annotation.conllu, 1)[0])
            .toEqual({
                index: '1', token: 'Yes', lemma: '_', upos: '_', xpos: '_',
                feat: '_', head: '_', deprel: '_', deps: '_', misc: '_'
            });
    });
    // **** Init Tests END ****

    // **** Raw Tests START ****
    it('should delete sentence', () => {
        store.initStore(Annotation.raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        expect(store.nbSentences()).toEqual(3);
        store.deleteSentence(1);
        expect(store.nbSentences()).toEqual(2);
    });

    it('should duplicate sentence', () => {
        store.initStore(Annotation.raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        expect(store.nbSentences()).toEqual(3);
        store.duplicateSentence(1);
        expect(store.nbSentences()).toEqual(4);
        expect(store.getSentence(Annotation.raw, 1))
            .not.toBe(store.getSentence(Annotation.raw, 2), 'the duplication should not be the same reference to i');
        expect(store.getSentence(Annotation.raw, 1))
            .toEqual(store.getSentence(Annotation.raw, 2), 'the duplication should be the same value as i');
    });

    it('should add new sentence before sentence', () => {
        store.initStore(Annotation.raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        expect(store.nbSentences()).toEqual(3);
        store.newSentenceBefore(1);
        expect(store.nbSentences()).toEqual(4);
        expect(store.getSentence(Annotation.raw, 1)).toEqual(['~'], 'new sentence before should be at i and contain ~');
    });

    it('should duplicate sentence', () => {
        store.initStore(Annotation.raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        expect(store.nbSentences()).toEqual(3);
        store.newSentenceAfter(1);
        expect(store.nbSentences()).toEqual(4);
        expect(store.getSentence(Annotation.raw, 2)).toEqual(['~'], 'new sentence before should be at i+1 and contain ~');
    });

    it('should duplicate token', () => {
        store.initStore(Annotation.raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.duplicateToken(1, 1);
        expect(store.getSentence(Annotation.raw, 1)[2]).toEqual('a', 'the duplication should be the same value and at i+1');
        // expect(store.getSentence(Annotation.raw, 1)[2])
        //     .not.toBe(store.getSentence(Annotation.raw, 1)[1], 'the duplication should not be the same reference as i');
    });

    it('should add new token before', () => {
        store.initStore(Annotation.raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.newTokenBefore(2, 3);
        expect(store.getSentence(Annotation.raw, 2).length).toEqual(6, 'increment sentence length.');
        expect(store.getSentence(Annotation.raw, 2)[3]).toEqual('~', 'the new token takes the given position');
        expect(store.getSentence(Annotation.raw, 2)[4]).toEqual('test', 'the value of the given position should be itoken+1');
    });

    it('should add new token after', () => {
        store.initStore(Annotation.raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.newTokenAfter(2, 3);
        expect(store.getSentence(Annotation.raw, 2).length).toEqual(6, 'increment sentence length.');
        expect(store.getSentence(Annotation.raw, 2)[4]).toEqual('~', 'the new token takes the given position + 1');
        expect(store.getSentence(Annotation.raw, 2)[3]).toEqual('test', 'the value of the given position should be ~');
    });

    it('should edit token', () => {
        store.initStore(Annotation.raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        store.editToken(2, 3, 'Oops');
        expect(store.getSentence(Annotation.raw, 2)[3]).toEqual('Oops', 'the edited token should be changed');
    });

    it('should delete token', () => {
        store.initStore(Annotation.raw, JSON.parse(JSON.stringify(storeContent.Raw)));
        expect(store.getSentence(Annotation.raw, 1).length).toEqual(4);
        store.deleteToken(1, 0);
        expect(store.getSentence(Annotation.raw, 1).length).toEqual(3);
        expect(store.getSentence(Annotation.raw, 1)[0]).toEqual('a', 'removing a value make move other values back');
    });
    // **** Raw Tests END ****
});
