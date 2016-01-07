var gulp = require('gulp'),
    notify = require('gulp-notify'),
    del = require('del'),
    babel = require('gulp-babel'),
    browserify = require("gulp-browserify");

gulp.task('scripts', function() {
  return gulp.src('./pulsey.js')
  .pipe(babel({ presets: ['es2015', 'react'] }))
  .pipe(browserify())
  .pipe(gulp.dest('dist'))
  .pipe(notify({ message: 'Scripts task complete' }))
});

gulp.task('styles', function() {
  return gulp.src('./pulsey.css')
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('views', function() {
  return gulp.src('./pulsey.html')
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Views task complete' }))
});

gulp.task('clean', function(cb) {
    del(['dist'], cb)
});

gulp.task('build', ['clean', 'scripts', 'styles', 'views']);


gulp.task('watch', function() {
  gulp.watch('./*', ['scripts', 'styles', 'views']);
});

gulp.task('default', ['build', 'watch']);
