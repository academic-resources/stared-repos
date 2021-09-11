// Automate builds

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pump = require('pump');
var minify = require('gulp-clean-css');
var size = require('gulp-size');

var vanillaSrc = './src/vanilla/focus.js',
    vanillaDest = './dist/vanilla';

gulp.task('vanilla', ['style'], function(cb) {
    pump([
        gulp.src(vanillaSrc),
        concat('focus.min.js'),
        uglify(),
        gulp.dest(vanillaDest)
    ],
    cb);
});

gulp.task('style', function() {
    return gulp.src([
        './src/styles/focus.css'
    ])
        .pipe(minify())
        .pipe(size())
        .pipe(concat('focus.min.css'))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(gulp.dest('./test/es6'));
});