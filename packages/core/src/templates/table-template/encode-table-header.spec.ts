/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import { ColumnAlignment, ColumnHeader } from './encode-table';
import { encodeTableHeader } from './encode-table-header';

describe('templates/table-template/encode-column-header', (): void => {
    describe('encodeTableHeader', (): void => {
        it('should work line breaks', (): void => {
            expect(encodeTableHeader(['asdf', 'fdsa'], 4))
                .to.deep.equal([
                    '| asdf | fdsa | | |',
                    '| --- | --- | --- | --- |',
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
                    '| --- | ---: | :---: | --- |',
                ]);
        });
    });
});
