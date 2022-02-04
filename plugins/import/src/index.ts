/*
 * Package @liesmich/plugin-import
 * Source https://liesmich.github.io/liesmich/
 */

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
    console.log(options);
    return async (node: Node | Parent, file: VFile): Promise<Node> => {
        return Promise.resolve(node);
    };
};
