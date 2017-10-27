'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const rigger = require('gulp-rigger');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const lec = require('gulp-line-ending-corrector');

// sass
gulp.task('sass', function() {
  return (gulp
      .src('./app/styles/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .on('error', notify.onError())
      //.pipe(concat('main.css'))
      .pipe(
        autoprefixer({
          browsers: ['> 1%'],
          cascade: false
        })
      )
      .pipe(sourcemaps.write())
      .pipe(lec({ eolc: 'CRLF' }))
      .pipe(gulp.dest('./public/css')) );
});

// clean production directory
gulp.task('clean', function() {
  return del('public');
});

// html rigger
gulp.task('rigger', function() {
  return (gulp
      .src('./app/pages/**/*.html')
      //.pipe(debug({title: 'RIGGER'}))
      .pipe(rigger())
      .pipe(gulp.dest('./public')) );
});

// assets parse (fonts, img etc.)
gulp.task('assets', function() {
  return gulp
    .src('./app/assets/**', {
      since: gulp.lastRun('assets')
    })
    .pipe(
      debug({
        title: 'assets'
      })
    )
    .pipe(gulp.dest('./public/'));
});

// components parse (jquery, bootstrap etc.)
gulp.task('components', function() {
  return gulp
    .src('./app/assets/components/**', {
      since: gulp.lastRun('components')
    })
    .pipe(gulp.dest('./public/components'));
});

// build itself
gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'assets'), 'rigger'));

// browser-sync
gulp.task('server', function() {
  browserSync.init({
    server: 'public'
  });

  browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

// watcher
gulp.task('watch', function() {
  gulp.watch('./app/styles/**/*.*', gulp.series('sass'));
  gulp.watch('./app/assets/**/*.*', gulp.series('assets'));
  gulp.watch('./app/pages/**/*.html', gulp.series('rigger'));
});

// main task
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));
