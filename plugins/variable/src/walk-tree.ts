/*
 * Package @liesmich/plugin-variable
 * Source https://liesmich.github.io/liesmich/
 */

import { LiesmichLiteral } from '@liesmich/core';
import { TreeWalker } from '@liesmich/tree-walker';
import { Data, Literal, Node, Parent } from 'unist';

export type DotProGetReturnType<T> = undefined | T;
export type Getter<T = unknown> = (key: string) => DotProGetReturnType<T>;
type PluginData = { key: string };
export type LiesmichVariableNode = LiesmichLiteral<PluginData>;
export class LiesmichTreeWalker extends TreeWalker {
    constructor(public readonly getter: Getter) {
        super();
    }

    public filter(parent: Parent<Node<Data>, Data> | false, node: LiesmichLiteral<PluginData>, idx: number): boolean {
        return node.type === 'liesmich' && node.host === 'variable';
    }

    public handle(parent: Parent<Node<Data>, Data> | false, node: LiesmichLiteral<PluginData>, idx: number): boolean {
        if (node.query?.key == undefined) {
            throw new Error('No key defined');
        }
        if (parent === false) {
            throw new Error('A parent is required');
        }
        const key: string = node.query.key;
        const value: string | undefined = this.getter(key) as string;
        if (value) {
            parent.children.splice(idx, 1, {
                type: 'text',
                value,
            } as Literal<string>);
        }
        return false;
    }
}
