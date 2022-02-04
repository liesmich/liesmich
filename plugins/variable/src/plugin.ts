/*
 * Package @liesmich/plugin-variable
 * Source https://liesmich.github.io/liesmich/
 */

import { get } from 'dot-prop';
import { Getter, LiesmichTreeWalker } from './walk-tree';
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
    const getter: Getter = (key: string): unknown => {
        return get(this.data(), key);
    };
    return async (node: Node | Parent, file: VFile): Promise<Node> => {
        const treeWalker: LiesmichTreeWalker = new LiesmichTreeWalker(getter);
        await treeWalker.walk(node);
        return node;
    };
};
