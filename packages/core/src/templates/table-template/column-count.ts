/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { ITableTemplate } from './encode-table';

export const calculateColumnCount: (table: ITableTemplate) => number = (table: ITableTemplate): number => {
    return table.rows
        .reduce((prev: number, row: string[]): number => {
            return Math.max(prev, row.length);
        }, table.headers.length);
};
