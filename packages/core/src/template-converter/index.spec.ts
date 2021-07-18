/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { AbstractGenerator } from '../generator/abstract-generator';
import { GeneratorHandler } from '../generator/generator-handler';
import { Converter } from './';

class TestGenerator extends AbstractGenerator<'test', object> {
    public constructor(genHandler: GeneratorHandler) {
        super('test', genHandler);
    }

    public async generate(badge: object): Promise<string> {
        return `{{ template:test2 }} ${this.name}:${JSON.stringify(badge)}`;
    }
}
class Test2Generator extends AbstractGenerator<'test2', object> {
    public constructor(genHandler: GeneratorHandler) {
        super('test2', genHandler);
    }

    public async generate(badge: object): Promise<string> {
        return `${this.name}:${JSON.stringify(badge)}`;
    }
}

const tableMarkdownTest: string =
    `| Left | Center | Right  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | top |
| col 2 is      | centered      |   mid |
| test value | {{template:test?yolo=2}} |    bottom |
`;
const tableMarkdownTestResult: string =
    `| Left       |               Center              |  Right |
| ---------- | :-------------------------------: | -----: |
| col 3 is   |           right-aligned           |    top |
| col 2 is   |              centered             |    mid |
| test value | test2:undefined test:{"yolo":"2"} | bottom |
`;

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
                    host: 'data',
                    qs: {
                        yolo: '29',
                    },
                    scheme: 'test',
                    start: 4,
                }]);
            });
            it('should match h2 title', async (): Promise<void> => {
                expect(converter.extractTemplateVariables('test{{test:data}} string')).to.deep.equal([{
                    end: 17,
                    host: 'data',
                    qs: undefined,
                    scheme: 'test',
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
                genHandler.register(Test2Generator);
                converter = new Converter(genHandler);
            });
            it('should match h4 title', async (): Promise<void> => {
                expect(await converter.convert('test string')).to.equal('test string');
            });
            it('should match h4 title', async (): Promise<void> => {
                expect(await converter.convert('test {{ template:test }} string')).to.equal('test test2:undefined test:undefined string');
            });
            it('should match h4 title', async (): Promise<void> => {
                expect(await converter.convert('test {{ template:test?yolo=2 }} string'))
                    .to.equal('test test2:undefined test:{"yolo":"2"} string');
            });
            it('should match h4 title', async (): Promise<void> => {
                const input: string = 'test {{ template:test?yolo=2 }} string {{ template:test?yolo=3 }}';
                expect(await converter.convert(input)).to.equal('test test2:undefined test:{"yolo":"2"} string test2:undefined test:{"yolo":"3"}');
            });
            it('should handle ast tree', async (): Promise<void> => {
                const input: string = 'test {{ template:test?yolo=2 }} string {{ template:test?yolo=3 }}';
                expect(await converter.convert2(input)).to.equal('test test2:undefined test:{"yolo":"2"} string test2:undefined test:{"yolo":"3"}\n');
            });
            it('should handle markdown table', async (): Promise<void> => {
                expect(await converter.convert2(tableMarkdownTest)).to.equal(tableMarkdownTestResult);
            });
            it('should handle markdown image links', async (): Promise<void> => {
                const imageLink: string = '[![title](https://test.domain/image/path.jpg)](https://path.com)\n'
                expect(await converter.convert2(imageLink)).to.equal(imageLink);
            });
            it('should match h4 title', async (): Promise<void> => {
                const input: string = 'test {{ template:test?yolo=2 }} string {{ template:test?yolo=3 }}';
                expect(await converter.convert(input)).to.equal('test test2:undefined test:{"yolo":"2"} string test2:undefined test:{"yolo":"3"}');
            });
        });
    });
});
