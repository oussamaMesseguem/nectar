export class NerToken {
    token: string;
    tag: string;
    type: string;

    constructor(token?: string, tag?: string, type?: string) {
        this.token = token;
        this.tag = tag;
        this.type = type;
    }

    static fromTab(line: string[]): NerToken {
        return new NerToken(line[0], line[1], line[2]);
    }
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
// export const NerTags = {
//     b: { tag: 'B', description: 'The first token of a multi-token entity' },
//     i: { tag: 'I', description: 'An inner token of a multi-token entity' },
//     l: { tag: 'L', description: 'The final token of a multi-token entity' },
//     u: { tag: 'U', description: 'A single-token entity' },
//     o: { tag: 'O', description: 'A non-entity token' },
// };

// export const NerTypes = {
//     PERSON: {
//         tag: 'PERSON',
//         description: 'People, including fictional.'
//     },
//     NORP: {
//         tag: 'NORP',
//         description: 'Nationalities or religious or political groups.'
//     },
//     FAC: {
//         tag: 'FAC',
//         description: 'Buildings, airports, highways, bridges, etc.'
//     },
//     ORG: {
//         tag: 'ORG',
//         description: 'Companies, agencies, institutions, etc.'
//     },
//     GPE: {
//         tag: 'GPE',
//         description: 'Countries, cities, states'
//     },
//     LOC: {
//         tag: 'LOC',
//         description: 'Non-GPE locations, mountain ranges, bodies of water.'
//     },
//     PRODUCT: {
//         tag: 'PRODUCT',
//         description: 'Objects, vehicles, foods, etc. (Not services.)'
//     },
//     EVENT: {
//         tag: 'EVENT',
//         description: 'Named hurricanes, battles, wars, sports events, etc.'
//     },
//     WORK_OF_ART: {
//         tag: 'WORK_OF_ART',
//         description: 'Titles of books, songs, etc.'
//     },
//     LAW: {
//         tag: 'LAW',
//         description: 'Named documents made into laws.'
//     },
//     LANGUAGE: {
//         tag: 'LANGUAGE',
//         description: 'Any named language.'
//     },
//     DATE: {
//         tag: 'DATE',
//         description: 'Absolute or relative dates or periods.'
//     },
//     TIME: {
//         tag: 'TIME',
//         description: 'Times smaller than a day.'
//     },
//     PERCENT: {
//         tag: 'PERCENT',
//         description: 'Percentage, including ”%“.'
//     },
//     MONEY: {
//         tag: 'MONEY',
//         description: 'Monetary values, including unit.'
//     },
//     QUANTITY: {
//         tag: 'QUANTITY',
//         description: 'Measurements, as of weight or distance.'
//     },
//     ORDINAL: {
//         tag: 'ORDINAL',
//         description: '“first”, “second”, etc.'
//     },
//     CARDINAL: {
//         tag: 'CARDINAL',
//         description: 'Numerals that do not fall under another type.'
//     },
// };
