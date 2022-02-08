/*
 * Package @liesmich-helpers/test-plugin
 * Source https://liesmich.github.io/liesmich/
 */

import 'mocha';
import Sinon from 'sinon';

// tslint:disable:no-unused-expression
describe('plugin-cache', (): void => {
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
            it('should match h4 title');
        });
    });
});
