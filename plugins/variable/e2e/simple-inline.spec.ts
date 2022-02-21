/*
 * Package @liesmich/plugin-variable
 * Source https://liesmich.github.io/liesmich/
 */

import { createPipeline } from '@liesmich-helpers/test-plugin';
import { expect } from 'chai';
import 'mocha';
import { Processor } from 'unified';
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
    });
});
