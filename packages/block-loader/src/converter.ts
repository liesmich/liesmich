/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { parse, ParsedDocument } from '@liesmich/parser';

export const loader = (data: string): string => {
    const doc: ParsedDocument = parse(data);
    return JSON.stringify(doc);
};
