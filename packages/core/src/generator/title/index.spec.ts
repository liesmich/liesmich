/*!
 * Source https://github.com/liesmich/liesmich Package: schemas
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { GeneratorHandler } from '../generator-handler';
import { TitleGenerator } from './';

describe('generator/badge', (): void => {
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
    describe('TitleGenerator', (): void => {
        it('should generate h1 title', async (): Promise<void> => {
            const generator: TitleGenerator = new TitleGenerator(testGenHandler as any);
            expect(await generator.generate({ title: 'test title' }))
                .to.equal('# test titletest');
        });
        it('should generate h4 title', async (): Promise<void> => {
            const generator: TitleGenerator = new TitleGenerator(testGenHandler as any);
            expect(await generator.generate({ importance: 4, title: 'test kk title' }))
                .to.equal('#### test kk titletest');
        });
    });
});
