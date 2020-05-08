/**
 * Gives the allowed annotations.
 * Values are the displayed title.
 */
export enum Annotation {
    conllu = 'Conll-U',
    ner = 'Ner',
    nerPlusPlus = 'Ner++',
    raw = 'Raw'
}

export enum Language {
    en = 'English',
    fr = 'French',
    es = 'Spanish'
}

export interface Tokenable {
    token: string;
}

/**
 * A type for Store keys
 */
export type AnnotationType = keyof typeof Annotation;
