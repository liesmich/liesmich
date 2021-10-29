/*
 * Package @liesmich/block
 * Source https://liesmich.github.io/liesmich/
 */

import { parse, ParsedDocument } from '@liesmich/parser';
import { promises as fsp, Dirent } from 'fs';
import { resolve } from 'path';

export class BlockEntryGroup {
    private constructor(public readonly filepath: string, doc: ParsedDocument) {}

    public static async fromDir(path: string | Dirent): Promise<BlockEntryGroup> {
        const resolvedPath: string = resolve(typeof path === 'string' ? path : path.name);
        const fileContent: Dirent[] = await fsp.readdir(resolvedPath, { withFileTypes: true });
        const da: ParsedDocument = parse(fileContent[0].name);
        return new BlockEntryGroup(resolvedPath, da);
    }
}
