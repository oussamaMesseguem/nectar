import { NerToken, nerIntoText, createNerToken } from './ner.model';

describe('Ner Model Unit Test', () => {

    it('should convert ner content into a text', () => {
        const content: NerToken[][] = [
            [{ token: 'a', tag: '', type: '' }, { token: 'b', tag: '', type: '' }],
            [{ token: 'c', tag: '', type: '' }, { token: 'd', tag: '', type: '' }]
        ];

        const actual = nerIntoText(content);
        const expected =
            `a\tO
b\tO

c\tO
d\tO`;
        expect(actual).toEqual(expected);
    });

    it('should concatenate types to tags', () => {
        const content: NerToken[][] = [
            [{ token: 'a', tag: 'U', type: 'DATE' }, { token: 'b', tag: 'U', type: 'OTHER' }],
            [{ token: 'c', tag: '', type: '' }, { token: 'd', tag: 'O', type: '' }]
        ];

        const actual = nerIntoText(content);
        const expected =
            `a\tU-DATE
b\tU-OTHER

c\tO
d\tO`;
        expect(actual).toEqual(expected);
    });

    it('should create a Ner token', () => {
        let actual = createNerToken('a', 'U', 'DATE');
        let expected: NerToken = { token: 'a', type: 'DATE', tag: 'U' };
        expect(actual).toEqual(expected);
        actual = createNerToken('a', '', '');
        expected = { token: 'a', type: '', tag: '' };
        expect(actual).toEqual(expected, 'type and tag should be empty strings');
    });
});
