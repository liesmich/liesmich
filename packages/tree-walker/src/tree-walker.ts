/*
 * Package @liesmich/tree-walker
 * Source https://liesmich.github.io/liesmich/
 */

import { Literal, Node, Parent } from 'unist';

export abstract class TreeWalker {
    public abstract filter(parent: Parent | false, node: Node, idx: number): Promise<boolean> | boolean;

    public async walk(node: Node | Parent): Promise<void> {
        return this.walkInternal(false, node, -1);
    }

    private async walkInternal(parent: Parent | false, node: Node | Parent, parentIdx: number): Promise<void> {
        if (await this.filter(parent, node as Literal<string>, parentIdx)) {
            if (await this.handle(parent, node, parentIdx)) {
                return this.walkInternal(parent, node, parentIdx);
            }
        }
        if ('children' in node) {
            let idx = 0;
            while (node.children && idx < node.children.length) {
                await this.walkInternal(node, node.children[idx], idx);
                idx++;
            }
        }
    }
    /**
     *
     * @param parent Parent node
     * @param node node
     * @param idx idx of node in parent
     * @returns {boolean} return true if the node was modified
     */
    public abstract handle(parent: Parent | false, node: Node, idx: number): boolean | Promise<boolean>;
}
