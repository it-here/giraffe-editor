const gulp = require('gulp');
const less = require('gulp-less');

gulp.task('default', function(done) {
    gulp.src('./src/assets/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist'));
    done();
});