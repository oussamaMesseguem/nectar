import { Tokenable } from '../annotations';

export interface NerPlusPlusToken extends Tokenable {
    pos: string;
    chunk: string;
    shortShape: string;
    label: string;
}
