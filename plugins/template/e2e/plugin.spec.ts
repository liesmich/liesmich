/*
 * Package @liesmich/plugin-template
 * Source https://liesmich.github.io/liesmich/
 */

import { createPipeline } from '@liesmich-helpers/test-plugin';
import { expect } from 'chai';
import 'mocha';
import { read } from 'to-vfile';
import { Processor } from 'unified';
import { Parent } from 'unist';
import { VFile } from 'vfile';
import { plugin } from './../src';

// tslint:disable:no-unused-expression
describe('e2e', (): void => {
    let p: Processor;
    beforeEach((): void => {
        p = createPipeline(plugin);
    });
    describe('handle()', (): void => {
        it('should not modify string', async (): Promise<void> => {
            expect((await p.process('test')).toString()).to.equal('test\n');
        });
        it('should inline variable correclty2', async (): Promise<void> => {
            const sourceFile: VFile = await read('./e2e/test4.md');
            const tree: Parent = (await p.run(p.parse(sourceFile), sourceFile)) as Parent;
            expect(tree).to.deep.equal({
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
                        children: [
                            {
                                position: {
                                    end: {
                                        column: 8,
                                        line: 1,
                                        offset: 7,
                                    },
                                    start: {
                                        column: 3,
                                        line: 1,
                                        offset: 2,
                                    },
                                },
                                type: 'text',
                                value: 'title',
                            },
                        ],
                        depth: 1,
                        position: {
                            end: {
                                column: 8,
                                line: 1,
                                offset: 7,
                            },
                            start: {
                                column: 1,
                                line: 1,
                                offset: 0,
                            },
                        },
                        type: 'heading',
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
        it('should inline variable correclty', async (): Promise<void> => {
            expect((await p.process('test {{ lm:template?path=./e2e/test4.md }} but no')).toString()).to.equal(
                'test test# titlebut no but no\n'
            );
        });
    });
});
