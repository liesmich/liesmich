/*
 * Package @liesmich/plugin-template
 * Source https://liesmich.github.io/liesmich/
 */

import { resolve } from 'path';
import { TemplateTreeWalker } from './walk-tree';
import type { Plugin as UnifiedPlugin, Transformer } from 'unified';
import type { Node, Parent } from 'unist';
import type { VFile } from 'vfile';

/**
 * Remark Plugin for inline template variables
 *
 * @param options
 * @param options.data data to inline
 * @returns Plugin
 */
export const plugin: UnifiedPlugin = function plugin(options: object): Transformer {
    return async (node: Node | Parent, file: VFile): Promise<Node> => {
        // file.path = file.history[0]
        const treeWalker: TemplateTreeWalker = new TemplateTreeWalker(this, file.dirname ? resolve(file.cwd, file.dirname) : file.cwd);
        await treeWalker.walk(node);
        return node;
    };
};
