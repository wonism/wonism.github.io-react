const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const version = require('gulp-version-number');
const path = require('path');

const paths = {
  js: './assets/js/**/*.js',
  sass: './assets/css/**/*.scss',
  dev: './dev/public/dist/',
  dist: './public/dist/'
};

const versionConfig = {
  value: '%MDS%',
  append: {
    key: 'v',
    to: ['css'],
  },
};

let js = 'js';
let css = 'css';

if (process.env.NODE_ENV === 'development') {
  js += '-sm';
  css += '-sm';
}

// eslint
gulp.task('lint', () => {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// transpile & minify js
gulp.task('js', () => {
  return gulp.src(paths.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist + 'js'));
});

// compile scss
gulp.task('css', () => {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist + 'css'));
});

// transpile with sourcemaps for dev-server
gulp.task('js-sm', () => {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dev + 'js'));
});

// compile with sourcemaps for dev-server
gulp.task('css-sm', () => {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dev + 'css'));
});

// Append versioning code in HTML
gulp.task('html', function(){
  return gulp.src(path.join(__dirname, 'index.html'))
    .pipe(version(versionConfig))
    .pipe(gulp.dest(__dirname));
});

// watching
gulp.task('watch', () => {
  gulp.watch(paths.js, [js, 'lint']);
  gulp.watch(paths.sass, [css]);
});

// gulp default
gulp.task('default', [js, css, 'html']);

