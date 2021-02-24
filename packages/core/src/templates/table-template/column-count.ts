import { ITableTemplate } from "./table-template";
export const calculateColumnCount: (table: ITableTemplate) => number = (table: ITableTemplate): number => {
    return table.rows
        .reduce((prev: number, row: string[]): number => {
            return Math.max(prev, row.length);
        }, table.headers.length);
};
