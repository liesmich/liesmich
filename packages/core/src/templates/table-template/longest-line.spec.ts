/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import { calculateLongestLine } from './longest-line';

describe('templates/table-template/longest-line', (): void => {
    describe('calculateLongestLine', (): void => {
        it('should work without line breaks', (): void => {
            expect(calculateLongestLine('asdf'), 'schema should not be valid')
                .to.equal(4);
        });
        it('should work with consecutive new lines', (): void => {
            expect(calculateLongestLine('asdf\r\n\r\n12345'), 'schema should not be valid')
                .to.equal(5);
        });
        it('should work with \\r new lines', (): void => {
            expect(calculateLongestLine('asdf\r123456\rasdfasdf'), 'schema should not be valid')
                .to.equal(8);
        });
        it('should work with \\n new lines', (): void => {
            expect(calculateLongestLine('asdf\n123\n456'), 'schema should not be valid')
                .to.equal(4);
        });
        it('should work with mixed new lines', (): void => {
            expect(calculateLongestLine('asdf\n12345\r456asdf'), 'schema should not be valid')
                .to.equal(7);
        });
    });
});
