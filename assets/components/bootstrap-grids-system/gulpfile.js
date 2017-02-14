const gulp = require('gulp'),
	  minifycss = require('gulp-clean-css'),
	  concatcss = require('gulp-concat-css'),
	  clean = require('gulp-clean');

gulp.task('clean-css', () => {
	return gulp.src('bootstrap-grid.min.css')
	.pipe(clean())
});

gulp.task('minify', ['clean-css'], () => {
	return gulp.src('bootstrap-grid.css')
	.pipe(concatcss('bootstrap-grid.min.css'))
	.pipe(minifycss())
	.pipe(gulp.dest(''))
});