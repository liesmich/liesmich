/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { IConfig } from '../config';

export interface IBaseTemplate<T> {
    encode: (cfg: IConfig, data: T) => string;
}
