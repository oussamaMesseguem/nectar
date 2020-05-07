export interface NerPlusPlusToken {
    token: string;
    pos: string;
    chunk: string;
    shortShape: string;
    label: string;
}

export function createNerPlusPlusToken(
    token: string, label?: string, pos?: string, chunk?: string,
    shortShape?: string): NerPlusPlusToken {
    return {
        token,
        label: label ? label : 'O',
        pos: pos ? pos : '_',
        chunk: chunk ? chunk : '_',
        shortShape: shortShape ? shortShape : '_',
    };
}
