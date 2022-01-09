/*
 * Package @liesmich/cli
 * Source https://liesmich.github.io/liesmich/
 */


import { parse, ParsedDocument } from '@liesmich/parser';
import { promises as fsp } from 'fs';
import gulp from 'gulp';
import { from, map, mergeMap, Observable } from 'rxjs';
// tslint:disable-next-line:only-arrow-functions
/**
 * @param cb
 */
function defaultTask(cb: (...args: any[]) => any): void {
    // place code for your default task here
    cb();
}

exports.default = gulp.series(defaultTask,
    // tslint:disable-next-line:only-arrow-functions
    function asdf(): NodeJS.ReadWriteStream {
        return gulp.src('src/*.ts')
            .pipe(gulp.dest('output/'));
    },
    // tslint:disable-next-line:only-arrow-functions
    function bse(): Observable<any> {
        return from(fsp.readdir('./input'))
            .pipe(mergeMap((items: string[]): Observable<string> => {
                return from(items);
            }),
                map((kk: string): ParsedDocument<unknown> => {
                    return parse(kk);
                }));
    });
