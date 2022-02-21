/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import { Node } from 'mdast-util-from-markdown/lib';
import { toMarkdown } from 'mdast-util-to-markdown';
import 'mocha';
import { toMarkdown as testToMarkdown } from './to-markdown-extension';

/**
 * @param inp
 */
function testConvert(inp: Node): string {
    return toMarkdown(inp, {
        extensions: [testToMarkdown],
    });
}

// tslint:disable:no-unused-expression
describe('from-markdown-extension.ts', (): void => {
    describe('from-markdown-extension', (): void => {
        describe('parse without leading or trailing line breaks', (): void => {
            it('should work with consecutive blocks and preserve whitespace prefix', (): void => {
                const testTree: any = {
                    children: [
                        {
                            children: [
                                {
                                    type: 'text',
                                    value: 'test',
                                },
                            ],
                            type: 'paragraph',
                        },
                        {
                            host: 'path',
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
                                    type: 'text',
                                    value: 'a',
                                },
                            ],
                            type: 'paragraph',
                        },
                    ],
                    type: 'root',
                };
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                expect(testConvert(testTree)).to.equal('test\n\n{{lm:path?key=none}}\n\na\n');
            });
            it('should work with consecutive blocks and preserve whitespace prefix', (): void => {
                const testTree: any = {
                    children: [
                        {
                            children: [
                                {
                                    type: 'text',
                                    value: 'test ',
                                },
                                {
                                    host: 'path',
                                    query: {
                                        key: 'none',
                                    },
                                    scheme: 'lm',
                                    type: 'liesmich',
                                    value: '{{lm:path?key=none}}',
                                },
                                {
                                    type: 'text',
                                    value: '\n',
                                },
                                {
                                    host: 'path',
                                    query: {
                                        key: 'none',
                                    },
                                    scheme: 'lm',
                                    type: 'liesmich',
                                    value: '{{lm:c?key=2}}',
                                },
                            ],
                            type: 'paragraph',
                        },
                    ],
                    type: 'root',
                };
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                expect(testConvert(testTree)).to.equal('test {{lm:path?key=none}}\n{{lm:c?key=2}}\n');
            });
            it('should work with inline text', (): void => {
                const testTree: any = {
                    children: [
                        {
                            children: [
                                {
                                    type: 'text',
                                    value: 'test',
                                },
                                {
                                    host: 'path',
                                    query: {
                                        key: 'none',
                                    },
                                    scheme: 'lm',
                                    type: 'liesmich',
                                    value: '{{lm:path?key=none}}',
                                },
                                {
                                    type: 'text',
                                    value: 'a',
                                },
                            ],
                            type: 'paragraph',
                        },
                    ],
                    type: 'root',
                };
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                expect(testConvert(testTree)).to.equal('test{{lm:path?key=none}}a\n');
            });
        });
    });
});
