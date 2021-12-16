const { src, dest, series, watch } = require('gulp');
const del = require('del');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

const path = {
  html: {
    src: "#src/**/*.html",
    dist: "dist/"
  },
  css: {
    src: "#src/style/**/*.scss",
    dist: "dist/css/"
  }
};

function clear() {
  return del('dist/');
}

function html() {
  return src(path.html.src)
    .pipe(fileinclude())
    .pipe(dest(path.html.dist))
    .pipe(browserSync.stream());
}

function css() {
  return src(path.css.src)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(dest(path.css.dist))
    .pipe(browserSync.stream());
}

function server() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false,
    // online: false,
    // notify: false
  });
  watch(path.html.src, html);
  watch(path.css.src, css);
}

exports.clear = clear;
exports.html = html;
exports.css = css;
exports.server = server;

exports.default = series(clear, html, css, server);