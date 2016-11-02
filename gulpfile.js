var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function () {
    return gulp.src(['css/main.less' ])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('serve', ['less'], function () {
     browserSync.init({
        server: {
            baseDir: ""
        }
    });

    gulp.watch("css/*.less", ['less']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("**/*.js").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);