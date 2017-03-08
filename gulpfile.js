var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var wiredep = require('wiredep').stream;

gulp.task('serve', ['wiredep', 'sass'], function () {
  browserSync.init({
    server: {
      baseDir: 'app',
      index: 'index.html',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch("app/js/*.js").on("change", browserSync.reload);
  gulp.watch("app/*.html").on("change", browserSync.reload);
  gulp.watch("app/sass/*.scss", ['sass'], browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src('./app/sass/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

gulp.task('minificar-imagem', function () {
  return gulp.src('./app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./app/img/'));
});

gulp.task('minificar-css', function () {
  return gulp.src('./app/css/*.css')
    .pipe(cssmin())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./app/build/css/'))
});

gulp.task('minificar-html', function () {
  return gulp.src('./app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./app/build/'))
});

gulp.task('minificar-js', function () {
  return gulp.src('./app/js/*.js')
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./app/build/js/'));
});

gulp.task('criar-pasta', function () {
  return gulp.src('./app/*.html')
  pipe(gulp.dest('!./app/build/'))
});

gulp.task('clean', function () {
  return gulp.src('./app/build/')
    .pipe(clean());
});

gulp.task('wiredep', function (){
  gulp.src('./app/index.html', {base: './app'})
    .pipe(wiredep({
      directory: 'bower_components',
      exclude: ['modernizr']
    }))
    .pipe(gulp.dest('./app/'));
});

gulp.task('build', ['criar-pasta' , 'sass', 'minificar-js', 'minificar-css', 'minificar-html', 'minificar-imagem'], function () {
  return gulp.src(['./app/img', './app/fonts']).pipe(gulp.dest('./app/build/'));
});

gulp.task('default', ['serve'], function () {});
