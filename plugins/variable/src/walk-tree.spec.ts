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
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    testWalker.handle(false, { type: 'text' } as any, 0);
                }).to.throw('No key defined');
            });
            it('expect to replace value and remove data block', (): void => {
                getterStub.returns('yes');
                const testNode: LiesmichVariableNode = {
                    host: 'variable',
                    query: {
                        key: 'asdf',
                    },
                    scheme: 'lm',
                    type: 'liesmich',
                    value: 'testvalue',
                };
                expect((): void => {
                    testWalker.handle(false, testNode, 0);
                }).to.throw('A parent is required');
            });
        });
        describe('filter()', (): void => {
            const TEST_NODE_1: LiesmichVariableNode = {
                host: 'variable',
                query: {
                    key: 'asdf',
                },
                scheme: 'lm',
                type: 'liesmich',
                value: 'testvalue',
            };
            const TEST_NODE_2: LiesmichVariableNode = {
                host: 'other',
                query: {
                    key: 'asdf',
                },
                scheme: 'lm',
                type: 'liesmich',
                value: 'testvalue',
            };
            const TEST_NODE_3: LiesmichVariableNode = {
                type: 'liesmich',
                value: 'testvalue',
            } as LiesmichVariableNode;
            const TEST_NODE_4: LiesmichVariableNode = {
                type: 'liesmich',
                value: 'testvalue',
            } as LiesmichVariableNode;
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
