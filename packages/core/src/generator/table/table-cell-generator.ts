/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { Parent } from 'unist';
import { AbstractGenerator } from '../abstract-generator';
import { GeneratorHandler } from '../generator-handler';
import { TextGenerator } from '../text';

export type TableCell = Parent & { type: 'tableCell' };
export interface ITableCellSettings {
    text: string | null;
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
