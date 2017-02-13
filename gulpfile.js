const gulp = require('gulp'),
	  concatcss = require('gulp-concat-css'),
	  stylus = require('gulp-stylus'),
	  minifycss = require('gulp-clean-css'),
	  clean = require('gulp-clean');


/* === TASK DEFAULT - ATIVA O OBSERVE NOS ARQUIVOS .styl === */
gulp.task('default', () => {
	gulp.watch('assets/stylesheets/**/*.styl', ['styl']);
});


/* === TASK CLEAN_CSS = LIMPA A PASTA dist/css === */
gulp.task('clean-css', () => {
	return gulp.src('dist/stylesheets')
	.pipe(clean());
});

/* === TASK STYL = COMPILA OS ARQUIVOS .styl PARA .css === */
gulp.task('styl', ['clean-css'], () => {
	return gulp.src('assets/stylesheets/main.styl')
	.pipe(stylus({
     	compress: true
     }))
	.pipe(concatcss('all.min.css'))
	.pipe(minifycss())
	.pipe(gulp.dest('dist/stylesheets'));
});
