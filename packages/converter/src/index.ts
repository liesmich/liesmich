/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { dest, series, src } from 'gulp';
import { of, Observable } from 'rxjs';
// tslint:disable-next-line:only-arrow-functions
function defaultTask(cb: (...args: any[]) => any): void {
    // place code for your default task here
    cb();
}

exports.default = series(defaultTask,
    // tslint:disable-next-line:only-arrow-functions
    function asdf(): NodeJS.ReadWriteStream {
        return src('src/*.ts')
            .pipe(dest('output/'));
    },
    // tslint:disable-next-line:only-arrow-functions
    function bse(): Observable<number> {
        return of(1, 2, 3);
    });
