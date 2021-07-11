/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { AbstractGenerator } from '../generator/abstract-generator';
import { GeneratorHandler } from '../generator/generator-handler';
import { Converter } from './';

class TestGenerator extends AbstractGenerator<'test', Object> {
    public constructor(genHandler: GeneratorHandler) {
        super('test', genHandler);
    }

    public async generate(badge: Object): Promise<string> {
        return `${this.name}:${JSON.stringify(badge)}`;
    }
}

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
        describe('extractTemplateVariables()', (): void => {
            let converter: Converter;
            beforeEach((): void => {
                converter = new Converter(undefined as any);
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
        describe('convert()', (): void => {
            let converter: Converter;
            let genHandler: GeneratorHandler;
            beforeEach((): void => {
                genHandler = new GeneratorHandler({} as any);
                genHandler.register(TestGenerator);
                converter = new Converter(genHandler);
            });
            it('should match h4 title', async (): Promise<void> => {
                expect(await converter.convert('test string')).to.equal('test string');
            });
            it('should match h4 title', async (): Promise<void> => {
                expect(await converter.convert('test {{ template:test }} string')).to.equal('test test:undefined string');
            });
            it('should match h4 title', async (): Promise<void> => {
                expect(await converter.convert('test {{ template:test?yolo=2 }} string')).to.equal('test test:{"yolo":2} string');
            });
        });
    });
});
