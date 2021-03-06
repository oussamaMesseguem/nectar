import { Tokenable } from '../annotations';

export interface NerToken extends Tokenable {
    label: string;
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
    'ORG' = '#7B1FA2',
    'GPE' = '#4A148C',
    'LOC' = '#AA00FF',
    'PRODUCT' = 'RosyBrown',
    'EVENT' = '#880E4F',
    'WORK_OF_ART' = 'Coral',
    'LAW' = 'DarkCyan',
    'LANGUAGE' = 'Peru',
    'DATE' = 'MediumVioletRed',
    'TIME' = 'Sienna',
    'PERCENT' = '#B71C1C',
    'MONEY' = 'Salmon',
    'QUANTITY' = 'Chocolate',
    'ORDINAL' = 'Violet',
    'CARDINAL' = 'DeepSkyBlue'
}
