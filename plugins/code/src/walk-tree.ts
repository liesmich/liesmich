/*
 * Package @liesmich/plugin-code
 * Source https://liesmich.github.io/liesmich/
 */

import { LiesmichLiteral } from '@liesmich/core';
import { TreeWalker } from '@liesmich/tree-walker';
import { resolve } from 'path';
import { read } from 'to-vfile';
import { Data, Literal, Node, Parent } from 'unist';
import { VFile } from 'vfile';

type PluginData = { path: string };
export type LiesmichVariableNode = LiesmichLiteral<PluginData>;
export class LiesmichTreeWalker extends TreeWalker {
    constructor(public readonly sourceFile: VFile) {
        super();
    }

    public filter(parent: Parent<Node<Data>, Data> | false, node: LiesmichLiteral<PluginData>, idx: number): boolean {
        return node.type === 'liesmich' && node.host === 'code';
    }

    public async loadFile(cwd: string, path: string): Promise<VFile> {
        return read(resolve(cwd, path));
    }

    public async handle(parent: Parent<Node<Data>, Data> | false, node: LiesmichLiteral<PluginData>, idx: number): Promise<boolean> {
        if (node.query?.path == undefined) {
            throw new Error('No key defined');
        }
        if (parent === false) {
            throw new Error('Parent should be provided!');
        }
        const f: VFile = await this.loadFile(this.sourceFile.dirname || this.sourceFile.cwd, node.query.path);
        parent.children.splice(idx, 1, {
            type: 'text',
            value: f.value instanceof Buffer ? f.value.toString('utf-8') : f.value,
        } as Literal<string>);
        return false;
    }
}
