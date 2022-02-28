/*
 * Package @liesmich/plugin-variable
 * Source https://liesmich.github.io/liesmich/
 */

import { createPipeline } from '@liesmich-helpers/test-plugin';
import { expect } from 'chai';
import 'mocha';
import { read } from 'to-vfile';
import { Processor } from 'unified';
import { VFile } from 'vfile';
import { plugin } from './../src';

// tslint:disable:no-unused-expression
describe('e2e', (): void => {
    let p: Processor;
    let testData: Record<string, unknown>;
    beforeEach((): void => {
        testData = {};
        p = createPipeline(plugin, testData);
    });
    describe('handle()', (): void => {
        it('should not modify string', async (): Promise<void> => {
            expect((await p.process('test')).toString()).to.equal('test\n');
        });
        it('should inline variable correclty', async (): Promise<void> => {
            p.data('test', 'asdf');
            expect((await p.process('test {{ lm:variable?key=test }} but no')).toString()).to.equal('test asdf but no\n');
        });
        it('should inline for full file', async (): Promise<void> => {
            const testVFile: VFile = await read('./e2e/simple_inline.md');
            p.data('test', 'asdf');
            expect((await p.process(testVFile)).toString()).to.equal('# asdf\n\n## @liesmich/plugin-variable\n');
        });
    });
});
