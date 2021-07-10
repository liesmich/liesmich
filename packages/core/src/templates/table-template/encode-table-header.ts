/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { encodeRow } from './encode-row';
import { ColumnAlignment, ColumnHeader } from './encode-table';

export const encodeTableHeader = (headers: ColumnHeader[], colums: number): string[] => {
    const titles: string[] = headers.map((col: ColumnHeader): string => {
        return (typeof col === 'string') ? col : col.title;
    });
    const seperators: string[] = headers.map((col: ColumnHeader): string => {
        if (typeof col === 'string') {
            return '---';
        }
        switch (col?.align) {
            case ColumnAlignment.CENTER:
                return ':---:';
            case ColumnAlignment.RIGHT:
                return '---:';
            default:
                return '---';
        }
    });
    const titleRow: string = encodeRow(titles, colums);
    const seperatorRow: string = encodeRow(seperators, colums, '---');
    return [titleRow, seperatorRow];
};
