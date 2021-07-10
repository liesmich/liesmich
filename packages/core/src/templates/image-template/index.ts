/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { IBaseTemplate } from './../base-template';
import { encodeImage, IImage } from './encode-image';

export default {
    encode: encodeImage,
} as IBaseTemplate<IImage>;
