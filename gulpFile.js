const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const config = require('./server/config.js')

gulp.task('sass', () => {
  gulp.src(`./${config.staticAssets.path}scss/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./hosted/css/'));
});

gulp.task('lint', () => {
  return gulp.src(['./server/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js', () => {
  gulp.src(`./${config.staticAssets.path}js/*.js`)
    .pipe(babel({
      presets: ['env', 'react'],
    }))
    .pipe(gulp.dest('./hosted/js/'));
});

gulp.task('build', () => {
  gulp.start('sass');
  gulp.start('js');
  gulp.start('lint');
});

gulp.task('watch', () => {
  gulp.watch(`./${config.staticAssets.path}scss/main.scss`, ['sass']);
  gulp.watch(`./${config.staticAssets.path}js/*.js`, ['js']);
  
  nodemon({
    script: './server/app.js',
    ext: '.js',
    tasks: ['lint'],
  });
});

gulp.task('watch-sass', () => {
  gulp.watch(`./${config.staticAssets.path}scss/main.scss`, ['sass']);
});

gulp.task('watch-js', () => {
  gulp.watch(`./${config.staticAssets.path}js/*.js`, ['js']);
});

