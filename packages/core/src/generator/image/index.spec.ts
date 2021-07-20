/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import Sinon from 'sinon';
import unified, { Processor } from 'unified';
import { Node } from 'unist';
import { ImageGenerator } from '.';
import { GeneratorHandler } from '../generator-handler';

describe('generator/image', (): void => {
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
    describe('ImageGenerator', (): void => {
        it('should generate h1 title', async (): Promise<void> => {
            const generator: ImageGenerator = new ImageGenerator(testGenHandler as any);
            const node: Node = await generator.generate({ alt: 'alt title', url: 'http://test.domain', title: 'test title' });
            expect(testEncoder.stringify(node))
                .to.equal('![alt title](http://test.domain "test title")\n');
        });
    });
});
