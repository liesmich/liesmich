/*!
 * Source https://github.com/liesmich/liesmich Package: block
 */

import { parse, ParsedDocument } from '@liesmich/parser';
import { promises as fsp, Dirent } from 'fs';
import { resolve } from 'path';

export class BlockEntry {
    private constructor(public readonly filepath: string, doc: ParsedDocument) {

    }

    public static async fromFile(path: string | Dirent): Promise<BlockEntry> {
        const resolvedPath: string = resolve((typeof path === 'string' ? path : path.name));
        const fileContent: string = await fsp.readFile(resolvedPath, { encoding: 'utf-8' });
        const da: ParsedDocument = parse(fileContent);
        return new BlockEntry(resolvedPath, da);
    }
}
