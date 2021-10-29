/*
 * Package @liesmich/block-loader
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { loader } from './converter';

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
            it('should match h4 title', (): void => {
                const srcData: any = loader('# yolo');
                expect(srcData).to.not.be.undefined;
            });
        });
    });
});
