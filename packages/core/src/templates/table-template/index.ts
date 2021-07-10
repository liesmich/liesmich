/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { IBaseTemplate } from './../base-template';
import { encodeTable, ITableTemplate } from './encode-table';

export default {
    encode: encodeTable,
} as IBaseTemplate<ITableTemplate>;
