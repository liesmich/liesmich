/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import { fromMarkdown } from 'mdast-util-from-markdown';
import 'mocha';
import { Literal, Node, Parent } from 'unist';
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
/**
 * @param tree
 * @param child
 */
function simpleComparison(tree: Parent, child: Node | Literal): void {
    expect(tree).to.deep.equal({
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
                    child,
                    {
                        position: {
                            end: {
                                column: 28,
                                line: 1,
                                offset: 27,
                            },
                            start: {
                                column: 26,
                                line: 1,
                                offset: 25,
                            },
                        },
                        type: 'text',
                        value: ' a',
                    },
                ],
                position: {
                    end: {
                        column: 28,
                        line: 1,
                        offset: 27,
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
                column: 28,
                line: 1,
                offset: 27,
            },
            start: {
                column: 1,
                line: 1,
                offset: 0,
            },
        },
        type: 'root',
    });
}

// tslint:disable:no-unused-expression
describe('tokenizer.ts', (): void => {
    describe('Tokenizer', (): void => {
        describe('walker', (): void => {
            it('should inline correctly between two', (): void => {
                const out = fromMarkdown('test {{lm:path?key=none}} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                simpleComparison(out, {
                    data: {
                        host: 'path',
                        query: {
                            key: 'none',
                        },
                        scheme: 'lm',
                    },
                    position: {
                        end: {
                            column: 26,
                            line: 1,
                            offset: 25,
                        },
                        start: {
                            column: 6,
                            line: 1,
                            offset: 5,
                        },
                    },
                    type: 'liesmich',
                    value: '{{lm:path?key=none}}',
                });
            });
            it('should inline correctly between two', (): void => {
                const out = fromMarkdown('test {{LM:path?key=none}} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                simpleComparison(out, {
                    data: {
                        host: 'path',
                        query: {
                            key: 'none',
                        },
                        scheme: 'LM',
                    },
                    position: {
                        end: {
                            column: 26,
                            line: 1,
                            offset: 25,
                        },
                        start: {
                            column: 6,
                            line: 1,
                            offset: 5,
                        },
                    },
                    type: 'liesmich',
                    value: '{{LM:path?key=none}}',
                });
            });
            it('should pass with leading and trailing inner spaces', (): void => {
                const out = fromMarkdown('test {{ lm:variable?key=test }} but no', {
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
                                    data: {
                                        host: 'variable',
                                        query: {
                                            key: 'test',
                                        },
                                        scheme: 'lm',
                                    },
                                    position: {
                                        end: {
                                            column: 32,
                                            line: 1,
                                            offset: 31,
                                        },
                                        start: {
                                            column: 6,
                                            line: 1,
                                            offset: 5,
                                        },
                                    },
                                    type: 'liesmich',
                                    value: '{{ lm:variable?key=test }}',
                                },
                                {
                                    position: {
                                        end: {
                                            column: 39,
                                            line: 1,
                                            offset: 38,
                                        },
                                        start: {
                                            column: 32,
                                            line: 1,
                                            offset: 31,
                                        },
                                    },
                                    type: 'text',
                                    value: ' but no',
                                },
                            ],
                            position: {
                                end: {
                                    column: 39,
                                    line: 1,
                                    offset: 38,
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
                            column: 39,
                            line: 1,
                            offset: 38,
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
            it('should ignore with leading triple braces', (): void => {
                const out = fromMarkdown('test {{{ LM:path?key=none}} a', {
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
                                            column: 30,
                                            line: 1,
                                            offset: 29,
                                        },
                                        start: {
                                            column: 1,
                                            line: 1,
                                            offset: 0,
                                        },
                                    },
                                    type: 'text',
                                    value: 'test {{{ LM:path?key=none}} a',
                                },
                            ],
                            position: {
                                end: {
                                    column: 30,
                                    line: 1,
                                    offset: 29,
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
                            column: 30,
                            line: 1,
                            offset: 29,
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
            it('should ignore with trailing triple braces', (): void => {
                const out = fromMarkdown('test {{LM:path?key=none }}} a', {
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
                                            column: 30,
                                            line: 1,
                                            offset: 29,
                                        },
                                        start: {
                                            column: 1,
                                            line: 1,
                                            offset: 0,
                                        },
                                    },
                                    type: 'text',
                                    value: 'test {{LM:path?key=none }}} a',
                                },
                            ],
                            position: {
                                end: {
                                    column: 30,
                                    line: 1,
                                    offset: 29,
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
                            column: 30,
                            line: 1,
                            offset: 29,
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
