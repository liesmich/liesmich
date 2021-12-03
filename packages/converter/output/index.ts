import { dest, series, src } from 'gulp';
import { of } from 'rxjs';
function defaultTask(cb) {
    // place code for your default task here
    cb();
}

exports.default = series(defaultTask, function asdf() {
    return src('src/*.ts')
        .pipe(dest('output/'));
}, function bse() {
    return of(1, 2, 3);
});
