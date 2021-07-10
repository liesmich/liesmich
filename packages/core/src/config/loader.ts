/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import deepmerge from 'deepmerge';
import { readFile } from 'fs/promises';
import { dirname, relative, resolve } from 'path';
import { IConfig } from '../config';
import { IConfigFile } from '../merge-config';

export class CircularExtensionError extends Error {
    public constructor(visitedPath: string[], currentPath: string) {
        super(`Circular extension of config files detected with file ${currentPath}`);
        this.name = 'CircularExtensionError';
    }
}
export const loadConfigInternal: (path: string,
    visitedPath: string[],
    visited: Map<string, true>) => Promise<IConfigFile> =
    async (path: string, visitedPath: string[], visited: Map<string, true>): Promise<IConfigFile> => {
        const normalizedPath: string = resolve(path);
        if (visitedPath.includes(normalizedPath)) {
            throw new CircularExtensionError(visitedPath, path);
        }
        visitedPath.push(normalizedPath);
        visited.set(normalizedPath, true);
        const baseDir: string = dirname(normalizedPath);
        const fileContent: string = await readFile(normalizedPath, 'utf-8');
        const parsedFileContent: IConfigFile = JSON.parse(fileContent);
        if (Array.isArray(parsedFileContent.extends)) {
            const parsedExtendedFiles: IConfigFile[] = await Promise.all(parsedFileContent.extends
                .map((extendFile: string): Promise<IConfigFile> => {
                    return loadConfigInternal(resolve(baseDir, extendFile), visitedPath, visited);
                }));
            const mergedConfigs: IConfigFile = parsedExtendedFiles
                .reduce((prev: IConfigFile, cur: IConfigFile, idx: number): IConfigFile => {
                    return deepmerge(prev, cur);
                });
            const mergedConfig: IConfig = deepmerge(mergedConfigs, parsedFileContent);
            visitedPath.pop();
            return mergedConfig;
        } else if (typeof parsedFileContent.extends === 'string') {
            const loadedConfig: IConfigFile = await loadConfigInternal(resolve(baseDir, parsedFileContent.extends),
                visitedPath,
                visited);
            const mergedConfig: IConfig = deepmerge(loadedConfig, parsedFileContent);
            visitedPath.pop();
            return mergedConfig;
        }
        visitedPath.pop();
        return parsedFileContent;
    };

export const loadConfig: (path: string, cwd?: string) => Promise<IConfigFile> =
    async (path: string, cwd?: string): Promise<IConfigFile> => {
        const visitedPath: string[] = [];
        const visited: Map<string, true> = new Map();
        const startConfigFile: string = cwd ? resolve(cwd, path) : path;
        const cfg: IConfigFile = await loadConfigInternal(startConfigFile, visitedPath, visited);
        cfg.extends = Array.from(visited.keys())
            .map((localPath: string): string => {
                return relative(cwd ? cwd : process.cwd(), localPath);
            });
        return cfg;
    };
