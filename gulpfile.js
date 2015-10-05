const gulp = require('gulp')
  , babel = require('gulp-babel')
  , concat = require('gulp-concat')
  , sourcemaps = require('gulp-sourcemaps')
  , watch = require('gulp-watch');

gulp.task('default', function() {
  watch('src/**/*.js', function() {
    gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('c-c-c-combo.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
  });
});
