/*!
 * Source https://github.com/liesmich/liesmich Package: schemas
 */

import { expect } from 'chai';
import 'mocha';
import { encodeTable, ITableTemplate } from './encode-table';

describe('templates/table-template/encode-column-header', (): void => {
    describe('createTable', (): void => {
        it('should work line breaks', (): void => {
            const testData: ITableTemplate = {
                headers: ['asdf'],
                rows: [
                    ['any data', 'second'],
                    [2, 123.45]
                ]
            };
            expect(encodeTable({ lineBreak: '\r\n' } as any, testData))
                .to.deep.equal(
                    '| asdf | |\r\n' +
                    '| --- | --- |\r\n' +
                    '| any data | second |\r\n' +
                    '| 2 | 123.45 |'
                );
        });
    });
});
