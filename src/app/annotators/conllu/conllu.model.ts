import { Tokenable } from '../annotations';

/**
 * A conllu content is an array of conllu token arrays.
 * * This interface represents a token and its tags
 * * Token in the same array are the words in the same sentence.
 * * An array is a sentence, hence the first arrays is the document.
 */
export interface ConlluToken extends Tokenable {
    index: string;
    lemma: string;
    upos: string;
    xpos: string;
    feat: string;
    head: string;
    deprel: string;
    deps: string;
    misc: string;
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

];

export const UFEATS: UFeats[] = [
    {
        tag: 'Abbr',
        name: 'abbreviation',
        link: '',
        values: [
            {
                tag: 'Yes',
                name: 'it is abbreviation',
                link: ''
            }
        ]

    },
    {
        tag: 'AbsErgDatNumber',
        name: 'number agreement with absolutive/ergative/dative argument',
        link: '',
        values: [
            {
                tag: 'abs',
                name: 'absolutive',
                link: ''
            },
            {
                tag: 'erg',
                name: 'ergative',
                link: ''
            },
            {
                tag: 'dat',
                name: 'dative',
                link: ''
            }
        ]

    },
    {
        tag: 'AbsErgDatPerson',
        name: 'person agreement with absolutive/ergative/dative argument',
        link: '',
        values: [
            {
                tag: 'abs',
                name: 'absolutive',
                link: ''
            },
            {
                tag: 'erg',
                name: 'ergative',
                link: ''
            },
            {
                tag: 'dat',
                name: 'dative',
                link: ''
            }
        ]

    },
    {
        tag: 'AbsErgDatPolite',
        name: 'politeness agreement with absolutive/ergative/dative argument',
        link: '',
        values: [
            {
                tag: 'abs',
                name: 'absolutive',
                link: ''
            },
            {
                tag: 'erg',
                name: 'ergative',
                link: ''
            },
            {
                tag: 'dat',
                name: 'dative',
                link: ''
            }
        ]

    },
    {
        tag: 'AdpType',
        name: 'adposition type',
        link: '',
        values: [
            {
                tag: 'prep',
                name: 'preposition',
                link: ''
            },
            {
                tag: 'post',
                name: 'postposition',
                link: ''
            },
            {
                tag: 'circ',
                name: 'circumposition',
                link: ''
            },
            {
                tag: 'voc',
                name: 'vocalized preposition',
                link: ''
            }
        ]

    },
    {
        tag: 'AdvType',
        name: 'adverb type',
        link: '',
        values: [
            {
                tag: 'Man',
                name: 'adverb of manner (“how”)',
                link: ''
            },
            {
                tag: 'Loc',
                name: 'adverb of location (“where, where to, where from”)',
                link: ''
            },
            {
                tag: 'Tim',
                name: 'adverb of time (“when, since when, till when”)',
                link: ''
            },
            {
                tag: 'Deg',
                name: 'adverb of quantity or degree (“how much”)',
                link: ''
            },
            {
                tag: 'Cau',
                name: 'adverb of cause (“why”)',
                link: ''
            },
            {
                tag: 'Mod',
                name: 'adverb of modal nature',
                link: ''
            },
            {
                tag: 'Sta',
                name: 'adverb of state',
                link: ''
            },
            {
                tag: 'Ex',
                name: 'existential “there”',
                link: ''
            },
            {
                tag: 'Adadj',
                name: 'ad-adjective',
                link: ''
            }
        ]

    },
    {
        tag: 'Animacy',
        name: '',
        link: '',
        values: [
            {
                tag: 'Anim',
                name: 'animate',
                link: ''
            },
            {
                tag: 'Hum',
                name: 'human',
                link: ''
            },
            {
                tag: 'Inan',
                name: 'inanimate',
                link: ''
            },
            {
                tag: 'Nhum',
                name: 'non-human',
                link: ''
            }
        ]

    },
    {
        tag: 'Aspect',
        name: 'aspect',
        link: '',
        values: [
            {
                tag: 'Hab',
                name: 'habitual aspect',
                link: ''
            },
            {
                tag: 'Imp',
                name: 'imperfect aspect',
                link: ''
            },
            {
                tag: 'Iter',
                name: 'iterative / frequentative aspect',
                link: ''
            },
            {
                tag: 'Perf',
                name: 'perfect aspect',
                link: ''
            },
            {
                tag: 'Prosp',
                name: 'prospective aspect',
                link: ''
            },
            {
                tag: 'Prog',
                name: 'progressive aspect',
                link: ''
            }
        ]

    },
    {
        tag: 'Case',
        name: 'case',
        link: '',
        values: [
            {
                tag: 'Abe',
                name: 'abessive',
                link: ''
            },
            {
                tag: 'Abl',
                name: 'ablative',
                link: ''
            },
            {
                tag: 'Abs',
                name: 'absolutive',
                link: ''
            },
            {
                tag: 'Acc',
                name: 'accusative / oblique',
                link: ''
            },
            {
                tag: 'Add',
                name: 'additive',
                link: ''
            },
            {
                tag: 'Ade',
                name: 'adessive',
                link: ''
            },
            {
                tag: 'All',
                name: 'allative',
                link: ''
            },
            {
                tag: 'Ben',
                name: 'benefactive / destinative',
                link: ''
            },
            {
                tag: 'Cau',
                name: 'causative / motivative / purposive',
                link: ''
            },
            {
                tag: 'Cmp',
                name: 'comparative',
                link: ''
            },
            {
                tag: 'Cns',
                name: 'considerative',
                link: ''
            },
            {
                tag: 'Com',
                name: 'comitative / associative',
                link: ''
            },
            {
                tag: 'Dat',
                name: 'dative',
                link: ''
            },
            {
                tag: 'Del',
                name: 'delative',
                link: ''
            },
            {
                tag: 'Dis',
                name: 'distributive',
                link: ''
            },
            {
                tag: 'Ela',
                name: 'elative',
                link: ''
            },
            {
                tag: 'Equ',
                name: 'equative',
                link: ''
            },
            {
                tag: 'Erg',
                name: 'ergative',
                link: ''
            },
            {
                tag: 'Ess',
                name: 'essive / prolative',
                link: ''
            },
            {
                tag: 'Gen',
                name: 'genitive',
                link: ''
            },
            {
                tag: 'Ill',
                name: 'illative',
                link: ''
            },
            {
                tag: 'Ine',
                name: 'inessive',
                link: ''
            },
            {
                tag: 'Ins',
                name: 'instrumental / instructive',
                link: ''
            },
            {
                tag: 'Lat',
                name: 'lative / directional allative',
                link: ''
            },
            {
                tag: 'Loc',
                name: 'locative',
                link: ''
            },
            {
                tag: 'Nom',
                name: 'nominative / direct',
                link: ''
            },
            {
                tag: 'Par',
                name: 'partitive',
                link: ''
            },
            {
                tag: 'Per',
                name: 'perlative',
                link: ''
            },
            {
                tag: 'Sub',
                name: 'sublative',
                link: ''
            },
            {
                tag: 'Sup',
                name: 'superessive',
                link: ''
            },
            {
                tag: 'Tem',
                name: 'temporal',
                link: ''
            },
            {
                tag: 'Ter',
                name: 'terminative / terminal allative',
                link: ''
            },
            {
                tag: 'Tra',
                name: 'translative / factive',
                link: ''
            },
            {
                tag: 'Voc',
                name: 'vocative',
                link: ''
            }
        ]

    },
    {
        tag: 'Clusivity',
        name: 'clusivity',
        link: '',
        values: [
            {
                tag: 'In',
                name: 'inclusive',
                link: ''
            },
            {
                tag: 'Ex',
                name: 'exclusive',
                link: ''
            }
        ]

    },
    {
        tag: 'ConjType',
        name: 'conjunction type',
        link: '',
        values: [
            {
                tag: 'Comp',
                name: 'comparing conjunction',
                link: ''
            },
            {
                tag: 'Oper',
                name: 'mathematical operator',
                link: ''
            }
        ]

    },
    {
        tag: 'Definite',
        name: 'definiteness or state',
        link: '',
        values: [
            {
                tag: 'Com',
                name: 'complex',
                link: ''
            },
            {
                tag: 'Cons',
                name: 'construct state / reduced definiteness',
                link: ''
            },
            {
                tag: 'Def',
                name: 'definite',
                link: ''
            },
            {
                tag: 'Ind',
                name: 'indefinite',
                link: ''
            },
            {
                tag: 'Spec',
                name: 'specific indefinite',
                link: ''
            }
        ]

    },
    {
        tag: 'Degree',
        name: 'degree of comparison',
        link: '',
        values: [
            {
                tag: 'Pos',
                name: 'positive, first degree',
                link: ''
            },
            {
                tag: 'Equ',
                name: 'equative',
                link: ''
            },
            {
                tag: 'Cmp',
                name: 'comparative, second degree',
                link: ''
            },
            {
                tag: 'Sup',
                name: 'superlative, third degree',
                link: ''
            },
            {
                tag: 'Abs',
                name: 'absolute superlative',
                link: ''
            }
        ]

    },
    {
        tag: 'Echo',
        name: 'is this an echo word or a reduplicative?',
        link: '',
        values: [
            {
                tag: 'Rdp',
                name: 'reduplicative',
                link: ''
            },
            {
                tag: 'Ech',
                name: 'echo',
                link: ''
            }
        ]

    },
    {
        tag: 'ErgDatGender',
        name: 'gender agreement with ergative/dative argument',
        link: '',
        values: [
            {
                tag: 'Masc',
                name: 'masculine gender',
                link: ''
            },
            {
                tag: 'Fem',
                name: 'feminine gender',
                link: ''
            }
        ]

    },
    {
        tag: 'Evident',
        name: 'evidentiality',
        link: '',
        values: [
            {
                tag: 'Fh',
                name: 'firsthand',
                link: ''
            },
            {
                tag: 'Nfh',
                name: 'non-firsthand',
                link: ''
            }
        ]

    },
    {
        tag: 'Foreign',
        name: 'is this a foreign word?',
        link: '',
        values: [
            {
                tag: 'Yes',
                name: 'it is foreign',
                link: ''
            }
        ]

    },
    {
        tag: 'Gender',
        name: 'gender',
        link: '',
        values: [
            {
                tag: 'Masc',
                name: 'masculine gender',
                link: ''
            },
            {
                tag: 'Fem',
                name: 'feminine gender',
                link: ''
            },
            {
                tag: 'Neut',
                name: 'neuter gender',
                link: ''
            },
            {
                tag: 'Com',
                name: 'common gender',
                link: ''
            }
        ]

    },
    {
        tag: 'Hyph',
        name: 'hyphenated compound or part of it',
        link: '',
        values: [
            {
                tag: 'Yes',
                name: 'it is part of hyphenated compound',
                link: ''
            }
        ]

    },
    {
        tag: 'Mood',
        name: 'Mood',
        link: '',
        values: [
            {
                tag: 'Ind',
                name: 'indicative',
                link: ''
            },
            {
                tag: 'Imp',
                name: 'imperative',
                link: ''
            },
            {
                tag: 'Cnd',
                name: 'conditional',
                link: ''
            },
            {
                tag: 'Pot',
                name: 'potential',
                link: ''
            },
            {
                tag: 'Sub',
                name: 'subjunctive / conjunctive',
                link: ''
            },
            {
                tag: 'Jus',
                name: 'jussive / injunctive',
                link: ''
            },
            {
                tag: 'Prp',
                name: 'purposive',
                link: ''
            },
            {
                tag: 'Qot',
                name: 'quotative',
                link: ''
            },
            {
                tag: 'Opt',
                name: 'optative',
                link: ''
            },
            {
                tag: 'Des',
                name: 'desiderative',
                link: ''
            },
            {
                tag: 'Nec',
                name: 'necessitative',
                link: ''
            },
            {
                tag: 'Adm',
                name: 'admirative',
                link: ''
            }
        ]

    },
    {
        tag: 'NameType',
        name: 'type of named entity',
        link: '',
        values: [
            {
                tag: 'Geo',
                name: 'geographical name',
                link: ''
            },
            {
                tag: 'Prs',
                name: 'name of person',
                link: ''
            },
            {
                tag: 'Giv',
                name: 'given name of person',
                link: ''
            },
            {
                tag: 'Sur',
                name: 'surname / family name of person',
                link: ''
            },
            {
                tag: 'Nat',
                name: 'nationality',
                link: ''
            },
            {
                tag: 'Com',
                name: 'company, organization',
                link: ''
            },
            {
                tag: 'Pro',
                name: 'product',
                link: ''
            },
            {
                tag: 'Oth',
                name: 'other',
                link: ''
            }
        ]

    },
    {
        tag: 'NounType',
        name: 'noun type',
        link: '',
        values: [
            {
                tag: 'Class',
                name: 'classifier',
                link: ''
            }
        ]

    },
    {
        tag: 'NumForm',
        name: 'numeral form',
        link: '',
        values: [
            {
                tag: 'Word',
                name: 'number expressed as word',
                link: ''
            },
            {
                tag: 'Digit',
                name: 'number expressed using digits',
                link: ''
            },
            {
                tag: 'Roman',
                name: 'roman numeral',
                link: ''
            }
        ]

    },
    {
        tag: 'NumType',
        name: 'numeral type',
        link: '',
        values: [
            {
                tag: 'Card',
                name: 'cardinal number or corresponding interrogative / relative / indefinite / demonstrative word',
                link: ''
            },
            {
                tag: 'Ord',
                name: 'ordinal number or corresponding interrogative / relative / indefinite / demonstrative word',
                link: ''
            },
            {
                tag: 'Mult',
                name: 'multiplicative numeral or corresponding interrogative / relative / indefinite / demonstrative word',
                link: ''
            },
            {
                tag: 'Frac',
                name: 'fraction',
                link: ''
            },
            {
                tag: 'Sets',
                name: 'number of sets of things; collective numeral',
                link: ''
            },
            {
                tag: 'Dist',
                name: 'distributive numeral',
                link: ''
            },
            {
                tag: 'Range',
                name: 'range of values',
                link: ''
            }
        ]

    },
    {
        tag: 'NumValue',
        name: 'numeric value',
        link: '',
        values: [
            {
                tag: '1',
                name: 'numeric value 1',
                link: ''
            },
            {
                tag: '2',
                name: 'numeric value 2',
                link: ''
            },
            {
                tag: '3',
                name: 'numeric value 3 or 4',
                link: ''
            }
        ]

    },
    {
        tag: 'Number',
        name: 'number',
        link: '',
        values: [
            {
                tag: 'Sing',
                name: 'singular number',
                link: ''
            },
            {
                tag: 'Plur',
                name: 'plural number',
                link: ''
            },
            {
                tag: 'Dual',
                name: 'dual number',
                link: ''
            },
            {
                tag: 'Tri',
                name: 'trial number',
                link: ''
            },
            {
                tag: 'Pauc',
                name: 'paucal number',
                link: ''
            },
            {
                tag: 'Grpa',
                name: 'greater paucal number',
                link: ''
            },
            {
                tag: 'Grpl',
                name: 'greater plural number',
                link: ''
            },
            {
                tag: 'Inv',
                name: 'inverse number',
                link: ''
            },
            {
                tag: 'Count',
                name: 'count plural',
                link: ''
            },
            {
                tag: 'Ptan',
                name: 'plurale tantum',
                link: ''
            },
            {
                tag: 'Coll',
                name: 'collective / mass / singulare tantu',
                link: ''
            }
        ]

    },
    {
        tag: 'PartType',
        name: 'particle type',
        link: '',
        values: [
            {
                tag: 'Mod',
                name: 'modal particle',
                link: ''
            },
            {
                tag: 'Emp',
                name: 'particle of emphasis',
                link: ''
            },
            {
                tag: 'Res',
                name: 'particle of response',
                link: ''
            },
            {
                tag: 'Inf',
                name: 'infinitive marker',
                link: ''
            },
            {
                tag: 'Vbp',
                name: 'separated verb prefix in German',
                link: ''
            }
        ]

    },
    {
        tag: 'Person',
        name: 'person',
        link: '',
        values: [
            {
                tag: '0',
                name: 'zero person',
                link: ''
            },
            {
                tag: '1',
                name: 'first person',
                link: ''
            },
            {
                tag: '2',
                name: 'second person',
                link: ''
            },
            {
                tag: '3',
                name: 'third person',
                link: ''
            },
            {
                tag: '4',
                name: 'fourth person',
                link: ''
            }
        ]

    },
    {
        tag: 'Polarity',
        name: 'polarity',
        link: '',
        values: [
            {
                tag: 'Pos',
                name: 'positive, affirmative',
                link: ''
            },
            {
                tag: 'Neg',
                name: 'negative',
                link: ''
            }
        ]

    },
    {
        tag: 'Polite',
        name: 'politeness',
        link: '',
        values: [
            {
                tag: 'Infm',
                name: 'informal register',
                link: ''
            },
            {
                tag: 'Form',
                name: 'formal register',
                link: ''
            },
            {
                tag: 'Elev',
                name: 'referent elevating',
                link: ''
            },
            {
                tag: 'Humb',
                name: 'speaker humbling',
                link: ''
            }
        ]

    },
    {
        tag: 'Poss',
        name: 'possessive',
        link: '',
        values: [
            {
                tag: 'Yes',
                name: 'it is possessive',
                link: ''
            }
        ]

    },
    {
        tag: 'PossGender',
        name: 'possessor’s gender',
        link: '',
        values: [
            {
                tag: 'Masc',
                name: 'masculine possessor',
                link: ''
            },
            {
                tag: 'Fem',
                name: 'feminine possessor',
                link: ''
            }
        ]

    },
    {
        tag: 'PossNumber',
        name: 'possessor’s number',
        link: '',
        values: [
            {
                tag: 'Sing',
                name: 'singular possessor',
                link: ''
            },
            {
                tag: 'Plur',
                name: 'plural possessor',
                link: ''
            }
        ]

    },
    {
        tag: 'PossPerson',
        name: 'possessor’s person',
        link: '',
        values: [
            {
                tag: '1',
                name: 'first person possessor',
                link: ''
            },
            {
                tag: '2',
                name: 'second person possessor',
                link: ''
            },
            {
                tag: '3',
                name: 'third person possessor',
                link: ''
            }
        ]

    },
    {
        tag: 'PossedNumber',
        name: 'possessed object’s number',
        link: '',
        values: [
            {
                tag: 'Sing',
                name: 'singular possession',
                link: ''
            },
            {
                tag: 'Plur',
                name: 'plural possession',
                link: ''
            }
        ]

    },
    {
        tag: 'Prefix',
        name: 'Word functions as a prefix in a compund construction',
        link: '',
        values: [
            {
                tag: 'Yes',
                name: 'it is a prefix of a compound',
                link: ''
            }
        ]

    },
    {
        tag: 'PrepCase',
        name: 'case form sensitive to prepositions',
        link: '',
        values: [
            {
                tag: 'Npr',
                name: 'non-prepositional case',
                link: ''
            },
            {
                tag: 'Pre',
                name: 'prepositional case',
                link: ''
            }
        ]

    },
    {
        tag: 'PronType',
        name: 'pronominal type',
        link: '',
        values: [
            {
                tag: 'Prs',
                name: 'personal or possessive personal pronoun or determiner',
                link: ''
            },
            {
                tag: 'Rcp',
                name: 'reciprocal pronoun',
                link: ''
            },
            {
                tag: 'Art',
                name: 'article',
                link: ''
            },
            {
                tag: 'Int',
                name: 'interrogative pronoun, determiner, numeral or adverb',
                link: ''
            },
            {
                tag: 'Rel',
                name: 'relative pronoun, determiner, numeral or adverb',
                link: ''
            },
            {
                tag: 'Exc',
                name: 'exclamative determiner',
                link: ''
            },
            {
                tag: 'Dem',
                name: 'demonstrative pronoun, determiner, numeral or adverb',
                link: ''
            },
            {
                tag: 'Emp',
                name: 'emphatic determiner',
                link: ''
            },
            {
                tag: 'Tot',
                name: 'total (collective) pronoun, determiner or adverb',
                link: ''
            },
            {
                tag: 'Neg',
                name: 'negative pronoun, determiner or adverb',
                link: ''
            },
            {
                tag: 'Ind',
                name: 'indefinite pronoun, determiner, numeral or adverb',
                link: ''
            }
        ]

    },
    {
        tag: 'PunctSide',
        name: 'which side of paired punctuation is this?',
        link: '',
        values: [
            {
                tag: 'Ini',
                name: 'initial (left bracket in English texts)',
                link: ''
            },
            {
                tag: 'Fin',
                name: 'final (right bracket in English texts)',
                link: ''
            }
        ]

    },
    {
        tag: 'PunctType',
        name: 'punctuation type',
        link: '',
        values: [
            {
                tag: 'Peri',
                name: ' period at the end of sentence; in Penn tagset, includes question and exclamation',
                link: ''
            },
            {
                tag: 'Qest',
                name: 'question mark',
                link: ''
            },
            {
                tag: 'Excl',
                name: 'exclamation mark',
                link: ''
            },
            {
                tag: 'Quot',
                name: 'quoation marks (various sorts in various languages)',
                link: ''
            },
            {
                tag: 'Brck',
                name: 'bracket',
                link: ''
            },
            {
                tag: 'Comm',
                name: 'comma',
                link: ''
            },
            {
                tag: 'Colo',
                name: 'colon; in Penn tagset, “:” is in fact tag for generic other punctuation',
                link: ''
            },
            {
                tag: 'Semi',
                name: 'semicolon',
                link: ''
            },
            {
                tag: 'Dash',
                name: 'dash, hyphen',
                link: ''
            },
            {
                tag: 'Symb',
                name: 'symbol',
                link: ''
            }
        ]

    },
    {
        tag: 'Reflex',
        name: 'reflexive',
        link: '',
        values: [
            {
                tag: 'Yes',
                name: 'it is reflexive',
                link: ''
            }
        ]

    },
    {
        tag: 'Style',
        name: 'style or sublanguage to which this word form belongs',
        link: '',
        values: [
            {
                tag: 'Arch',
                name: 'archaic, obsolete',
                link: ''
            },
            {
                tag: 'Rare',
                name: 'rare',
                link: ''
            },
            {
                tag: 'Form',
                name: 'formal, literary',
                link: ''
            },
            {
                tag: 'Poet',
                name: 'poetic',
                link: ''
            },
            {
                tag: 'Norm',
                name: 'normal, neutral',
                link: ''
            },
            {
                tag: 'Coll',
                name: 'colloquial',
                link: ''
            },
            {
                tag: 'Vrnc',
                name: 'vernacular',
                link: ''
            },
            {
                tag: 'Slng',
                name: 'slang',
                link: ''
            },
            {
                tag: 'Expr',
                name: 'expressive, emotional',
                link: ''
            },
            {
                tag: 'Derg',
                name: 'derogative',
                link: ''
            },
            {
                tag: 'Vulg',
                name: 'vulgar',
                link: ''
            }
        ]

    },
    {
        tag: 'Subcat',
        name: 'subcategorization',
        link: '',
        values: [
            {
                tag: 'Intr',
                name: 'intransitive verb',
                link: ''
            },
            {
                tag: 'Tran',
                name: 'transitive verb',
                link: ''
            }
        ]

    },
    {
        tag: 'Tense',
        name: 'tense',
        link: '',
        values: [
            {
                tag: 'Past',
                name: 'past tense / preterite / aorist',
                link: ''
            },
            {
                tag: 'Pres',
                name: 'present tense',
                link: ''
            },
            {
                tag: 'Fut',
                name: 'future tense',
                link: ''
            },
            {
                tag: 'Imp',
                name: 'imperfect',
                link: ''
            },
            {
                tag: 'Pqp',
                name: 'pluperfect',
                link: ''
            }
        ]

    },
    {
        tag: 'Typo',
        name: 'is this a misspelled word?',
        link: '',
        values: [
            {
                tag: 'Yes',
                name: 'it is typo',
                link: ''
            }
        ]

    },
    {
        tag: 'VerbForm',
        name: 'form of verb or deverbative',
        link: '',
        values: [
            {
                tag: 'Fin',
                name: 'finite verb',
                link: ''
            },
            {
                tag: 'Inf',
                name: 'infinitive',
                link: ''
            },
            {
                tag: 'Sup',
                name: 'supine',
                link: ''
            },
            {
                tag: 'Part',
                name: 'participle, verbal adjective',
                link: ''
            },
            {
                tag: 'Conv',
                name: 'converb, transgressive, adverbial participle, verbal adverb',
                link: ''
            },
            {
                tag: 'Gdv',
                name: 'gerundive',
                link: ''
            },
            {
                tag: 'Vnoun',
                name: 'verbal noun, masdar',
                link: ''
            },
            {
                tag: 'Ger',
                name: 'gerund',
                link: ''
            }
        ]

    },
    {
        tag: 'VerbType',
        name: 'verb type',
        link: '',
        values: [
            {
                tag: 'Aux',
                name: 'auxiliary verb',
                link: ''
            },
            {
                tag: 'Cop',
                name: 'copula verb',
                link: ''
            },
            {
                tag: 'Mod',
                name: 'modal verb',
                link: ''
            },
            {
                tag: 'Light',
                name: 'light (support) verb',
                link: ''
            }
        ]

    },
    {
        tag: 'Voice',
        name: 'voice',
        link: '',
        values: [
            {
                tag: 'Act',
                name: 'active voice',
                link: ''
            },
            {
                tag: 'Mid',
                name: 'middle voice',
                link: ''
            },
            {
                tag: 'Pass',
                name: 'passive voice',
                link: ''
            },
            {
                tag: 'Antip',
                name: 'antipassive voice',
                link: ''
            },
            {
                tag: 'Dir',
                name: 'direct voice',
                link: ''
            },
            {
                tag: 'Inv',
                name: 'inverse voice',
                link: ''
            },
            {
                tag: 'Rcp',
                name: 'reciprocal voice',
                link: ''
            },
            {
                tag: 'Cau',
                name: 'causative voice',
                link: ''
            }
        ]

    }
];
