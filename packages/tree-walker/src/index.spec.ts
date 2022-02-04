/*
 * Package @liesmich/tree-walker
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import * as idx from './index';
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
    describe('index', (): void => {
        it('should only export the TreeWalker', (): void => {
            expect(Object.keys(idx)).to.deep.equal(['TreeWalker']);
        });
    });
});
