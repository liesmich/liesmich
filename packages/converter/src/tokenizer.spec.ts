/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { LiesmichLiteral } from '@liesmich/core';
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
function simpleComparison(tree: Parent, child: Node | Literal | LiesmichLiteral): void {
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
const escapeLineBreaks = (line: string): string => {
    return line.replace(/[\r\n]/g, (a, b, c, d) => { return a === '\r' ? '\\r' : '\\n' })
}
const testCases: string[] = ['\r', '\n', '\r\n'];
// tslint:disable:no-unused-expression
describe('tokenizer.ts', (): void => {
    describe('Tokenizer', (): void => {
        describe('test with leading or trailing line breaks', (): void => {
            describe('leading and trailing line breaks', (): void => {
                testCases.forEach((leading: string): void => {
                    testCases.forEach((trailing: string): void => {
                        const testCase: string = `test${leading}{{lm:path?key=none}}${trailing}a`;
                        const endOffset: number = leading.length + trailing.length;
                        it(`should pass for '${escapeLineBreaks(testCase)}'`, (): void => {
                            const out = fromMarkdown(testCase, {
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
                                        host: 'path',
                                        position: {
                                            end: {
                                                column: 21,
                                                line: 2,
                                                offset: 24 + leading.length,
                                            },
                                            start: {
                                                column: 1,
                                                line: 2,
                                                offset: 4 + leading.length,
                                            },
                                        },
                                        query: {
                                            key: 'none',
                                        },
                                        scheme: 'lm',
                                        type: 'liesmich',
                                        value: '{{lm:path?key=none}}',
                                    },
                                    {
                                        children: [
                                            {
                                                position: {
                                                    end: {
                                                        column: 2,
                                                        line: 3,
                                                        offset: 25 + endOffset,
                                                    },
                                                    start: {
                                                        column: 1,
                                                        line: 3,
                                                        offset: 24 + endOffset,
                                                    },
                                                },
                                                type: 'text',
                                                value: 'a',
                                            },
                                        ],
                                        position: {
                                            end: {
                                                column: 2,
                                                line: 3,
                                                offset: 25 + endOffset,
                                            },
                                            start: {
                                                column: 1,
                                                line: 3,
                                                offset: 24 + endOffset,
                                            },
                                        },
                                        type: 'paragraph',
                                    },
                                ],
                                position: {
                                    end: {
                                        column: 2,
                                        line: 3,
                                        offset: 25 + endOffset,
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
                    });
                });
            });
            describe('leading line breaks', (): void => {

                testCases.forEach((leading: string): void => {
                    it(`should pass for 'test${escapeLineBreaks(leading)}{{lm:path?key=none}} a'`, (): void => {
                        const out = fromMarkdown(`test${leading}{{lm:path?key=none}} a`, {
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
                                    host: 'path',
                                    position: {
                                        end: {
                                            column: 21,
                                            line: 2,
                                            offset: 24 + leading.length,
                                        },
                                        start: {
                                            column: 1,
                                            line: 2,
                                            offset: 4 + leading.length,
                                        },
                                    },
                                    query: {
                                        key: 'none',
                                    },
                                    scheme: 'lm',
                                    type: 'liesmich',
                                    value: '{{lm:path?key=none}}',
                                },
                                {
                                    children: [
                                        {
                                            position: {
                                                end: {
                                                    column: 23,
                                                    line: 2,
                                                    offset: 26 + leading.length,
                                                },
                                                start: {
                                                    column: 22,
                                                    line: 2,
                                                    offset: 25 + leading.length,
                                                },
                                            },
                                            type: 'text',
                                            value: 'a',
                                        },
                                    ],
                                    position: {
                                        end: {
                                            column: 23,
                                            line: 2,
                                            offset: 26 + leading.length,
                                        },
                                        start: {
                                            column: 22,
                                            line: 2,
                                            offset: 25 + leading.length,
                                        },
                                    },
                                    type: 'paragraph',
                                },
                            ],
                            position: {
                                end: {
                                    column: 23,
                                    line: 2,
                                    offset: 26 + leading.length,
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
                    it(`should pass for 'test${escapeLineBreaks(leading)}{{lm:path?key=none}}'`, (): void => {
                        const out = fromMarkdown(`test${leading}{{lm:path?key=none}}`, {
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
                                    host: 'path',
                                    position: {
                                        end: {
                                            column: 21,
                                            line: 2,
                                            offset: 24 + leading.length,
                                        },
                                        start: {
                                            column: 1,
                                            line: 2,
                                            offset: 4 + leading.length,
                                        },
                                    },
                                    query: {
                                        key: 'none',
                                    },
                                    scheme: 'lm',
                                    type: 'liesmich',
                                    value: '{{lm:path?key=none}}',
                                },
                            ],
                            position: {
                                end: {
                                    column: 21,
                                    line: 2,
                                    offset: 24 + leading.length,
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
                });
            });
        });
        describe('parse without leading or trailing line breaks', (): void => {
            it('should inline correctly between two', (): void => {
                const out = fromMarkdown('test {{lm:path?key=none}} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                simpleComparison(out, {
                    host: 'path',
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
                    query: {
                        key: 'none',
                    },
                    scheme: 'lm',
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
                    host: 'path',
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
                    query: {
                        key: 'none',
                    },
                    scheme: 'LM',
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
                                    host: 'variable',
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
                                    query: {
                                        key: 'test',
                                    },
                                    scheme: 'lm',
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
            it('should work with consecutive blocks', (): void => {
                const out = fromMarkdown('test {{LM:path?key=none }}\n{{lm:path?key=none }} a', {
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
                                }
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
                                    host: 'path',
                                    position: {
                                        end: {
                                            column: 22,
                                            line: 2,
                                            offset: 48,
                                        },
                                        start: {
                                            column: 1,
                                            line: 2,
                                            offset: 27,
                                        },
                                    },
                                    query: {
                                        key: 'none',
                                    },
                                    scheme: 'lm',
                                    type: 'liesmich',
                                    value: '{{lm:path?key=none }}',
                                },
                                {
                                    position: {
                                        end: {
                                            column: 24,
                                            line: 2,
                                            offset: 50,
                                        },
                                        start: {
                                            column: 23,
                                            line: 2,
                                            offset: 49,
                                        },
                                    },
                                    type: 'text',
                                    value: 'a',
                                },
                            ],
                            position: {
                                end: {
                                    column: 24,
                                    line: 2,
                                    offset: 50,
                                },
                                start: {
                                    column: 23,
                                    line: 2,
                                    offset: 49,
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
