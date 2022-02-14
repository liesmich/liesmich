/*
 * Package @liesmich/plugin-template
 * Source https://liesmich.github.io/liesmich/
 */

import { LiesmichLiteral } from '@liesmich/core';
import { TreeWalker } from '@liesmich/tree-walker';
import { resolve } from 'path';
import { read } from 'to-vfile';
import { FrozenProcessor } from 'unified';
import { Data, Node, Parent } from 'unist';
import { VFile } from 'vfile';

export type PluginData = { path: string };
export type HandlerMethods = Pick<FrozenProcessor, 'parse' | 'run'>;
export class TemplateTreeWalker extends TreeWalker {
    constructor(public readonly handler: HandlerMethods, public readonly cwd: string) {
        super();
    }

    public filter(parent: Parent<Node<Data>, Data> | false, node: LiesmichLiteral<PluginData>, idx: number): boolean {
        return node.type === 'liesmich' && node?.host === 'template';
    }

    public async handle(parent: Parent<Node<Data>, Data> | false, node: LiesmichLiteral<PluginData>, idx: number): Promise<boolean> {
        if (parent === false) {
            throw new Error('Parent must exist');
        }
        if (node?.query?.path == undefined) {
            throw new Error('No path defined');
        }
        const path: string = node.query.path;
        const importFile: VFile = await this.loadFile(path);
        const parsedTree: Parent = (await this.handler.run(this.handler.parse(importFile), importFile)) as Parent;
        parent.children.splice(idx, 1, ...parsedTree.children);
        return false;
    }

    public async loadFile(path: string): Promise<VFile> {
        const resolvedPath: string = resolve(this.cwd, path);
        const sourceFile: VFile = await read(resolvedPath);
        // sourceFile.path = resolvedPath;
        return sourceFile;
    }
}
