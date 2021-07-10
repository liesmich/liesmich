/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { expect } from 'chai';
import 'mocha';
import { encodeImage } from './encode-image';

describe('templates/image-template/encode-image', (): void => {
    describe('encodeImage', (): void => {
        it('should create image without title attribute', (): void => {
            expect(encodeImage(undefined as any, {
                alt: '"ooh yes',
                src: 'https://github.com',
            }))
                .to.equal('![%22ooh%20yes](https://github.com)');
        });
        it('should create image with title attribute', (): void => {
            expect(encodeImage(undefined as any, {
                alt: 'alt',
                src: 'https://github.com',
                title: 'This is a great title',
            }))
                .to.equal('![alt](https://github.com "This%20is%20a%20great%20title")');
        });
    });
});
