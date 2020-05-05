import { ConlluToken, conlluIntoText, createConlluToken } from './conllu.model';

describe('Conll-U Model Unit Tests', () => {

    it('Should convert conllu content into a text', () => {
        const content: ConlluToken[][] = [
            [{
                index: '1', token: 'A', lemma: '_', upos: '_', xpos: '_',
                feat: '_', head: '_', deprel: '_', deps: '_', misc: '_'
            },
            {
                index: '2', token: 'B', lemma: '_', upos: '_', xpos: '_',
                feat: '_', head: '_', deprel: '_', deps: '_', misc: '_'
            }],
            [{
                index: '1', token: 'A', lemma: '_', upos: '_', xpos: '_',
                feat: '_', head: '_', deprel: '_', deps: '_', misc: '_'
            },
            {
                index: '2', token: 'B', lemma: '_', upos: '_', xpos: '_',
                feat: '_', head: '_', deprel: '_', deps: '_', misc: '_'
            }],
        ];
        const expectedReturn =
            `1\tA\t_\t_\t_\t_\t_\t_\t_\t_
2\tB\t_\t_\t_\t_\t_\t_\t_\t_

1\tA\t_\t_\t_\t_\t_\t_\t_\t_
2\tB\t_\t_\t_\t_\t_\t_\t_\t_`;
        const actualText = conlluIntoText(content);
        expect(actualText).toEqual(expectedReturn);
    });

    it('should create a conllu token with just index and token', () => {
        const token = createConlluToken('1', 'token');
        expect(token).toEqual({
            index: '1', token: 'token', lemma: '_', upos: '_', xpos: '_',
            feat: '_', head: '_', deprel: '_', deps: '_', misc: '_'
        });
    });

    it('should create a conllu token with all values', () => {
        const token = createConlluToken('1', 'token', 'l', 'u', 'x', 'f', 'h', 'd', 'd', 'm');
        expect(token).toEqual({
            index: '1', token: 'token', lemma: 'l', upos: 'u', xpos: 'x',
            feat: 'f', head: 'h', deprel: 'd', deps: 'd', misc: 'm'
        });
    });
});
