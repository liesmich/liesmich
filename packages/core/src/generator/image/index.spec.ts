/*!
 * Source https://github.com/liesmich/liesmich Package: schemas
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { GeneratorHandler } from '../generator-handler';
import { ImageGenerator } from '.';

describe('generator/image', (): void => {
    let sandbox: Sinon.SinonSandbox;
    let testGenHandler: Sinon.SinonStubbedInstance<GeneratorHandler>;
    before((): void => {
        sandbox = Sinon.createSandbox();
        testGenHandler = sandbox.createStubInstance(GeneratorHandler, {});
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
            expect(await generator.generate({ alt: 'alt title', src: 'http://test.domain', title: 'test title' }))
                .to.equal('![alt%20title](http://test.domain "test%20title")');
        });
    });
});
