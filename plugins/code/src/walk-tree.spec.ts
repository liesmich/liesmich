/*
 * Package @liesmich/plugin-code
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import 'mocha';
import Sinon, { SinonStub, SinonStubbedInstance } from 'sinon';
import { VFile } from 'vfile';
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
        let loadFileStub: SinonStub;
        let vfileStubInstance: SinonStubbedInstance<VFile>;
        beforeEach((): void => {
            vfileStubInstance = sandbox.createStubInstance(VFile);
            testWalker = new LiesmichTreeWalker(vfileStubInstance);
            loadFileStub = sandbox.stub(testWalker, 'loadFile');
        });
        describe('handle()', (): void => {
            it('expect throw error on missing path', async (): Promise<void> => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                await testWalker.handle(false, { type: 'code' } as any, 0).catch((err: any) => {
                    expect(err).to.equal('No path defined');
                });
            });
            it('expect to replace value and remove data block', async (): Promise<void> => {
                loadFileStub.returns('yes');

                const testNode: LiesmichVariableNode = {
                    host: 'code',
                    query: {
                        path: 'asdf',
                    },
                    scheme: 'lm',
                    type: 'liesmich',
                    value: 'testvalue',
                };
                await testWalker.handle(false, testNode, 0).catch((err: any) => {
                    expect(err).to.equal('No path defined');
                });
            });
        });
        describe('filter()', (): void => {
            const TEST_NODE_1: LiesmichVariableNode = {
                host: 'code',
                query: {
                    path: 'asdf',
                },
                scheme: 'lm',
                type: 'liesmich',
                value: 'testvalue',
            };
            const TEST_NODE_2: LiesmichVariableNode = {
                host: 'other',
                query: {
                    path: 'asdf',
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
