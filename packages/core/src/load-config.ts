import deepmerge from 'deepmerge';
import { promises as fsp } from 'fs';
import { dirname, isAbsolute, resolve } from 'path';
interface IConfig {
    name: string;
}

interface IConfigFile extends IConfig {
    extends: string[];
}
const loadConfigFromFile: (filepath: string) => Promise<IConfigFile> = async (filepath: string): Promise<IConfigFile> => {
    if (filepath.endsWith('.js')) {
        return Promise.resolve(require(filepath));
    } else {
        return fsp.readFile(filepath, 'utf-8')
            .then((filecontent: string): IConfigFile => {
                return JSON.parse(filecontent);
            });
    }
};
const mergeConfig = (cfg1: IConfigFile, cfg2: IConfigFile): IConfigFile => {
    return deepmerge(cfg1, cfg2);
};

const parseConfig = async (filepath: string): Promise<IConfigFile> => {
    if (!isAbsolute(filepath)) {
        throw new Error('Must be absolute path');
    }
    const cfg: IConfigFile = await loadConfigFromFile(filepath);
    if (cfg?.extends.length > 0) {
        cfg.extends = cfg.extends.map((fp: string): string => {
            return resolve(dirname(filepath), fp);
        });

        const configs: IConfigFile[] = await Promise
            .all(cfg.extends.map((fp: string): Promise<IConfigFile> => parseConfig(fp)));
        return configs
            .reduce((prev: IConfigFile, cur: IConfigFile): IConfigFile => {
                if (prev) {
                    return mergeConfig(prev, cur);
                } else {
                    return cur;
                }
            });
    } else {
        return cfg;
    }
};
