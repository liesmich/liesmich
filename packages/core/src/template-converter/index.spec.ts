/*!
 * Source https://github.com/liesmich/liesmich Package: schemas
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { Converter } from './';

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
        describe('extractTemplateVariables', (): void => {
            let converter: Converter;
            beforeEach((): void => {
                converter = new Converter();
            });
            it('should match h4 title', async (): Promise<void> => {
                expect(converter.extractTemplateVariables('test string')).to.be.empty;
            });
            it('should match h4 title', async (): Promise<void> => {
                expect(converter.extractTemplateVariables('test{{test:data?yolo=29}} string')).to.deep.equal([{
                    end: 25,
                    host: 'test',
                    qs: '?yolo=29',
                    scheme: 'data',
                    start: 4,
                }]);
            });
            it('should match h2 title', async (): Promise<void> => {
                expect(converter.extractTemplateVariables('test{{test:data}} string')).to.deep.equal([{
                    end: 17,
                    host: 'test',
                    qs: undefined,
                    scheme: 'data',
                    start: 4,
                }]);
            });
        });
    });
});
