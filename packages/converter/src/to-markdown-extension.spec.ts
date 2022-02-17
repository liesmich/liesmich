/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import 'mocha';
import { fromMarkdown as testFromMarkdown } from './from-markdown-extension';
import { toMarkdown as testToMarkdown } from './to-markdown-extension';
import { liesmichExtension } from './tokenizer';

function testE2EMarkdown(inp: string): string {
    const from = fromMarkdown(inp, {
        extensions: [liesmichExtension],
        mdastExtensions: [testFromMarkdown],
    });
    return toMarkdown(from, {
        extensions: [testToMarkdown],
    });
}

// tslint:disable:no-unused-expression
describe('to-markdown-extension.ts', (): void => {
    describe('to-markdown-extension', (): void => {
        describe('parse without leading or trailing line breaks', (): void => {
            it('should work with consecutive blocks and preserve whitespace prefix', (): void => {
                const testString: string = 'test {{LM:path?key=none }}\n{{lm:other }} a\n';
                expect(testE2EMarkdown(testString)).to.equal(testString);
            });
            it('should work with trailing line break', (): void => {
                const testString: string = 'test {{ lm:path?key=none }}\na\n';
                expect(testE2EMarkdown(testString)).to.equal(testString);
            });
            it('should work with trailing line break', (): void => {
                const testString: string = 'test {{ lm:path?key=none }}\n\na\n';
                expect(testE2EMarkdown(testString)).to.equal(testString);
            });
            it('should work without line breaks', (): void => {
                const testString: string = 'test {{ LM:path?key=none }} a\n';
                expect(testE2EMarkdown(testString)).to.equal(testString);
            });
            it('should work with leading line break', (): void => {
                const testString: string = 'test\n{{ LM:path?key=none }} a\n';
                expect(testE2EMarkdown(testString)).to.equal(testString);
            });
        });
    });
});
