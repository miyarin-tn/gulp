const { src, dest, parallel, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function html() {
  return src('pug/**/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('build'))
}

function css() {
  return src('sass/**/*.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('build/css', { sourcemaps: true }))
}

function js() {
  return src('js/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('build/js', { sourcemaps: true }))
}

function bSync() {
  browserSync.init({
    // port: 3000,
    server: {
      baseDir: 'build'
    },
    open: false
  });

  watch('pug/**/*.pug', html);
  watch('sass/**/*.scss', css);
  watch('js/*.js', js);
  watch('build/*.html').on('change', browserSync.reload);
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.bSync = bSync;
exports.default = parallel(html, css, js, bSync);
