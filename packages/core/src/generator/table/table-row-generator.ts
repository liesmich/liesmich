/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { Parent } from 'unist';
import { AbstractGenerator } from '../abstract-generator';
import { GeneratorHandler } from '../generator-handler';
import { ITableCellSettings, TableCell, TableCellGenerator } from './table-cell-generator';

interface ITableRowSettings {
    columns: number;
    cells: ITableCellSettings[];
}
export type TableRow = Parent & { children: TableCell[], type: 'tableRow' };
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
