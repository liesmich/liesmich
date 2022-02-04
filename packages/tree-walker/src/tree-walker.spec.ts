/*
 * Package @liesmich/tree-walker
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import 'mocha';
import Sinon, { SinonSandbox, SinonSpy, SinonSpyCall } from 'sinon';
import { TreeWalker } from './tree-walker';
import type { Data, Literal, Node, Parent } from 'unist';

class TestTreeWalker extends TreeWalker {
    public constructor() {
        super();
    }
    public filter(parent: Parent<Node<Data>, Data>, node: Node<Data>): boolean {
        return false;
    }
    public handle(): boolean {
        return false;
    }
}
const TEST_TREE: Parent = {
    children: [
        {
            children: [
                {
                    type: 'text',
                    value: 'test',
                } as Literal,
            ],
            type: 'paragraph',
        } as Parent,
        {
            type: 'table',
        },
    ],
    type: 'root',
};
/**
 * @param calls
 */
function getCallTypes(calls: SinonSpy): string[] {
    return calls.getCalls().map((call: SinonSpyCall<Parameters<TreeWalker['handle']>>): string => {
        return call.args[1].type;
    });
}

describe('tree-walker.ts', (): void => {
    describe('TreeWalker', (): void => {
        let sandbox: SinonSandbox;
        before((): void => {
            sandbox = Sinon.createSandbox();
        });
        afterEach((): void => {
            sandbox.reset();
        });
        after((): void => {
            sandbox.restore();
        });
        describe('walk', (): void => {
            let testWalker: TreeWalker;
            let handleStub: Sinon.SinonStub;
            let filterStub: Sinon.SinonStub;
            beforeEach((): void => {
                testWalker = new TestTreeWalker();
                handleStub = sandbox.stub(testWalker, 'handle');
                filterStub = sandbox.stub(testWalker, 'filter');
            });
            it('should walk the tree correctly', async (): Promise<void> => {
                handleStub.returns(false);
                filterStub.callsFake((parent: Parent, node: Node): boolean => {
                    return node.type === 'text';
                });
                await testWalker.walk(TEST_TREE);
                expect(handleStub.callCount).to.equal(1, 'handle should be called once');
                expect(handleStub.getCall(0).args).to.deep.equal([
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
                        type: 'text',
                        value: 'test',
                    },
                    0,
                ]);
                expect(filterStub.callCount).to.equal(4);
                expect(getCallTypes(filterStub)).to.deep.equal(['root', 'paragraph', 'text', 'table']);
            });
            it('should walk the tree correctly', async (): Promise<void> => {
                handleStub.onFirstCall().returns(true).returns(false);
                filterStub.callsFake((parent: Parent, node: Node): boolean => {
                    return node.type === 'text';
                });
                await testWalker.walk(TEST_TREE);
                expect(handleStub.callCount).to.equal(2, 'handle should be called twice');
                expect(handleStub.getCall(0).args).to.deep.equal(handleStub.getCall(1).args);
                expect(handleStub.getCall(0).args).to.deep.equal([
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
                        type: 'text',
                        value: 'test',
                    },
                    0,
                ]);
                expect(filterStub.callCount).to.equal(5);
                expect(getCallTypes(filterStub)).to.deep.equal(['root', 'paragraph', 'text', 'text', 'table']);
                expect(filterStub.getCall(2).args).to.deep.eq(filterStub.getCall(3).args);
            });
            it('should work with manipulated children', async (): Promise<void> => {
                handleStub.onFirstCall().callsFake((parent: Parent, node: Literal) => {
                    node.value = 'cheese';
                    node.type = 'other';
                    return true;
                });
                filterStub.callsFake((parent: Parent, node: Node): boolean => {
                    return node.type === 'text';
                });
                const testTree: typeof TEST_TREE = JSON.parse(JSON.stringify(TEST_TREE)) as typeof TEST_TREE;
                await testWalker.walk(testTree);
                expect(testTree).to.deep.equal({
                    children: [
                        {
                            children: [
                                {
                                    type: 'other',
                                    value: 'cheese',
                                } as Literal,
                            ],
                            type: 'paragraph',
                        } as Parent,
                        {
                            type: 'table',
                        },
                    ],
                    type: 'root',
                });
                expect(handleStub.callCount).to.equal(1, 'handle should be called twice');
                expect(handleStub.getCall(0).args).to.deep.equal([
                    {
                        children: [
                            {
                                type: 'other',
                                value: 'cheese',
                            },
                        ],
                        type: 'paragraph',
                    },
                    {
                        type: 'other',
                        value: 'cheese',
                    },
                    0,
                ]);
                expect(getCallTypes(filterStub)).to.deep.equal(['root', 'paragraph', 'other', 'other', 'table']);
                expect(filterStub.getCall(2).args).to.deep.eq(filterStub.getCall(3).args);
            });
        });
    });
});
