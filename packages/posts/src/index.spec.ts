/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import 'mocha';
import Sinon from 'sinon';

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
            it('should match h4 title');
        });
    });
});
