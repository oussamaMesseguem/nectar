import { FormControl } from '@angular/forms';

/**
 * Conll-u tags for one token
 */
export class ConllXToken {

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

    static of(conllXToken: ConllXToken | null) {
        if (conllXToken) {

            return new ConllXToken(
                {
                    index: conllXToken.index, token: conllXToken.token, lemma: conllXToken.lemma, upos: conllXToken.upos,
                    xpos: conllXToken.xpos, feat: conllXToken.feat, head: conllXToken.head, deprel: conllXToken.deprel,
                    deps: conllXToken.deps, misc: conllXToken.misc
                });
        }
        return new ConllXToken();
    }

    static fromTab(content: string[]) {
        const conll = new ConllXToken(
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

export class ConllXTokenForm {
    index = new FormControl();
    token = new FormControl();
    lemma = new FormControl();
    upos = new FormControl();
    xpos = new FormControl();
    feat = new FormControl();
    head = new FormControl();
    deprel = new FormControl();
    deps = new FormControl();
    misc = new FormControl();

    constructor(conll: ConllXToken) {
        this.index.setValue(conll.index);
        this.token.setValue(conll.token);
        this.lemma.setValue(conll.lemma);
        this.upos.setValue(conll.upos);
        this.xpos.setValue(conll.xpos);
        this.feat.setValue(conll.feat);
        this.head.setValue(conll.head);
        this.deprel.setValue(conll.deprel);
        this.deps.setValue(conll.deps);
        this.misc.setValue(conll.misc);
    }
}
