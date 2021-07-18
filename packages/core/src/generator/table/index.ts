/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { Parent } from 'unist';
import { AbstractGenerator } from '../abstract-generator';
import { GeneratorHandler } from '../generator-handler';
import { TextGenerator } from '../text';

export type ColumnAlignment = 'left' | 'right' | 'center' | null
export interface ITableSettings {
    align: ColumnAlignment[] | ColumnAlignment,
    header: string[],
    rows: string[][],
}
export type TableCell = Parent & { type: 'tableCell' }
export type TableRow = Parent & { children: TableCell[], type: 'tableRow' }
export type Table = Parent & {
    align: ('left' | 'right' | 'center' | null)[],
    children: TableRow[],
    type: 'table',
};
interface ITableRowSettings {
    columns: number;
    cells: ITableCellSettings[];
}
interface ITableCellSettings {
    text: string | null,
}
export class TableCellGenerator extends AbstractGenerator<'tableCell', ITableCellSettings> {
    public constructor(genHandler: GeneratorHandler) {
        super('tableCell', genHandler);
    }
    public async generate(image: ITableCellSettings): Promise<TableCell> {
        const cellsGenerator: TextGenerator = this.genHandler.get('text');
        return {
            children: [
                await cellsGenerator.generate({
                    value: image.text,
                }),
            ],
            type: 'tableCell',
        };
    }
}
export class TableRowGenerator extends AbstractGenerator<'tableRow', ITableRowSettings> {
    public constructor(genHandler: GeneratorHandler) {
        super('tableRow', genHandler);
    }
    public async generate(image: ITableRowSettings): Promise<TableRow> {
        const cellsGenerator: TableCellGenerator = this.genHandler.get('tableCell');
        const cells: TableCell[] = new Array(image.columns);
        for (let i: number = 0; i < image.columns; i++) {
            if (i < image.cells.length) {
                cells[i] = await cellsGenerator.generate(image.cells[i]);
            } else {

            }
        }
        return {
            children: cells,
            type: 'tableRow',
        };
    }
}

export class TableGenerator extends AbstractGenerator<'table', ITableSettings> {
    public constructor(genHandler: GeneratorHandler) {
        super('table', genHandler);
        genHandler.register(TableRowGenerator);
        genHandler.register(TableCellGenerator);
    }
    private convertAlignment(alignment: ColumnAlignment | ColumnAlignment[], columns: number): ColumnAlignment[] {
        const items: ColumnAlignment[] = new Array(columns);
        if (Array.isArray(alignment)) {
            for (let i: number = 0; i < columns; i++) {
                items[i] = i >= alignment.length ? null : alignment[i];
            }
            return items;
        } else {
            return items.fill(alignment);
        }
    }

    public async generate(image: ITableSettings): Promise<Table> {
        const rowGenerator: TableRowGenerator = this.genHandler.get('tableRow');
        // const numRows: number = image.rows.length + 1;
        const columns: number = Math.max(image.header.length,
            image.rows.reduce((old: number, cur: string[]): number => {
                return Math.max(old, cur.length);
            }, 0));
        const alignments: ColumnAlignment[] = this.convertAlignment(image.align, columns);
        console.log("JJJJ", alignments);
        let rows: Promise<TableRow>[] = [];
        const headerCells: ITableCellSettings[] = image.header.map((cellValue: string): ITableCellSettings => {
            return {
                text: cellValue,
            };
        });
        rows.push(rowGenerator.generate({ cells: headerCells, columns }))
        rows = rows.concat(image.rows
            .map((values: string[]): Promise<TableRow> => {
                const cells: ITableCellSettings[] = values.map((cellValue: string): ITableCellSettings => {
                    return {
                        text: cellValue,
                    };
                });
                return rowGenerator.generate({ cells, columns })
            }))
        return {
            align: alignments,
            children: await Promise.all(rows),
            type: 'table',
        };
    }
}
