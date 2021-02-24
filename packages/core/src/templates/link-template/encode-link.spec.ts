/*!
 * Source https://github.com/liesmich/liesmich Package: schemas
 */

import { expect } from 'chai';
import 'mocha';
import { encodeLink } from './encode-link';

describe('templates/link-template/encode-link', (): void => {
    describe('encodeLink', (): void => {
        it('should create image without title attribute', (): void => {
            expect(encodeLink(undefined as any, {
                inline: '"ooh yes',
                url: 'https://github.com'
            }))
                .to.equal('["ooh yes](https://github.com)');
        });
        it('should create image with title attribute', (): void => {
            expect(encodeLink(undefined as any, {
                inline: '"ooh yes',
                title: 'any title',
                url: 'https://github.com'
            }))
                .to.equal('["ooh yes](https://github.com "any title")');
        });
    });
});
