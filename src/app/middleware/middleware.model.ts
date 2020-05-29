
export interface SpacyResponse {
    sentence: string;
    dep_parse: SpacyDep;
}

export interface SpacyDep {
    arcs: SpacyArc[];
    words: SpacyWord[];
}

export interface SpacyArc {
    dir: string;
    end: number;
    label: string;
    start: number;
    text: string;
}

export interface SpacyWord {
    tag: string;
    text: string;
}

export interface SpacyEnt {
    end: number;
    start: number;
    type: string;
}
