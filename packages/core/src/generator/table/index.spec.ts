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
import { TableGenerator } from '.';
import { GeneratorHandler } from '../generator-handler';
import { TextGenerator } from '../text';

describe('generator/table', (): void => {
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
    describe('TableGenerator', (): void => {
        it('should generate h1 title', async (): Promise<void> => {
            const genHandler: GeneratorHandler = new GeneratorHandler({} as any);
            genHandler.register(TextGenerator);
            const generator: TableGenerator = new TableGenerator(genHandler);
            const node: Node = await generator.generate({
                align: ['left', 'center', 'right'],
                header: ['left', 'center', 'right'],
                rows: [['a', 'b', 'c']],
            });
            expect(testEncoder.stringify(node))
                .to.equal('| left | center | right |\n| :--- | :----: | ----: |\n| a    |    b   |     c |\n');
        });
        it('should generate h1 title', async (): Promise<void> => {
            const genHandler: GeneratorHandler = new GeneratorHandler({} as any);
            genHandler.register(TextGenerator);
            const generator: TableGenerator = new TableGenerator(genHandler);
            const node: Node = await generator.generate({
                align: 'right',
                header: ['left', 'center', 'right'],
                rows: [['a', 'b', 'c']],
            });
            expect(testEncoder.stringify(node))
                .to.equal('| left | center | right |\n| ---: | -----: | ----: |\n|    a |      b |     c |\n');
        });
    });
});
