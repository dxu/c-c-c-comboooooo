const gulp = require('gulp')
  , sourcemaps = require('gulp-sourcemaps')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , plumber = require('gulp-plumber')
  , browserify = require('browserify')
  , util = require('gulp-util')
  , watchify = require('watchify')
  , babelify = require('babelify')
  , shell = require('gulp-shell');


function compile(watch) {
  const bundler =
    watchify(
      browserify('./src/index.js', { debug: true })
        // for es6 module support
        .add(require.resolve('babelify/polyfill'))
        .transform(babelify)
    )

  function rebundle() {
    bundler.bundle()
      .on('error', util.log.bind(util, 'Browserify Error'))
      .pipe(plumber())
      .pipe(source('c-c-c-combo.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'))
  }

  rebundle()

  if (watch) {
    bundler.on('update', function() {
      console.log('*** Changes detected! Rebundling...');
      rebundle();
    });
  }
}

gulp.task('default', function() {
  compile(true)
});

gulp.task('test', shell.task([
  'npm test'
]))
