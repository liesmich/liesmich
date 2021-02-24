import { IConfig } from "../../config";
import { BaseTemplate } from "../base-template";
import { calculateColumnCount } from "./column-count";
export enum ColumnAlignment {
    CENTER = 'center',
    RIGHT = 'right',
    LEFT = 'left'
}
export type ColumnHeader = (string | { title: string, align?: ColumnAlignment });
export interface ITableTemplate extends BaseTemplate {
    headers: ColumnHeader[];
    rows: string[][];
}

export const createTable: (cfg: IConfig, data) => string = (cfg: IConfig, data: ITableTemplate): string => {
    const columnCount: number = calculateColumnCount(data);

    return `${columnCount}outdata`;
}
