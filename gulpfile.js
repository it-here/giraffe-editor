const gulp = require('gulp');
const react = require('gulp-react');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');

const libConfig = require("./webpack.lib.config.babel");

gulp.task('default', function() {
    gulp.src('./src/Giraffe.jsx')
        .pipe(babel({
            presets:['@babel/env','@babel/react']
        }))
        .pipe(webpack(libConfig)).pipe(gulp.dest('dist'));
});