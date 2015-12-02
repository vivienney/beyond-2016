'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var autoprefixer = require('gulp-autoprefixer');


var jsOpt = {
  src: './src/js/main.js',
  dest: './dist/js',
}

var sassOpt = {
  src: './src/scss/**/*.scss',
  dest: './dist/css'
}

gulp.task('moveHTML', function() {
  gulp.src('./src/*.html')
  .pipe(gulp.dest('./dist'))
});

gulp.task('moveFonts', function() {
  gulp.src('./src/fonts/**')
  .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('watchHTML', ['moveHTML'], browserSync.reload);

gulp.task('moveImages', function() {
  gulp.src('./src/images/**')
  .pipe(gulp.dest('./dist/images'))
});


function buildScript(watch) {
  var props = {
    entries: [jsOpt.src],
    debug : true
  };

  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.transform('babelify', {presets: ['es2015']}).bundle();
    return stream
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(jsOpt.dest))
      // If you also want to uglify it
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
      .pipe(browserSync.stream())
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
};

gulp.task('js', function() {
  return buildScript(false);
});



gulp.task('sass', function() {
  gulp.src(sassOpt.src)
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest(sassOpt.dest))
  .pipe(browserSync.stream());
});


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
});

gulp.task('deploy', function() {
  gulp.src('./dist/**/*')
  .pipe(ghPages());
});

gulp.task('default', ['browser-sync', 'moveHTML', 'moveImages', 'sass', 'js', 'moveFonts'], function() {
  gulp.watch(sassOpt.src, ['sass']);
  gulp.watch('./src/*.html', ['watchHTML']);
  return buildScript(true);
});