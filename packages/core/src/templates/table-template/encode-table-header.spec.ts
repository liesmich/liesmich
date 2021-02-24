/*!
 * Source https://github.com/liesmich/liesmich Package: schemas
 */

import { expect } from 'chai';
import 'mocha';
import { encodeTableHeader } from './encode-table-header';
import { ColumnAlignment, ColumnHeader } from './encode-table';

describe('templates/table-template/encode-column-header', (): void => {
    describe('encodeTableHeader', (): void => {
        it('should work line breaks', (): void => {
            expect(encodeTableHeader(['asdf', 'fdsa'], 4))
                .to.deep.equal([
                    '| asdf | fdsa | | |',
                    '| --- | --- | --- | --- |'
                ]);
        });
        it('should align columns', (): void => {
            const columnHeaders: ColumnHeader[] = ['asdf',
                { title: 'second', align: ColumnAlignment.RIGHT },
                { title: '3', align: ColumnAlignment.CENTER },
                { title: 'fourth' }];
            expect(encodeTableHeader(columnHeaders, 4))
                .to.deep.equal([
                    '| asdf | second | 3 | fourth |',
                    '| --- | ---: | :---: | --- |'
                ]);
        });
    });
});
