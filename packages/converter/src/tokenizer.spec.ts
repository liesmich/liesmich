/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import { fromMarkdown } from 'mdast-util-from-markdown';
import 'mocha';
import { Parent } from 'unist';
import { fromMarkdown as testFromMarkdown } from './from-markdown-extension';
import { liesmichExtension } from './tokenizer';

/**
 * @param tree
 */
function doesContainLiesmich(tree: Parent): boolean {
    if (tree.type === 'liesmich') {
        return true;
    }
    for (const child of tree.children) {
        if (child.type.startsWith('liesmich')) {
            return true;
        }
        if ('children' in child && doesContainLiesmich(child as Parent)) {
            return true;
        }
    }
    return false;
}
// tslint:disable:no-unused-expression
describe('tokenizer.ts', (): void => {
    describe('Tokenizer', (): void => {
        describe('parse without leading or trailing line breaks', (): void => {
            it('should work with consecutive blocks', (): void => {
                const out = fromMarkdown('test {{LM:path?key=none }} \n {{lm:other }} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(out).to.deep.equal({
                    children: [
                        {
                            children: [
                                {
                                    position: {
                                        end: {
                                            column: 6,
                                            line: 1,
                                            offset: 5,
                                        },
                                        start: {
                                            column: 1,
                                            line: 1,
                                            offset: 0,
                                        },
                                    },
                                    type: 'text',
                                    value: 'test ',
                                },
                                {
                                    host: 'path',
                                    position: {
                                        end: {
                                            column: 27,
                                            line: 1,
                                            offset: 26,
                                        },
                                        start: {
                                            column: 6,
                                            line: 1,
                                            offset: 5,
                                        },
                                    },
                                    query: {
                                        key: 'none',
                                    },
                                    scheme: 'LM',
                                    type: 'liesmich',
                                    value: '{{LM:path?key=none }}',
                                },
                                {
                                    position: {
                                        end: {
                                            column: 1,
                                            line: 2,
                                            offset: 28,
                                        },
                                        start: {
                                            column: 28,
                                            line: 1,
                                            offset: 27,
                                        },
                                    },
                                    type: 'text',
                                    value: '\n',
                                },
                                {
                                    host: 'other',
                                    position: {
                                        end: {
                                            column: 15,
                                            line: 2,
                                            offset: 42,
                                        },
                                        start: {
                                            column: 2,
                                            line: 2,
                                            offset: 29,
                                        },
                                    },
                                    scheme: 'lm',
                                    type: 'liesmich',
                                    value: '{{lm:other }}',
                                },
                                {
                                    position: {
                                        end: {
                                            column: 17,
                                            line: 2,
                                            offset: 44,
                                        },
                                        start: {
                                            column: 15,
                                            line: 2,
                                            offset: 42,
                                        },
                                    },
                                    type: 'text',
                                    value: ' a',
                                },
                            ],
                            position: {
                                end: {
                                    column: 17,
                                    line: 2,
                                    offset: 44,
                                },
                                start: {
                                    column: 1,
                                    line: 1,
                                    offset: 0,
                                },
                            },
                            type: 'paragraph',
                        },
                    ],
                    position: {
                        end: {
                            column: 17,
                            line: 2,
                            offset: 44,
                        },
                        start: {
                            column: 1,
                            line: 1,
                            offset: 0,
                        },
                    },
                    type: 'root',
                });
            });
            it('should work with consecutive blocks with double new line between', (): void => {
                const out = fromMarkdown('test {{LM:path?key=none }}\n\n{{lm:other }} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(out).to.deep.equal({
                    children: [
                        {
                            children: [
                                {
                                    position: {
                                        end: {
                                            column: 6,
                                            line: 1,
                                            offset: 5,
                                        },
                                        start: {
                                            column: 1,
                                            line: 1,
                                            offset: 0,
                                        },
                                    },
                                    type: 'text',
                                    value: 'test ',
                                },
                                {
                                    host: 'path',
                                    position: {
                                        end: {
                                            column: 27,
                                            line: 1,
                                            offset: 26,
                                        },
                                        start: {
                                            column: 6,
                                            line: 1,
                                            offset: 5,
                                        },
                                    },
                                    query: {
                                        key: 'none',
                                    },
                                    scheme: 'LM',
                                    type: 'liesmich',
                                    value: '{{LM:path?key=none }}',
                                },
                            ],
                            position: {
                                end: {
                                    column: 27,
                                    line: 1,
                                    offset: 26,
                                },
                                start: {
                                    column: 1,
                                    line: 1,
                                    offset: 0,
                                },
                            },
                            type: 'paragraph',
                        },
                        {
                            children: [
                                {
                                    host: 'other',
                                    position: {
                                        end: {
                                            column: 14,
                                            line: 3,
                                            offset: 41,
                                        },
                                        start: {
                                            column: 1,
                                            line: 3,
                                            offset: 28,
                                        },
                                    },
                                    scheme: 'lm',
                                    type: 'liesmich',
                                    value: '{{lm:other }}',
                                },
                                {
                                    position: {
                                        end: {
                                            column: 16,
                                            line: 3,
                                            offset: 43,
                                        },
                                        start: {
                                            column: 14,
                                            line: 3,
                                            offset: 41,
                                        },
                                    },
                                    type: 'text',
                                    value: ' a',
                                },
                            ],
                            position: {
                                end: {
                                    column: 16,
                                    line: 3,
                                    offset: 43,
                                },
                                start: {
                                    column: 1,
                                    line: 3,
                                    offset: 28,
                                },
                            },
                            type: 'paragraph',
                        },
                    ],
                    position: {
                        end: {
                            column: 16,
                            line: 3,
                            offset: 43,
                        },
                        start: {
                            column: 1,
                            line: 1,
                            offset: 0,
                        },
                    },
                    type: 'root',
                });
            });
            it('should work as standalone block', (): void => {
                const out = fromMarkdown('test {{LM:path?key=none }}\n\n{{lm:other }}\n\na', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(out).to.deep.equal({
                    children: [
                        {
                            children: [
                                {
                                    position: {
                                        end: {
                                            column: 6,
                                            line: 1,
                                            offset: 5,
                                        },
                                        start: {
                                            column: 1,
                                            line: 1,
                                            offset: 0,
                                        },
                                    },
                                    type: 'text',
                                    value: 'test ',
                                },
                                {
                                    host: 'path',
                                    position: {
                                        end: {
                                            column: 27,
                                            line: 1,
                                            offset: 26,
                                        },
                                        start: {
                                            column: 6,
                                            line: 1,
                                            offset: 5,
                                        },
                                    },
                                    query: {
                                        key: 'none',
                                    },
                                    scheme: 'LM',
                                    type: 'liesmich',
                                    value: '{{LM:path?key=none }}',
                                },
                            ],
                            position: {
                                end: {
                                    column: 27,
                                    line: 1,
                                    offset: 26,
                                },
                                start: {
                                    column: 1,
                                    line: 1,
                                    offset: 0,
                                },
                            },
                            type: 'paragraph',
                        },
                        {
                            host: 'other',
                            position: {
                                end: {
                                    column: 14,
                                    line: 3,
                                    offset: 41,
                                },
                                start: {
                                    column: 1,
                                    line: 3,
                                    offset: 28,
                                },
                            },
                            scheme: 'lm',
                            type: 'liesmich',
                            value: '{{lm:other }}',
                        },
                        {
                            children: [
                                {
                                    position: {
                                        end: {
                                            column: 2,
                                            line: 5,
                                            offset: 44,
                                        },
                                        start: {
                                            column: 1,
                                            line: 5,
                                            offset: 43,
                                        },
                                    },
                                    type: 'text',
                                    value: 'a',
                                },
                            ],
                            position: {
                                end: {
                                    column: 2,
                                    line: 5,
                                    offset: 44,
                                },
                                start: {
                                    column: 1,
                                    line: 5,
                                    offset: 43,
                                },
                            },
                            type: 'paragraph',
                        },
                    ],
                    position: {
                        end: {
                            column: 2,
                            line: 5,
                            offset: 44,
                        },
                        start: {
                            column: 1,
                            line: 1,
                            offset: 0,
                        },
                    },
                    type: 'root',
                });
            });
            it('should work with inline blocks', (): void => {
                const out = fromMarkdown('test {{LM:path?key=none }} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(out).to.deep.equal({
                    children: [
                        {
                            children: [
                                {
                                    position: {
                                        end: {
                                            column: 6,
                                            line: 1,
                                            offset: 5,
                                        },
                                        start: {
                                            column: 1,
                                            line: 1,
                                            offset: 0,
                                        },
                                    },
                                    type: 'text',
                                    value: 'test ',
                                },
                                {
                                    host: 'path',
                                    position: {
                                        end: {
                                            column: 27,
                                            line: 1,
                                            offset: 26,
                                        },
                                        start: {
                                            column: 6,
                                            line: 1,
                                            offset: 5,
                                        },
                                    },
                                    query: {
                                        key: 'none',
                                    },
                                    scheme: 'LM',
                                    type: 'liesmich',
                                    value: '{{LM:path?key=none }}',
                                },
                                {
                                    position: {
                                        end: {
                                            column: 29,
                                            line: 1,
                                            offset: 28,
                                        },
                                        start: {
                                            column: 27,
                                            line: 1,
                                            offset: 26,
                                        },
                                    },
                                    type: 'text',
                                    value: ' a',
                                },
                            ],
                            position: {
                                end: {
                                    column: 29,
                                    line: 1,
                                    offset: 28,
                                },
                                start: {
                                    column: 1,
                                    line: 1,
                                    offset: 0,
                                },
                            },
                            type: 'paragraph',
                        },
                    ],
                    position: {
                        end: {
                            column: 29,
                            line: 1,
                            offset: 28,
                        },
                        start: {
                            column: 1,
                            line: 1,
                            offset: 0,
                        },
                    },
                    type: 'root',
                });
            });
            it('should work with inline blocks', (): void => {
                const out = fromMarkdown('test\n{{ lm:template?path=./test2.md }}\nbut no\n', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(out).to.deep.equal({
                    children: [
                        {
                            children: [
                                {
                                    position: {
                                        end: {
                                            column: 5,
                                            line: 1,
                                            offset: 4,
                                        },
                                        start: {
                                            column: 1,
                                            line: 1,
                                            offset: 0,
                                        },
                                    },
                                    type: 'text',
                                    value: 'test',
                                },
                            ],
                            position: {
                                end: {
                                    column: 5,
                                    line: 1,
                                    offset: 4,
                                },
                                start: {
                                    column: 1,
                                    line: 1,
                                    offset: 0,
                                },
                            },
                            type: 'paragraph',
                        },

                        {
                            host: 'template',
                            position: {
                                end: {
                                    column: 34,
                                    line: 2,
                                    offset: 38,
                                },
                                start: {
                                    column: 1,
                                    line: 2,
                                    offset: 5,
                                },
                            },
                            query: {
                                path: './test2.md',
                            },
                            scheme: 'lm',
                            type: 'liesmich',
                            value: '{{ lm:template?path=./test2.md }}',
                        },
                        {
                            children: [
                                {
                                    position: {
                                        end: {
                                            column: 7,
                                            line: 3,
                                            offset: 45,
                                        },
                                        start: {
                                            column: 1,
                                            line: 3,
                                            offset: 39,
                                        },
                                    },
                                    type: 'text',
                                    value: 'but no',
                                },
                            ],
                            position: {
                                end: {
                                    column: 7,
                                    line: 3,
                                    offset: 45,
                                },
                                start: {
                                    column: 1,
                                    line: 3,
                                    offset: 39,
                                },
                            },
                            type: 'paragraph',
                        },
                    ],
                    position: {
                        end: {
                            column: 1,
                            line: 4,
                            offset: 46,
                        },
                        start: {
                            column: 1,
                            line: 1,
                            offset: 0,
                        },
                    },
                    type: 'root',
                });
            });

            it('should not parse with line break', (): void => {
                const out = fromMarkdown('test {{ \nLM:path?key=none }}} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(doesContainLiesmich(out)).to.equal(false);
            });
            it('should not parse with line break', (): void => {
                const out = fromMarkdown('test {{ LM:pa\nth?key=none }}} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(doesContainLiesmich(out)).to.equal(false);
            });
            it('should not parse with with spaced leading brackets', (): void => {
                const out = fromMarkdown('test { { LM:pa\nth?key=none }}} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(doesContainLiesmich(out)).to.equal(false);
            });
        });
    });
});
