var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

gulp.task('less', function () {
    return gulp.src(['./app/assets/css/main.less' ])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

var tsProject = ts.createProject('app/src/tsconfig.json');

gulp.task('scripts', function() {
    var tsResult = tsProject.src()
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest('./app/dist'));
});

gulp.task('serve', ['less', 'scripts'], function () {
     browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
     
	gulp.watch("app/**/*.less").on('change', function(event){
         gulp.src(['./app/assets/css/main.less'])
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function(error){
				//console.log(error);
				console.log('Erro no arquivo '+  event.path);
				console.log('Verifique a linha ' + error.line +', caractere '+ error.index);
			}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(browserSync.stream({ match: '**/*.css' }));		
	});



    gulp.watch("app/**/*.html").on('change', browserSync.reload);
    gulp.watch("app/**/*.ts", ['scripts']);
    gulp.watch("app/**/*.js").on('change', browserSync.reload);
    
});

gulp.task('default', ['serve']);