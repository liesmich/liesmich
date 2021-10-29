/*
 * Package @liesmich/block
 * Source https://liesmich.github.io/liesmich/
 */

import { BlockEntry } from './block-entry';

export class Block {
    private constructor(public readonly entries: BlockEntry) {}

    public static async parseEntry(path: string): Promise<Block> {
        const block: Block = new Block(await BlockEntry.fromFile(path));
        return block;
    }
}
