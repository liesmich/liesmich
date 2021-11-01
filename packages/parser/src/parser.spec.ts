/*
 * Package @liesmich/parser
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { parse } from './parser';

// tslint:disable:no-unused-expression
describe('template-converter/index', (): void => {
    let sandbox: Sinon.SinonSandbox;
    before((): void => {
        sandbox = Sinon.createSandbox();
    });
    afterEach((): void => {
        sandbox.reset();
    });
    after((): void => {
        sandbox.restore();
    });
    describe('Converter', (): void => {
        describe('parse()', (): void => {
            it('should parse simple file', (): void => {
                const srcData: any = parse('# yolo');
                expect(srcData).to.deep.equal({
                    article: {
                        children: [
                            {
                                children: [
                                    {
                                        position: {
                                            end: {
                                                column: 7,
                                                line: 1,
                                                offset: 6,
                                            },
                                            start: {
                                                column: 3,
                                                line: 1,
                                                offset: 2,
                                            },
                                        },
                                        type: 'text',
                                        value: 'yolo',
                                    },
                                ],
                                depth: 1,
                                position: {
                                    end: {
                                        column: 7,
                                        line: 1,
                                        offset: 6,
                                    },
                                    start: {
                                        column: 1,
                                        line: 1,
                                        offset: 0,
                                    },
                                },
                                type: 'heading',
                            },
                        ],
                        position: {
                            end: {
                                column: 7,
                                line: 1,
                                offset: 6,
                            },
                            start: {
                                column: 1,
                                line: 1,
                                offset: 0,
                            },
                        },
                        type: 'root',
                    },
                    data: {},
                    hash: 'c0cdb11325d7344604bf6ae2a483238f',
                    language: 'yaml',
                });
            });
            it('should parse front matter', (): void => {
                const srcData: any = parse('---\ntitle: test\n---\n# yolo');
                expect(srcData).to.deep.equal({
                    article: {
                        children: [
                            {
                                children: [
                                    {
                                        position: {
                                            end: {
                                                column: 7,
                                                line: 1,
                                                offset: 6,
                                            },
                                            start: {
                                                column: 3,
                                                line: 1,
                                                offset: 2,
                                            },
                                        },
                                        type: 'text',
                                        value: 'yolo',
                                    },
                                ],
                                depth: 1,
                                position: {
                                    end: {
                                        column: 7,
                                        line: 1,
                                        offset: 6,
                                    },
                                    start: {
                                        column: 1,
                                        line: 1,
                                        offset: 0,
                                    },
                                },
                                type: 'heading',
                            },
                        ],
                        position: {
                            end: {
                                column: 7,
                                line: 1,
                                offset: 6,
                            },
                            start: {
                                column: 1,
                                line: 1,
                                offset: 0,
                            },
                        },
                        type: 'root',
                    },
                    data: { title: 'test' },
                    hash: 'd7554deb16a8980451285e3a51e87def',
                    language: 'yaml',
                });
            });
            it('should parse front matter and excerpt', (): void => {
                const srcData: any = parse('---\ntitle: test\n---\n# yolo\n---\n## subtitle');
                expect(srcData).to.deep.equal({
                    article: {
                        children: [
                            {
                                children: [
                                    {
                                        position: {
                                            end: {
                                                column: 7,
                                                line: 1,
                                                offset: 6,
                                            },
                                            start: {
                                                column: 3,
                                                line: 1,
                                                offset: 2,
                                            },
                                        },
                                        type: 'text',
                                        value: 'yolo',
                                    },
                                ],
                                depth: 1,
                                position: {
                                    end: {
                                        column: 7,
                                        line: 1,
                                        offset: 6,
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
                                position: {
                                    end: {
                                        column: 4,
                                        line: 2,
                                        offset: 10,
                                    },
                                    start: {
                                        column: 1,
                                        line: 2,
                                        offset: 7,
                                    },
                                },
                                type: 'thematicBreak',
                            },
                            {
                                children: [
                                    {
                                        position: {
                                            end: {
                                                column: 12,
                                                line: 3,
                                                offset: 22,
                                            },
                                            start: {
                                                column: 4,
                                                line: 3,
                                                offset: 14,
                                            },
                                        },
                                        type: 'text',
                                        value: 'subtitle',
                                    },
                                ],
                                depth: 2,
                                position: {
                                    end: {
                                        column: 12,
                                        line: 3,
                                        offset: 22,
                                    },
                                    start: {
                                        column: 1,
                                        line: 3,
                                        offset: 11,
                                    },
                                },
                                type: 'heading',
                            },
                        ],
                        position: {
                            end: {
                                column: 12,
                                line: 3,
                                offset: 22,
                            },
                            start: {
                                column: 1,
                                line: 1,
                                offset: 0,
                            },
                        },
                        type: 'root',
                    },
                    data: { title: 'test' },
                    excerpt: {
                        children: [
                            {
                                children: [
                                    {
                                        position: {
                                            end: {
                                                column: 7,
                                                line: 1,
                                                offset: 6,
                                            },
                                            start: {
                                                column: 3,
                                                line: 1,
                                                offset: 2,
                                            },
                                        },
                                        type: 'text',
                                        value: 'yolo',
                                    },
                                ],
                                depth: 1,
                                position: {
                                    end: {
                                        column: 7,
                                        line: 1,
                                        offset: 6,
                                    },
                                    start: {
                                        column: 1,
                                        line: 1,
                                        offset: 0,
                                    },
                                },
                                type: 'heading',
                            },
                        ],
                        position: {
                            end: {
                                column: 1,
                                line: 2,
                                offset: 7,
                            },
                            start: {
                                column: 1,
                                line: 1,
                                offset: 0,
                            },
                        },
                        type: 'root',
                    },
                    hash: '673b64c4e78fa78e39b851fe79ef19b8',
                    language: 'yaml',
                });
            });
        });
    });
});
