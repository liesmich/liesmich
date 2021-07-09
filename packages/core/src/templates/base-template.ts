import { IConfig } from '../config';

export interface IBaseTemplate<T> {
    encode: (cfg: IConfig, data: T) => string;
}
