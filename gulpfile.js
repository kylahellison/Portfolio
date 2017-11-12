"use strict";

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
 concatCSS = require('gulp-concat-css'),
      maps = require('gulp-sourcemaps'),
  cleanCSS = require('gulp-clean-css'),
       del = require('del');


//concatenate JS files
gulp.task('concatScripts', function() {
	return gulp.src([
		'js/jquery-3.2.1.js',
		'js/app.js'
	])
		.pipe(maps.init())
		.pipe(concat('main.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
	return gulp.src('js/main.js')
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('js'))
});





gulp.task('concatCSS', function() {
	return gulp.src([
		'css/normalize.css',
		'css/main.css'
	])
		.pipe(concatCSS('application.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('minify-css', ['concatCSS'], function() {
	return gulp.src('css/application.css')
		.pipe(cleanCSS())
		.pipe(rename('application.min.css'))
		.pipe(gulp.dest('css'))
});



//Sass compiler runs whenever i'm running the watchSass task below
gulp.task('compileSass', function() {
  return gulp.src("sass/main.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'))
});


//////////////////////////////////////////////////
gulp.task('watchFiles', function() {
  gulp.watch('sass/**/*.scss', ['compileSass']);
  gulp.watch('js/app.js', ['concatScripts']);
})

//RUN THIS WHENEVER WORKING ON PROJECT
gulp.task('serve', ['watchFiles']);
//////////////////////////////////////////////////




gulp.task('clean', function() {
  del(['dist', 'css/application*.css*', 'js/main*.js*']);
});


//// BUILD TASK
gulp.task("build", ['minifyScripts', 'minify-css'], function() {
  return gulp.src(["css/application.min.css", "js/main.min.js", 'index.html',
                   "images/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});



/////////////////// Default task

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
