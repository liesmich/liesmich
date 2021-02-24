/*!
 * Source https://github.com/liesmich/liesmich Package: schemas
 */

import { expect } from 'chai';
import 'mocha';
import { encodeColumnHeader } from './encode-column-header';
import { ColumnAlignment, ColumnHeader } from './table-template';

describe('templates/table-template/encode-column-header', (): void => {
    describe('encodeColumnHeader', (): void => {
        it('should work line breaks', (): void => {
            expect(encodeColumnHeader(['asdf', 'fdsa'], 4))
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
            expect(encodeColumnHeader(columnHeaders, 4))
                .to.deep.equal([
                    '| asdf | second | 3 | fourth |',
                    '| --- | ---: | :---: | --- |'
                ]);
        });
    });
});
