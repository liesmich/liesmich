/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import { calculateColumnWidths } from './column-widths';

describe('templates/table-template/column-width', (): void => {
    describe('calculateColumnWidths', (): void => {
        it('should calculate for fully populated array', (): void => {
            expect(calculateColumnWidths({
                headers: ['title', 'yes'],
                rows: [
                    ['a', 'b'],
                    ['asdf', 'longest'],
                ],
            }), 'schema should not be valid')
                .to.deep.equal([5, 7]);
        });
        it('should expand empty rows', (): void => {
            expect(calculateColumnWidths({
                headers: ['title', 'yes'],
                rows: [
                    ['a', 'b', 'asdf'],
                    ['asdf', 'longest', 'bc', 'asdf123'],
                ],
            }), 'schema should not be valid')
                .to.deep.equal([5, 7, 4, 7]);
        });
        it('should honor header objects', (): void => {
            expect(calculateColumnWidths({
                headers: ['title', { title: 'this is a long title' }],
                rows: [
                    ['a', 'b', 'asdf'],
                    ['asdf', 'longest', 'bc', 'asdf123'],
                ],
            }), 'schema should not be valid')
                .to.deep.equal([5, 20, 4, 7]);
        });
    });
});
