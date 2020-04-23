import { IParser } from 'src/app/injector/injector.service';
import { Annotation } from '../annotations';

export interface NerToken {
    token: string;
    tag: string;
    type: string;
}

export class NerParser implements IParser {
    annotation: Annotation = Annotation.ner;
    splitPattern: RegExp = new RegExp(/\n\s*\n/);
    tokenPattern: RegExp = new RegExp(/\t/);
    ignoreLinePattern: RegExp = new RegExp('#');

    constructor() {}

    ofToken(value: string[]): NerToken {
        const token = value[0];
        let tag = 'O';
        let type = '';
        if (value[1] !== 'O') {
            const t = value[1].split('-');
            tag = t[0];
            type = t[1];
        }
        return { token, tag, type };
    }
}

export function createNerToken(token: string, tag?: string, type?: string) {
    return { token, tag: tag ? tag : '', type: type ? type : '' };
}

/**
 * Appends the content into a string.
 * @param content the content from the store
 */
export function nerIntoText(content: NerToken[][]): string {
    const text = [];
    content.forEach(sentence => {
        const sentenceArray = [];
        sentence.forEach(token => {
            const values: string[] = Object.values(token);
            let tag = 'O';
            if (values[1] !== 'O') {
                tag = values[1].concat('-', values[2]);
            }
            values.splice(1, 2, tag);
            sentenceArray.push(values.join('\t'));
        });
        text.push(sentenceArray.join('\n'));
    });
    return text.join('\n\n');
}

export const NerTags = [
    { tag: 'B', description: 'The first token of a multi-token entity' },
    { tag: 'I', description: 'An inner token of a multi-token entity' },
    { tag: 'L', description: 'The final token of a multi-token entity' },
    { tag: 'U', description: 'A single-token entity' },
    { tag: 'O', description: 'A non-entity token' },
];

export const NerTypes = [
    {
        tag: 'PERSON',
        description: 'People, including fictional.'
    },
    {
        tag: 'NORP',
        description: 'Nationalities or religious or political groups.'
    },
    {
        tag: 'FAC',
        description: 'Buildings, airports, highways, bridges, etc.'
    },
    {
        tag: 'ORG',
        description: 'Companies, agencies, institutions, etc.'
    },
    {
        tag: 'GPE',
        description: 'Countries, cities, states'
    },
    {
        tag: 'LOC',
        description: 'Non-GPE locations, mountain ranges, bodies of water.'
    },
    {
        tag: 'PRODUCT',
        description: 'Objects, vehicles, foods, etc. (Not services.)'
    },
    {
        tag: 'EVENT',
        description: 'Named hurricanes, battles, wars, sports events, etc.'
    },
    {
        tag: 'WORK_OF_ART',
        description: 'Titles of books, songs, etc.'
    },
    {
        tag: 'LAW',
        description: 'Named documents made into laws.'
    },
    {
        tag: 'LANGUAGE',
        description: 'Any named language.'
    },
    {
        tag: 'DATE',
        description: 'Absolute or relative dates or periods.'
    },
    {
        tag: 'TIME',
        description: 'Times smaller than a day.'
    },
    {
        tag: 'PERCENT',
        description: 'Percentage, including ”%“.'
    },
    {
        tag: 'MONEY',
        description: 'Monetary values, including unit.'
    },
    {
        tag: 'QUANTITY',
        description: 'Measurements, as of weight or distance.'
    },
    {
        tag: 'ORDINAL',
        description: '“first”, “second”, etc.'
    },
    {
        tag: 'CARDINAL',
        description: 'Numerals that do not fall under another type.'
    },
];

export enum NER_TAG_COLOR {
    'PERSON' = 'IndianRed',
    'NORP' = 'HotPink',
    'FAC' = 'OrangeRed',
    'ORG' = 'DarkKhaki',
    'GPE' = 'Aquamarine',
    'LOC' = 'AntiqueWhite',
    'PRODUCT' = 'RosyBrown',
    'EVENT' = 'Lime',
    'WORK_OF_ART' = 'Coral',
    'LAW' = 'DarkCyan',
    'LANGUAGE' = 'Peru',
    'DATE' = 'MediumVioletRed',
    'TIME' = 'Sienna',
    'PERCENT' = 'Chartreuse',
    'MONEY' = 'Salmon',
    'QUANTITY' = 'Chocolate',
    'ORDINAL' = 'Violet',
    'CARDINAL' = 'DeepSkyBlue'
}
