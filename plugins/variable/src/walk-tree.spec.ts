/*
 * Package @liesmich/plugin-variable
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import 'mocha';
import Sinon, { SinonStub } from 'sinon';
import { LiesmichTreeWalker, LiesmichVariableNode } from './walk-tree';

// tslint:disable:no-unused-expression
describe('walk-tree', (): void => {
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
    describe('LiesmichTreeWalker', (): void => {
        let testWalker: LiesmichTreeWalker;
        let getterStub: SinonStub;
        before((): void => {
            getterStub = sandbox.stub();
        });
        beforeEach((): void => {
            testWalker = new LiesmichTreeWalker(getterStub);
        });
        describe('handle()', (): void => {
            it('expect throw error on missing key', (): void => {
                expect((): void => {
                    testWalker.handle(false, { type: 'text' } as LiesmichVariableNode, 0);
                }).to.throw('No key defined');
            });
            it('expect to replace value and remove data block', (): void => {
                getterStub.returns('yes');
                const testNode: LiesmichVariableNode = {
                    data: {
                        liesmich: {
                            host: 'variable',
                            query: {
                                key: 'asdf',
                            },
                            scheme: 'lm',
                        },
                    },
                    type: 'liesmich',
                    value: 'testvalue',
                };
                expect(testWalker.handle(false, testNode, 0)).to.equal(false);
                expect(testNode.data).to.deep.equal({}, 'variable block should be removed');
                expect(testNode.value).to.equal('yes');
            });
        });
        describe('filter()', (): void => {
            const TEST_NODE_1: LiesmichVariableNode = {
                data: {
                    liesmich: {
                        host: 'variable',
                        query: {
                            key: 'asdf',
                        },
                        scheme: 'lm',
                    },
                },
                type: 'liesmich',
                value: 'testvalue',
            };
            const TEST_NODE_2: LiesmichVariableNode = {
                data: {
                    liesmich: {
                        host: 'other',
                        query: {
                            key: 'asdf',
                        },
                        scheme: 'lm',
                    },
                },
                type: 'liesmich',
                value: 'testvalue',
            };
            const TEST_NODE_3: LiesmichVariableNode = {
                data: {},
                type: 'liesmich',
                value: 'testvalue',
            };
            const TEST_NODE_4: LiesmichVariableNode = {
                type: 'liesmich',
                value: 'testvalue',
            };
            it('should reject nodes', (): void => {
                expect(testWalker.filter(false, TEST_NODE_2, 0)).to.equal(false);
                expect(testWalker.filter(false, TEST_NODE_3, 0)).to.equal(false);
                expect(testWalker.filter(false, TEST_NODE_4, 0)).to.equal(false);
            });
            it('should accept nodes', (): void => {
                expect(testWalker.filter(false, TEST_NODE_1, 0)).to.equal(true);
            });
        });
    });
});
