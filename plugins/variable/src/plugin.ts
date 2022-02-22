/*
 * Package @liesmich/plugin-variable
 * Source https://liesmich.github.io/liesmich/
 */

import { getProperty } from 'dot-prop';
import { read } from 'to-vfile';
import { findUpOne } from 'vfile-find-up';
import { LiesmichTreeWalker } from './walk-tree';
import type { Plugin as UnifiedPlugin, Transformer } from 'unified';
import type { Node, Parent } from 'unist';
import type { VFile } from 'vfile';

type BaseRecord = Record<string, unknown>;

/**
 * Remark Plugin for inline template variables
 *
 * @param options
 * @param options.data data to inline
 * @returns Plugin
 */
export const plugin: UnifiedPlugin = function plugin(options: object): Transformer {
    /**
     * @param baseData
     * @param source
     */
    async function populateData(baseData: BaseRecord, source: VFile): Promise<BaseRecord> {
        const file: VFile | undefined = await findUpOne('package.json', source.path);
        if (file) {
            const loadedSourceFile: VFile = await read(file);
            const parsed: Record<string, unknown> = JSON.parse(loadedSourceFile.toString('utf-8')) as Record<string, unknown>;
            return Object.assign({}, baseData, { pkg: parsed });
        }
        throw new Error(`No 'package.json' was found`);
    }
    return async (node: Node | Parent, file: VFile): Promise<Node> => {
        const data: BaseRecord = await populateData(this.data(), file);
        const treeWalker: LiesmichTreeWalker = new LiesmichTreeWalker((key: string): unknown => {
            return getProperty(data, key);
        });
        await treeWalker.walk(node);
        return node;
    };
};
