/*
 * Package @liesmich/block-loader
 * Source https://liesmich.github.io/liesmich/
 */

import { parse, ParsedDocument } from '@liesmich/parser';

export const loader = (data: string): string => {
    const doc: ParsedDocument = parse(data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    return JSON.stringify(doc);
};
