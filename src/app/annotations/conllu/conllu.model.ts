import { FormControl } from '@angular/forms';

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

export class ConllTokenForm {
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

    constructor(conll: ConllToken) {
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

export const UPOS: UPos[] = [
    {
        tag: 'ADJ',
        name: 'adjective',
        definition: '',
        link: '',
        examples: []
    },
     {
        tag: 'ADP',
        name: 'adposition',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'ADV',
        name: 'adverb',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'AUX',
        name: 'auxiliary',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'CCONJ',
        name: 'coordinating conjunction',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'DET',
        name: 'determiner',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'INTJ',
        name: 'interjection',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'NOUN',
        name: 'noun',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'NUM',
        name: 'numeral',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'PART',
        name: 'particle',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'PRON',
        name: 'pronoun',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'PROPN',
        name: 'proper noun',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'PUNCT',
        name: 'punctuation',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'SCONJ',
        name: 'subordinating conjunction',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'SYM',
        name: 'symbol',
        definition: '',
        link: '',
        examples: []
    },
    {
        tag: 'VERB',
        name: 'verb',
        definition: '',
        link: '',
        examples: []
    },
];

export const UDEPREL: UDeprel[] = [

    {
        tag: 'acl',
        name: 'clausal modifier of noun (adjectival clause)',
        link: 'http://universaldependencies.org/u/dep/acl.html',
    },
    {
        tag: 'advcl',
        name: 'adverbial clause modifier',
        link: 'http://universaldependencies.org/u/dep/advcl.html',
    },
    {
        tag: 'advmod',
        name: 'clausal modifier of noun (adjectival clause)',
        link: 'http://universaldependencies.org/u/dep/acl.html',
    },
    {
        tag: 'amod',
        name: 'adjectival modifier',
        link: 'http://universaldependencies.org/u/dep/amod.html',
    },
    {
        tag: 'appos',
        name: 'appositional modifier',
        link: 'http://universaldependencies.org/u/dep/appos.html',
    },
    {
        tag: 'aux',
        name: 'auxiliary',
        link: 'http://universaldependencies.org/u/dep/aux.html',
    },
    {
        tag: 'case',
        name: 'case marking',
        link: 'http://universaldependencies.org/u/dep/case.html',
    },
    {
        tag: 'cc',
        name: 'coordinating conjunction',
        link: 'http://universaldependencies.org/u/dep/cc.html',
    },
    {
        tag: 'ccomp',
        name: 'clausal complement',
        link: 'http://universaldependencies.org/u/dep/ccomp.html',
    },
    {
        tag: 'clf',
        name: 'classifier',
        link: 'http://universaldependencies.org/u/dep/clf.html',
    },
    {
        tag: 'compound',
        name: 'compound',
        link: 'http://universaldependencies.org/u/dep/compound.html',
    },
    {
        tag: 'conj',
        name: 'conjunct',
        link: 'http://universaldependencies.org/u/dep/conj.html',
    },
    {
        tag: 'cop',
        name: 'copula',
        link: 'http://universaldependencies.org/u/dep/cop.html',
    },
    {
        tag: 'csubj',
        name: 'clausal subject',
        link: 'http://universaldependencies.org/u/dep/csubj.html',
    },
    {
        tag: 'dep',
        name: 'unspecified dependency',
        link: 'http://universaldependencies.org/u/dep/dep.html',
    },
    {
        tag: 'det',
        name: 'determiner',
        link: 'http://universaldependencies.org/u/dep/det.html',
    },
    {
        tag: 'discourse',
        name: 'discourse element',
        link: 'http://universaldependencies.org/u/dep/discourse.html',
    },
    {
        tag: 'dislocated',
        name: 'dislocated elements',
        link: 'http://universaldependencies.org/u/dep/dislocated.html',
    },
    {
        tag: 'expl',
        name: 'expletive',
        link: 'http://universaldependencies.org/u/dep/expl.html',
    },
    {
        tag: 'fixed',
        name: 'fixed multiword expression',
        link: 'http://universaldependencies.org/u/dep/fixed.html',
    },
    {
        tag: 'flat',
        name: 'flat multiword expression',
        link: 'http://universaldependencies.org/u/dep/flat.html',
    },
    {
        tag: 'goeswith',
        name: 'goes with',
        link: 'http://universaldependencies.org/u/dep/goeswith.html',
    },
    {
        tag: 'iobj',
        name: 'indirect object',
        link: 'http://universaldependencies.org/u/dep/iobj.html',
    },
    {
        tag: 'list',
        name: 'list',
        link: 'http://universaldependencies.org/u/dep/list.html',
    },
    {
        tag: 'mark',
        name: 'marker',
        link: 'http://universaldependencies.org/u/dep/mark.html',
    },
    {
        tag: 'nsubj',
        name: 'nominal modifier',
        link: 'http://universaldependencies.org/u/dep/nsubj.html',
    },
    {
        tag: 'nsubj',
        name: 'nominal subject',
        link: 'http://universaldependencies.org/u/dep/nsubj.html',
    },
    {
        tag: 'nummod',
        name: 'numeric modifier',
        link: 'http://universaldependencies.org/u/dep/nummod.html',
    },
    {
        tag: 'obj',
        name: 'object',
        link: 'http://universaldependencies.org/u/dep/obj.html',
    },
    {
        tag: 'obl',
        name: 'oblique nominal',
        link: 'http://universaldependencies.org/u/dep/obl.html',
    },
    {
        tag: 'orphan',
        name: 'orphan',
        link: 'http://universaldependencies.org/u/dep/orphan.html',
    },
    {
        tag: 'parataxis',
        name: 'parataxis',
        link: 'http://universaldependencies.org/u/dep/parataxis.html',
    },
    {
        tag: 'punct',
        name: 'punctuation',
        link: 'http://universaldependencies.org/u/dep/punct.html',
    },
    {
        tag: 'reparandum',
        name: 'overridden disfluency',
        link: 'http://universaldependencies.org/u/dep/reparandum.html',
    },
    {
        tag: 'root',
        name: 'root',
        link: 'http://universaldependencies.org/u/dep/root.html',
    },
    {
        tag: 'vocative',
        name: 'vocative',
        link: 'http://universaldependencies.org/u/dep/vocative.html',
    },
    {
        tag: 'xcomp',
        name: 'open clausal complement',
        link: 'http://universaldependencies.org/u/dep/xcomp.html',
    },

]
