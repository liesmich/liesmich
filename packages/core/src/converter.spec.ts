/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { Converter } from './converter';


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
                expect(await converter.convert(input)).to.equal('test test2:undefined test:{"yolo":"2"} string test2:undefined test:{"yolo":"3"}\n');
            });
            it('should handle markdown table', async (): Promise<void> => {
                expect(await converter.convert(tableMarkdownTest)).to.equal(tableMarkdownTestResult);
            });
            it('should handle markdown image links', async (): Promise<void> => {
                const imageLink: string = '[![title](https://test.domain/image/path.jpg)](https://path.com)\n'
                expect(await converter.convert(imageLink)).to.equal(imageLink);
            });
            it('should match h4 title', async (): Promise<void> => {
                const input: string = 'test {{ template:test?yolo=2 }} string {{ template:test?yolo=3 }}';
                expect(await converter.convert(input)).to.equal('test test2:undefined test:{"yolo":"2"} string test2:undefined test:{"yolo":"3"}');
            });
        });
    });
});
