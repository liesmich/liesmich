/*
 * Package @liesmich/plugin-template
 * Source https://liesmich.github.io/liesmich/
 */

import { LiesmichLiteral, MdParent } from '@liesmich/core';
import { expect } from 'chai';
import 'mocha';
import Sinon, { SinonStub } from 'sinon';
import { toVFile } from 'to-vfile';
import { FrozenProcessor } from 'unified';
import { Parent } from 'unist';
import { PluginData, TemplateTreeWalker } from './walk-tree';

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
        let testWalker: TemplateTreeWalker;
        let parseStub: SinonStub<Parameters<FrozenProcessor['parse']>, ReturnType<FrozenProcessor['parse']>>;
        let runStub: SinonStub;
        before((): void => {
            parseStub = sandbox.stub();
            runStub = sandbox.stub();
        });
        beforeEach((): void => {
            testWalker = new TemplateTreeWalker(
                {
                    parse: parseStub,
                    run: runStub,
                },
                './'
            );
        });
        describe('handle()', (): void => {
            let loadFileStub: SinonStub<Parameters<TemplateTreeWalker['loadFile']>, ReturnType<TemplateTreeWalker['loadFile']>>;
            beforeEach((): void => {
                loadFileStub = sandbox.stub(testWalker, 'loadFile');
            });
            it('expect to replace value and remove data block', async (): Promise<void> => {
                loadFileStub.resolves(toVFile('data'));
                const resultNode: Parent = {
                    children: [
                        {
                            type: 'a',
                        },
                        {
                            type: 'b',
                        },
                    ],
                    type: 'root',
                };
                parseStub.returns(resultNode);
                runStub.returns(resultNode);
                const testNode: LiesmichLiteral<PluginData> = {
                    host: 'template',
                    query: {
                        path: './test.md',
                    },
                    scheme: 'lm',
                    type: 'liesmich',
                    value: 'test',
                };
                const testRoot: MdParent = {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    children: [testNode as any],
                    data: {
                        test: true,
                    },
                    type: 'root',
                };
                expect(await testWalker.handle(testRoot, testNode, 0)).to.equal(false);
                expect(testRoot).to.deep.equal(
                    {
                        children: [
                            {
                                type: 'a',
                            },
                            {
                                type: 'b',
                            },
                        ],
                        data: {
                            test: true,
                        },
                        type: 'root',
                    },
                    'variable block should be removed'
                );
            });
        });
    });
});
