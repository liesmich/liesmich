/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { ColumnHeader, ITableTemplate } from './encode-table';
import { calculateLongestLine } from './longest-line';
export const calculateColumnWidths: (table: ITableTemplate) => number[] = (table: ITableTemplate): number[] => {
    const widths: number[] = table.headers
        .map((header: ColumnHeader): number => {
            return calculateLongestLine((typeof header === 'string') ? header : header.title);
        });
    table.rows
        .forEach((row: string[]): void => {
            row.forEach((item: string, column: number): void => {
                if (column >= widths.length) {
                    widths.push(0);
                }
                widths[column] = Math.max(calculateLongestLine(item), widths[column]);
            });
        });
    return widths;
};
