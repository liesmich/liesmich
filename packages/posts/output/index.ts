/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import gulp from 'gulp';
import { of, Observable } from 'rxjs';
// tslint:disable-next-line:only-arrow-functions
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
    function bse(): Observable<number> {
        console.log("AAAA", arguments);
        return of(1, 2, 3);
    });
