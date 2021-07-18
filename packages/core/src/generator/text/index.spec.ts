/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import unified, { Processor } from 'unified';
import { Node } from 'unist';
import Sinon from 'sinon';
import { TextGenerator } from '.';
import { GeneratorHandler } from '../generator-handler';

describe('generator/text', (): void => {
    let sandbox: Sinon.SinonSandbox;
    let testGenHandler: Sinon.SinonStubbedInstance<GeneratorHandler>;
    let testEncoder: Processor;
    before((): void => {
        sandbox = Sinon.createSandbox();
        testGenHandler = sandbox.createStubInstance(GeneratorHandler, {});
        testEncoder = unified()
            .use(remarkGfm)
            .use(remarkStringify);
    });
    beforeEach((): void => {
        (testGenHandler as any).globalConfig = { lineBreak: 'test' };
    });
    afterEach((): void => {
        sandbox.reset();
    });
    after((): void => {
        sandbox.restore();
    });
    describe('TextGenerator', (): void => {
        it('should generate h1 title', async (): Promise<void> => {
            const generator: TextGenerator = new TextGenerator(testGenHandler as any);
            const node: Node = await generator.generate({ value: 'any text' });
            expect(testEncoder.stringify(node))
                .to.equal('any text\n');
        });
    });
});
