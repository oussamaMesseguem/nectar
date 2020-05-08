import { NerPlusPlusToken } from './nerPlusPlus.model';
import { AbstractStore } from 'src/app/store/abstractStore.model';
import { IParser } from 'src/app/injector/injector.service';
import { Annotation } from '../annotations';

export class NerPlusPlusService extends AbstractStore implements IParser {
    annotation: Annotation = Annotation.ner;
    content: NerPlusPlusToken[][];
    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\n/);
    elementsPattern: RegExp = new RegExp(/\t/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor(content?: NerPlusPlusToken[][]) {
        super();
        if (content) {
            this.content = content;
        }
    }

    ofToken(value: string[]): NerPlusPlusToken {
        const token = value[0];
        const pos = 'O';
        const chunk = 'O';
        const shortShape = 'O';
        const label = '';
        return { token, pos, chunk, shortShape, label };
    }

    createToken(token: string, ...elements: string[]): NerPlusPlusToken {
        return {
            token,
            label: elements[0] ? elements[0] : 'O',
            pos: elements[1] ? elements[1] : '_',
            chunk: elements[3] ? elements[2] : '_',
            shortShape: elements[3] ? elements[3] : '_'
        };
    }



    intoText(content: NerPlusPlusToken[][]): string {
        const text = [];
        content.forEach(sentence => {
            const sentenceArray = [];
            sentence.forEach(token => {
                const values: string[] = Object.values(token);
                let tag = 'O';
                if (values[1] !== '' && values[1] !== 'O') {
                    tag = values[1].concat('-', values[2]);
                }
                values.splice(1, 2, tag);
                sentenceArray.push(values.join('\t'));
            });
            text.push(sentenceArray.join('\n'));
        });
        return text.join('\n\n');
    }
}