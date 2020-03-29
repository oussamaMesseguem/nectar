// /**
//  * Collection of sentences conll-u annotated
//  */
// export interface IConll {
//     sentences: ConllSentence[];
// }

import { ParserModel } from 'src/app/content-upload/content-upload.service';

// /**
//  * Collection of ConllToken for one sentence.
//  */
// export class ConllSentence {

//     tokens: ConllToken[] = [];

//     constructor(tokens?: ConllToken[]) {
//         if (tokens) {
//             this.tokens = tokens;
//         } else {
//             this.tokens = [];
//         }
//     }
// }

/**
 * Conll-u tags for one token
 */
export class ConllToken {

    index: number;
    token: string;
    lemma: string;
    upos: string;
    xpos: string;
    feat: any;
    head: number;
    deprel: any;
    deps: any;
    misc: any;

    constructor({ index, token, lemma, upos, xpos, feat, head, deprel, deps, misc }:
        {
            index?: number; token?: string; lemma?: string; upos?: string;
            xpos?: string; feat?: any; head?: number; deprel?: any; deps?: any; misc?: any;
        } = {}) {

        this.index = index;
        this.token = token;
        this.lemma = lemma;
        this.upos = upos;
        this.xpos = xpos;
        this.feat = feat ? feat : '_';
        this.head = head;
        this.deprel = deprel;
        this.deps = deps ? deps : '_';
        this.misc = misc;
    }

    static of(conllToken: ConllToken | null) {
        if (conllToken) {

            return new ConllToken(
                {
                    index: conllToken.index, token: conllToken.token, lemma: conllToken.lemma, upos: conllToken.upos,
                    xpos: conllToken.xpos, feat: conllToken.feat, head: conllToken.head, deprel: conllToken.deprel,
                    deps: conllToken.deps, misc: conllToken.misc
                });
        }
        return new ConllToken();
    }

    static fromTab(content: string[]) {
        const conll = new ConllToken(
            {
                // tslint:disable-next-line: radix
                index: Number.parseInt(
                    content[0]), token: content[1], lemma: content[2], upos: content[3], xpos: content[4], feat: content[5],
                // tslint:disable-next-line: radix
                head: Number.parseInt(content[6]), deprel: content[7], deps: content[8], misc: content[9]
            });

        return conll;

    }

}

// export class CollTokenModelParser extends ConllToken implements ParserModel {

//     get size(): number {
//         return this.token.length;
//     }

//     static fromTab(content: string[]) {
//         const conll = new ConllToken(
//             {
//                 // tslint:disable-next-line: radix
//                 index: Number.parseInt(
//                     content[0]), token: content[1], lemma: content[2], upos: content[3], xpos: content[4], feat: content[5],
//                 // tslint:disable-next-line: radix
//                 head: Number.parseInt(content[6]), deprel: content[7], deps: content[8], misc: content[9]
//             });

//         const modelParser = conll as CollTokenModelParser;


//         return modelParser;

//     }
// }
