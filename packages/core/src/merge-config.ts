/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import deepmerge from 'deepmerge';
import { IConfig } from './config';
export interface IConfigFile extends IConfig {
    extends?: string[];
}

const removeDuplicate: <T>(arr1: T[], arr2: T[]) => T[] = <T>(arr1: T[], arr2: T[]): T[] => {
    const copy: T[] = JSON.parse(JSON.stringify(arr1));
    arr2.forEach((item: T): void => {
        const idx: number = arr1.indexOf(item);
        if (!(idx >= 0)) {
            copy.push(item);
        }
    });
    return copy;
};
export const mergeConfig = (cfg1: IConfigFile, cfg2: IConfigFile): IConfigFile => {
    return deepmerge(cfg1, cfg2, {
        customMerge: (key: string): any => {
            if (key === 'extends') {
                return removeDuplicate as any;
            }
        },
    });
};
