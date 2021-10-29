/*
 * Package @liesmich/parser
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { parse } from './converter';

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
            it('should match h4 title', (): void => {
                const srcData: any = parse('# yolo');
                expect(srcData).to.deep.equal({
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
                    frontmatter: {},
                    hash: 'c0cdb11325d7344604bf6ae2a483238f',
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
                });
            });
        });
    });
});
