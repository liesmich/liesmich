/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import { encodeRow } from './encode-row';

describe('templates/table-template/encode-row', (): void => {
    describe('encodeRow', (): void => {
        it('should encode simple table', (): void => {
            expect(encodeRow(['asdf', 'fdsa'], 4))
                .to.equal('| asdf | fdsa | | |');
        });
        it('should work with line breaks', (): void => {
            expect(encodeRow(['asdf', 'fdsa\r\ndata'], 4))
                .to.equal('| asdf | fdsa<br>data | | |');
        });
        it('should encode booleans', (): void => {
            expect(encodeRow(['asdf', true], 4))
                .to.equal('| asdf | true | | |');
        });
    });
});
