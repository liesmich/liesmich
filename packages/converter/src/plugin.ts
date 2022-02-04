/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { Plugin } from 'unified';
import { fromMarkdown } from './from-markdown-extension';
import { toMarkdown } from './to-markdown-extension';
import { liesmichExtension } from './tokenizer';

/**
 * @param options
 */
export const liesmichConverterPlugin: Plugin = function liesmichConverterPlugin(options = {}): void {
    const data: Record<string, any> = this.data();

    add('micromarkExtensions', liesmichExtension);
    add('fromMarkdownExtensions', fromMarkdown);
    add('toMarkdownExtensions', toMarkdown);
    /**
     * @param {string} field
     * @param {unknown} value
     */
    function add(field: string, value: unknown): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const list: unknown[] = data[field] ? data[field] : (data[field] = []);

        list.push(value);
    }
};
