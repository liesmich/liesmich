/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import 'mocha';
import Sinon from 'sinon';

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
