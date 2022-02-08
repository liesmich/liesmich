/*
 * Package @liesmich-helpers/test-plugin
 * Source https://liesmich.github.io/liesmich/
 */

import { liesmichConverterPlugin } from '@liesmich/converter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { Plugin, Processor, unified } from 'unified';

/**
 * @param plg
 * @param opts
 */
export function createPipeline(plg: Plugin, opts?: unknown): Processor {
    return unified().use(remarkParse).use(remarkGfm).use(remarkStringify).use(plg, opts).use(liesmichConverterPlugin);
}
