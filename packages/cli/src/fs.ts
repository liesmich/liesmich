/*
 * Package @liesmich/cli
 * Source https://liesmich.github.io/liesmich/
 */


import { promises as fsp, Dirent } from 'fs';
import { from, Observable } from 'rxjs';
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
type ReplaceReturnType<T extends (...a: any) => Promise<any>, R extends Awaited<ReturnType<T>> =
    Awaited<ReturnType<T>>> = (...a: Parameters<T>) => Observable<R>;

const readFile: ReplaceReturnType<typeof fsp['readFile']> = (...args: Parameters<typeof fsp['readFile']>): Observable<Buffer | string> => {
    return from(fsp.readFile(...args));
};

const readdir: ReplaceReturnType<typeof fsp['readdir']> = (...args: Parameters<typeof fsp['readdir']>): Observable<Dirent[]> => {
    return from(fsp.readdir(...args));
};
export {
    readFile,
    readdir,
};
