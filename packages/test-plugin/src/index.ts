
/*
 * Package @liesmich/core
 * Source https://liesmich.github.io/liesmich/
 */
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { Plugin, Processor, unified } from "unified";

export function createPipeline(plg: Plugin): Processor {
    return unified().use(remarkParse).use(remarkGfm).use(remarkStringify).use(plg);
}
