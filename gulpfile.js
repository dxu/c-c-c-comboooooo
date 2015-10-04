var gulp = require("gulp"),
  , sourcemaps = require("gulp-sourcemaps"),
  , babel = require("gulp-babel"),
  , concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("c-c-c-combo.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
