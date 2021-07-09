import { IConfig } from '../../config';
import { calculateColumnCount } from './column-count';
import { encodeRow } from './encode-row';
import { encodeTableHeader } from './encode-table-header';
export enum ColumnAlignment {
    CENTER = 'center',
    RIGHT = 'right',
    LEFT = 'left'
}
export type CellValue = string | number | boolean | undefined;
export type ColumnHeader = (string | { title: string, align?: ColumnAlignment });
export interface ITableTemplate {
    headers: ColumnHeader[];
    rows: CellValue[][];
}

export const encodeTable: (cfg: IConfig, data: ITableTemplate) => string = (cfg: IConfig, data: ITableTemplate): string => {
    const columnCount: number = calculateColumnCount(data);
    const encodedRows: string[] = encodeTableHeader(data.headers, columnCount);
    data.rows
        .forEach((row: string[]): void => {
            encodedRows.push(encodeRow(row, columnCount));
        });
    return encodedRows.join(cfg.lineBreak);
}
