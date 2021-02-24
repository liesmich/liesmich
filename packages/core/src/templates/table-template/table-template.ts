import { IConfig } from "../../config";
import { BaseTemplate } from "../base-template";
import { calculateColumnCount } from "./column-count";
import { encodeRow } from "./encode-row";
import { encodeTableHeader } from "./encode-table-header";
export enum ColumnAlignment {
    CENTER = 'center',
    RIGHT = 'right',
    LEFT = 'left'
}
export type ColumnHeader = (string | { title: string, align?: ColumnAlignment });
export interface ITableTemplate extends BaseTemplate {
    headers: ColumnHeader[];
    rows: (string | number)[][];
}

export const createTable: (cfg: IConfig, data) => string = (cfg: IConfig, data: ITableTemplate): string => {
    const columnCount: number = calculateColumnCount(data);
    const encodedRows: string[] = encodeTableHeader(data.headers, columnCount);
    data.rows
        .forEach((row: string[]): void => {
            encodedRows.push(encodeRow(row, columnCount));
        });
    return encodedRows.join(cfg.lineBreak);
}
