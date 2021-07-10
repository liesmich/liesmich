/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { CellValue } from './encode-table';

export const encodeRow = (items: CellValue[], colums: number, defaultValue?: CellValue): string => {
    let out: string = '|';
    for (let i: number = 0; i < colums; i++) {
        const value: CellValue = items[i] ? items[i] : defaultValue;
        if (value) {
            if (typeof value === 'number') {
                out += ` ${value}`;
            } else if (typeof value === 'boolean') {
                out += ` ${value ? 'true' : 'false'}`;
            } else {
                out += ` ${value.split(/\r\n/).join('<br>').split(/(\r|\n)/).join('<br>')}`;
            }
        }
        out += ' |';
    }
    return out;
};
