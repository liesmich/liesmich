/*
 * Package @liesmich/block
 * Source https://liesmich.github.io/liesmich/
 */

import { promises as fsp, Dirent } from 'fs';
import { BlockEntry } from './block-entry';

export class Block {
    private constructor(public readonly entries: BlockEntry) {}

    public static async parseBlockEntry(path: Dirent): Promise<Block> {
        const dirs: Dirent[] = await fsp.readdir(path.name, { withFileTypes: true });
        for (const f of dirs) {
            if (!f.isFile()) {
                continue;
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return new Block(dirs as any);
    }
    public static async parseEntry(path: string): Promise<Block> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const block: Block = new Block(undefined as any);
        const dirEntries: Dirent[] = await fsp.readdir(path, { withFileTypes: true });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return [block, dirEntries] as any;
    }
}
