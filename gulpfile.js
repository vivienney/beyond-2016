'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var neat = require('node-neat').includePaths;


var jsOpt = {
  src: './src/js/main.js',
  dest: './dist/js/bundle.js',
}

var sassOpt = {
  src: './src/scss/**/*.scss',
  dest: './dest/css'
}

gulp.task('moveHTML', function() {
  gulp.src('./src/*.html')
  .pipe(gulp.dest('./dest'))
});

gulp.task('moveImages', function() {
  gulp.src('./src/images/**')
  .pipe(gulp.dest('./dest/images'))
});


gulp.task('js', function() {

});



gulp.task('sass', function() {
  gulp.src(sassOpt.src)
  .pipe(sass({
    includePaths: ['sass'].concat(neat)
  }).on('error', sass.logError))
  .pipe(gulp.dest(sassOpt.dest))
});


gulp.task('browser-sync', function() {
  var config = {
    server: {
      baseDir: '.'
    },
    startPath: '/dist/index.html',
    ghostMode: false
  };

  browserSync({
    // we need to disable clicks and forms for when we test multiple rooms
    server : {},
    middleware : [ historyApiFallback() ],
    ghostMode: false
  });
});

gulp.task('default', ['moveHTML', 'moveImages']);