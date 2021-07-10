/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { GeneratorHandler } from '../generator-handler';
import { BadgeGenerator } from './';

describe('generator/badge', (): void => {
    let sandbox: Sinon.SinonSandbox;
    let testGenHandler: Sinon.SinonStubbedInstance<GeneratorHandler>;
    before((): void => {
        sandbox = Sinon.createSandbox();
        testGenHandler = sandbox.createStubInstance(GeneratorHandler, {});
    });
    afterEach((): void => {
        sandbox.reset();
    });
    after((): void => {
        sandbox.restore();
    });
    describe('BadgeGenerator', (): void => {
        it('should work without line breaks', async (): Promise<void> => {
            const generator: BadgeGenerator = new BadgeGenerator(testGenHandler as any);
            expect(await generator.generate({ alt: 'alt text', img: 'http://random.domain/img.jpg', url: 'random.href/path' }))
                .to.equal('<a href="random.href/path"><img alt="alt text" src="http://random.domain/img.jpg" height="20"/></a>');
        });
    });
});
