/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { Converter } from './converter';

// tslint:disable:no-unused-expression
describe('template-converter/index', (): void => {
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
    describe('Converter', (): void => {
        describe('convert()', (): void => {
            let converter: Converter;
            beforeEach((): void => {
                converter = new Converter();
            });
            it('should match h4 title', async (): Promise<void> => {
                expect(await converter.convert('test string')).to.equal('test string');
            });
            it('should match h4 title', async (): Promise<void> => {
                expect(await converter.convert('test {{ template:table }} string')).to.equal('test test2:undefined test:undefined string');
            });
        });
    });
});
