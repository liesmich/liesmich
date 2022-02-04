/*
 * Package @liesmich/plugin-variable
 * Source https://liesmich.github.io/liesmich/
 */

import { LiesmichLiteral } from '@liesmich/core';
import { TreeWalker } from '@liesmich/tree-walker';
import { Data, Node, Parent } from 'unist';

export type DotProGetReturnType<T> = undefined | T;
export type Getter<T = unknown> = (key: string) => DotProGetReturnType<T>;
type PluginData = { key: string };
export type LiesmichVariableNode = LiesmichLiteral<PluginData>;
export class LiesmichTreeWalker extends TreeWalker {
    constructor(public readonly getter: Getter) {
        super();
    }

    public filter(parent: Parent<Node<Data>, Data> | false, node: LiesmichLiteral<PluginData>, idx: number): boolean {
        return node.type === 'liesmich' && node.data?.liesmich?.host === 'variable';
    }

    public handle(parent: Parent<Node<Data>, Data> | false, node: LiesmichLiteral<PluginData>, idx: number): boolean {
        if (node.data?.liesmich?.query?.key == undefined) {
            throw new Error('No key defined');
        }
        const key: string = node.data.liesmich.query.key;
        const value: string | undefined = this.getter(key) as string;
        if (value) {
            node.value = value;
            delete node.data.liesmich;
        }
        return false;
    }
}
