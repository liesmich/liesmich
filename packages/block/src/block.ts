/*!
 * Source https://github.com/liesmich/liesmich Package: block
 */

import { promises as fsp, Dirent } from 'fs';
import { BlockEntry } from './block-entry';

export class Block {

    private constructor(public readonly entries: BlockEntry) {

    }

    public static async parseBlockEntry(path: Dirent): Promise<Block> {
        const dirs: Dirent[] = await fsp.readdir(path.name, { withFileTypes: true });
        for (const f of dirs) {
            if (!f.isFile()) {
                continue;
            }

        }
        return new Block(dirs as any);
    }
    public static async parseEntry(path: string): Promise<Block> {
        const block: Block = new Block(undefined as any);
        const dirEntries: Dirent[] = await fsp.readdir(path, { withFileTypes: true });
        return [block, dirEntries] as any;
    }

}
