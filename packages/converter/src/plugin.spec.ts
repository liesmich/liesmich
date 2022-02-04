/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import 'mocha';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkStringify, { Options as StringifyOptions } from 'remark-stringify';
import { unified, Processor } from 'unified';
import { VFile } from 'vfile';
import { text } from './liesmich-handler';
import { liesmichConverterPlugin } from './plugin';

describe('plugin.ts', (): void => {
    describe('liesmichConverterPlugin', (): void => {
        it('should inline correclty between two', async (): Promise<void> => {
            const p: Processor = unified().use(remarkParse).use(remarkGfm).use(remarkStringify).use(liesmichConverterPlugin);
            const d: VFile = await p.process('test');
            expect(d.toString()).to.equal('test\n');
        });
        it('should reprint template var', async (): Promise<void> => {
            const opt: StringifyOptions = {
                handlers: {
                    liesmich: text,
                },
            };
            const p: Processor = unified().use(remarkParse).use(remarkGfm).use(remarkStringify, opt).use(liesmichConverterPlugin);
            const d: VFile = await p.process('test kumba {{lm:test?query=1}} yo');
            expect(d.toString()).to.equal('test kumba {{lm:test?query=1}} yo\n');
        });
    });
});
