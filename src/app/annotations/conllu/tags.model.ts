export interface UPos {
    tag: string;
    name: string;
    definition: string;
    link: string;
    examples: string[];
}

export interface XPos {
    tag: string;
    name: string;
    definition: string;
    link: string;
    examples: string[];
}
export interface UDeprel {
    tag: string;
    name: string;
    link: string;
}

export interface UFeats {
    tag: string;
    name: string;
    link: string;
    values: Feat[];
}

interface Feat {
    tag: string;
    name: string;
    link: string;
}

export interface UDeps {
    head: number[];
    values: UDeprel[];
}

interface DepsPair {
    index: number;
    deprel: UDeprel;
}

export interface ConlluTags {
    upos: UPos[];
    xpos: XPos[];
    feat: UFeats[];
    head: number[];
    deprel: UDeprel[];
    deps: UDeps;
}
