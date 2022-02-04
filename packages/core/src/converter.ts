/*
 * Package @liesmich/core
 * Source https://liesmich.github.io/liesmich/
 */

import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { Processor, unified } from 'unified';
import { Node } from 'unist';
import { VFileCompatible } from 'vfile';
export class Converter {
    private parseProcessor: Processor<Node, Node, Node, void> = unified().use(remarkParse).use(remarkGfm).use(remarkStringify);
    public parse(file: VFileCompatible): Node {
        return this.parseProcessor.parse();
    }
}
export type ParseFunction = Converter['parse'];
