/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { BadgeGenerator } from '../badge';
import { GeneratorHandler } from '../generator-handler';
import { BadgeBarGenerator } from './';

describe('generator/badge-bar', (): void => {
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
    describe('BadgeBarGenerator', (): void => {
        let badgeGeneratorStub: Sinon.SinonStubbedInstance<BadgeGenerator>;
        beforeEach('setup generator stub', (): void => {
            badgeGeneratorStub = sandbox.createStubInstance(BadgeGenerator);
            testGenHandler.get.returns(badgeGeneratorStub as any);
            (testGenHandler as any).globalConfig = { lineBreak: 'test' };
        });
        it('should work without line breaks', async (): Promise<void> => {
            badgeGeneratorStub.generate.resolves('<a>');
            const generator: BadgeBarGenerator = new BadgeBarGenerator(testGenHandler as any);
            const result: string = await generator.generate([{
                alt: 'alt text',
                img: 'http://random.domain/img.jpg',
                url: 'random.href/path',
            }]);
            expect(result)
                .to.equal('<p align="center"><a></p>');
        });
        it('should work with line breaks', async (): Promise<void> => {
            badgeGeneratorStub.generate.resolves('<a>');
            const generator: BadgeBarGenerator = new BadgeBarGenerator(testGenHandler as any);
            const result: string = await generator.generate([{
                alt: 'alt text',
                img: 'http://random.domain/img.jpg',
                url: 'random.href/path',
            }, {
                alt: 'alt text2',
                img: 'http://random.domain/img2.jpg',
                url: 'random.href/path2',
            }]);
            expect(result)
                .to.equal('<p align="center"><a>test<a></p>');
        });
    });
});
