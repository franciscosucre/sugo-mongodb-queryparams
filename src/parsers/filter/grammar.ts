// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any {
  return d[0];
}

export interface Token {
  value: any;
  [key: string]: any;
}

export interface Lexer {
  reset: (chunk: string, info: any) => void;
  next: () => Token | undefined;
  save: () => any;
  formatError: (token: Token) => string;
  has: (tokenType: string) => boolean;
}

export interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
}

export type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

export let Lexer: Lexer | undefined;

export let ParserRules: NearleyRule[] = [
  {
    name: 'EXPRESSION',
    symbols: ['EXPRESSION', '_', 'CONNECTOR', '_', 'EXPRESSION'],
    postprocess(d) {
      return { [d[2]]: [d[0], d[4]] };
    },
  },
  { name: 'EXPRESSION$ebnf$1', symbols: ['_'], postprocess: id },
  { name: 'EXPRESSION$ebnf$1', symbols: [], postprocess: () => null },
  { name: 'EXPRESSION$ebnf$2', symbols: ['_'], postprocess: id },
  { name: 'EXPRESSION$ebnf$2', symbols: [], postprocess: () => null },
  {
    name: 'EXPRESSION',
    symbols: [{ literal: '(' }, 'EXPRESSION$ebnf$1', 'EXPRESSION', 'EXPRESSION$ebnf$2', { literal: ')' }],
    postprocess(d) {
      return d[2];
    },
  },
  {
    name: 'EXPRESSION',
    symbols: ['KEY', 'SEPARATOR', 'OPERATOR', 'SEPARATOR', 'VALUE'],
    postprocess(d) {
      const [key, separator1, operator, separator2, value] = d;
      return { [key]: { [operator]: value } };
    },
  },
  {
    name: 'EXPRESSION',
    symbols: ['KEY'],
    postprocess(d) {
      return { $text: { $search: d[0] } };
    },
  },
  { name: 'CONNECTOR$string$1', symbols: [{ literal: 'O' }, { literal: 'R' }], postprocess: d => d.join('') },
  {
    name: 'CONNECTOR',
    symbols: ['CONNECTOR$string$1'],
    postprocess() {
      return '$or';
    },
  },
  {
    name: 'CONNECTOR$string$2',
    symbols: [{ literal: 'A' }, { literal: 'N' }, { literal: 'D' }],
    postprocess: d => d.join(''),
  },
  {
    name: 'CONNECTOR',
    symbols: ['CONNECTOR$string$2'],
    postprocess() {
      return '$and';
    },
  },
  { name: 'OPERATOR$string$1', symbols: [{ literal: 'e' }, { literal: 'q' }], postprocess: d => d.join('') },
  {
    name: 'OPERATOR',
    symbols: ['OPERATOR$string$1'],
    postprocess() {
      return '$eq';
    },
  },
  {
    name: 'OPERATOR$string$2',
    symbols: [{ literal: 'n' }, { literal: 'e' }, { literal: 'q' }],
    postprocess: d => d.join(''),
  },
  {
    name: 'OPERATOR',
    symbols: ['OPERATOR$string$2'],
    postprocess() {
      return '$ne';
    },
  },
  {
    name: 'OPERATOR$string$3',
    symbols: [{ literal: 'g' }, { literal: 't' }, { literal: 'e' }],
    postprocess: d => d.join(''),
  },
  {
    name: 'OPERATOR',
    symbols: ['OPERATOR$string$3'],
    postprocess() {
      return '$gte';
    },
  },
  {
    name: 'OPERATOR$string$4',
    symbols: [{ literal: 'l' }, { literal: 't' }, { literal: 'e' }],
    postprocess: d => d.join(''),
  },
  {
    name: 'OPERATOR',
    symbols: ['OPERATOR$string$4'],
    postprocess() {
      return '$lte';
    },
  },
  { name: 'OPERATOR$string$5', symbols: [{ literal: 'g' }, { literal: 't' }], postprocess: d => d.join('') },
  {
    name: 'OPERATOR',
    symbols: ['OPERATOR$string$5'],
    postprocess() {
      return '$gt';
    },
  },
  { name: 'OPERATOR$string$6', symbols: [{ literal: 'l' }, { literal: 't' }], postprocess: d => d.join('') },
  {
    name: 'OPERATOR',
    symbols: ['OPERATOR$string$6'],
    postprocess() {
      return '$lt';
    },
  },
  { name: 'KEY$ebnf$1', symbols: [/[0-9a-zA-Z_$.]/] },
  { name: 'KEY$ebnf$1', symbols: ['KEY$ebnf$1', /[0-9a-zA-Z_$.]/], postprocess: d => d[0].concat([d[1]]) },
  {
    name: 'KEY',
    symbols: ['KEY$ebnf$1'],
    postprocess(d) {
      return d[0].join('');
    },
  },
  {
    name: 'VALUE',
    symbols: ['DATETIME'],
    postprocess(d) {
      return d[0];
    },
  },
  {
    name: 'VALUE',
    symbols: ['NUMERIC'],
    postprocess(d) {
      return d[0];
    },
  },
  {
    name: 'VALUE',
    symbols: ['BOOLEAN'],
    postprocess(d) {
      return d[0];
    },
  },
  { name: 'VALUE$ebnf$1', symbols: [/./] },
  { name: 'VALUE$ebnf$1', symbols: ['VALUE$ebnf$1', /./], postprocess: d => d[0].concat([d[1]]) },
  {
    name: 'VALUE',
    symbols: ['QUOTE', 'VALUE$ebnf$1', 'QUOTE'],
    postprocess(d) {
      return d[1].join('');
    },
  },
  {
    name: 'VALUE',
    symbols: ['STRING'],
    postprocess(d, p, reject) {
      const value = d[0];
      if (value === 'true') {
        return reject;
      }
      if (value === 'false') {
        return reject;
      }
      if (!isNaN(value)) {
        return reject;
      }
      if (!isNaN(new Date(value).getTime())) {
        return reject;
      }
      return value;
    },
  },
  {
    name: 'DATETIME',
    symbols: ['DATE', { literal: 'T' }, 'TIME', { literal: 'Z' }],
    postprocess(d) {
      return new Date(d.join(''));
    },
  },
  {
    name: 'DATETIME',
    symbols: ['DATE', { literal: 'T' }, 'TIME'],
    postprocess(d) {
      return new Date(d.join(''));
    },
  },
  {
    name: 'DATETIME',
    symbols: ['DATE'],
    postprocess(d) {
      return new Date(d.join(''));
    },
  },
  {
    name: 'TIME',
    symbols: ['HOURS', { literal: ':' }, 'MINUTES', { literal: ':' }, 'SECONDS'],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'DATE',
    symbols: ['YEAR', { literal: '-' }, 'MONTH', { literal: '-' }, 'DAY'],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'YEAR',
    symbols: [/[1-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'MONTH',
    symbols: [{ literal: '1' }, /[0-2]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'MONTH',
    symbols: [{ literal: '0' }, /[1-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'MONTH',
    symbols: [/[1-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'DAY',
    symbols: [{ literal: '3' }, /[0-1]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'DAY',
    symbols: [{ literal: '0' }, /[1-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'DAY',
    symbols: [/[1-2]/, /[0-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'DAY',
    symbols: [/[1-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'HOURS',
    symbols: [{ literal: '2' }, /[0-3]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'HOURS',
    symbols: [/[0-1]/, /[0-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'HOURS',
    symbols: [/[0-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'MINUTES',
    symbols: [/[0-5]/, /[0-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'MINUTES',
    symbols: [/[0-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'SECONDS',
    symbols: [/[0-5]/, /[0-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'SECONDS',
    symbols: [/[0-5]/, /[0-9]/, { literal: '.' }, 'MILLISECONDS'],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'SECONDS',
    symbols: [/[0-9]/, { literal: '.' }, 'MILLISECONDS'],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'SECONDS',
    symbols: [/[0-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'MILLISECONDS',
    symbols: [/[0-9]/, /[0-9]/, /[0-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'MILLISECONDS',
    symbols: [/[0-9]/, /[0-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'MILLISECONDS',
    symbols: [/[0-9]/],
    postprocess(d) {
      return d.join('');
    },
  },
  {
    name: 'NUMERIC',
    symbols: ['NUMBER', 'DECIMAL_SEPARATOR', 'NUMBER'],
    postprocess(d) {
      return parseFloat(d.join('').replace(/,/g, '.'));
    },
  },
  {
    name: 'NUMERIC',
    symbols: ['NUMBER'],
    postprocess(d) {
      return parseInt(d as any, 10);
    },
  },
  { name: 'NUMBER$ebnf$1', symbols: [/[0-9]/] },
  { name: 'NUMBER$ebnf$1', symbols: ['NUMBER$ebnf$1', /[0-9]/], postprocess: d => d[0].concat([d[1]]) },
  {
    name: 'NUMBER',
    symbols: ['NUMBER$ebnf$1'],
    postprocess(d) {
      return d.join('').replace(/,/g, '');
    },
  },
  { name: 'DECIMAL_SEPARATOR', symbols: [{ literal: '.' }] },
  { name: 'DECIMAL_SEPARATOR', symbols: [{ literal: ',' }] },
  { name: 'STRING$ebnf$1', symbols: [/[a-zA-Z@.\-:_0-9]/] },
  { name: 'STRING$ebnf$1', symbols: ['STRING$ebnf$1', /[a-zA-Z@.\-:_0-9]/], postprocess: d => d[0].concat([d[1]]) },
  {
    name: 'STRING',
    symbols: ['STRING$ebnf$1'],
    postprocess(d) {
      return d[0].join('');
    },
  },
  {
    name: 'BOOLEAN',
    symbols: ['TRUE'],
    postprocess(d) {
      return true;
    },
  },
  {
    name: 'BOOLEAN',
    symbols: ['FALSE'],
    postprocess(d) {
      return false;
    },
  },
  {
    name: 'TRUE$string$1',
    symbols: [{ literal: 't' }, { literal: 'r' }, { literal: 'u' }, { literal: 'e' }],
    postprocess: d => d.join(''),
  },
  { name: 'TRUE', symbols: ['TRUE$string$1'] },
  {
    name: 'FALSE$string$1',
    symbols: [{ literal: 'f' }, { literal: 'a' }, { literal: 'l' }, { literal: 's' }, { literal: 'e' }],
    postprocess: d => d.join(''),
  },
  { name: 'FALSE', symbols: ['FALSE$string$1'] },
  { name: 'QUOTE', symbols: [{ literal: "'" }] },
  { name: 'QUOTE', symbols: [{ literal: '"' }] },
  { name: '_$ebnf$1', symbols: [{ literal: ' ' }] },
  { name: '_$ebnf$1', symbols: ['_$ebnf$1', { literal: ' ' }], postprocess: d => d[0].concat([d[1]]) },
  { name: '_', symbols: ['_$ebnf$1'] },
  { name: 'SEPARATOR', symbols: [{ literal: ':' }] },
];

export let ParserStart: string = 'EXPRESSION';
