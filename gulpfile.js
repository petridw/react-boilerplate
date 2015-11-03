var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var babelify = require('babelify');
var nodemon = require('gulp-nodemon');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');


gulp.task('serve', serve);
gulp.task('build-js', buildJS);
gulp.task('watch-js', watchJS);
gulp.task('build-css', buildCSS);
gulp.task('build-css-dev', buildCSSDev);
gulp.task('watch-css', watchCSS);

gulp.task('start-dev', ['watch-js', 'watch-css', 'serve']);
gulp.task('build', ['build-css', 'build-js']);


function serve() {
  nodemon({
    script: './index.js',
    ext: 'html js',
    ignore: ['client/']
  });
}
  
function buildJS() {
  
  var b = browserify({
    entries: ['./src/js/app.js'],
    debug: true,
    transform: babelify.configure({
      presets: ["react", "es2015"]
    })
  });
  
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('./client/build'));
}

function watchJS() {
  
  var b = browserify({
    entries: ['./src/js/app.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify],
    debug: true,
    transform: babelify.configure({
      presets: ["react", "es2015"]
    })
  });
  
  b.on('log', gutil.log);
  
  b.on('update', buildJSDev);
  
  buildJSDev();
  
  function buildJSDev() {
    return b.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .on('error', gutil.log)
      .pipe(gulp.dest('./client/build'));
  }
}

function buildCSS() {
  return gulp.src('./css/*.css')
    .pipe(minifyCSS())
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./client/build'));
}

function buildCSSDev() {
  return gulp.src('./css/*.css')
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./client/build'));
}

function watchCSS() {
  gulp.watch('./css/*.css', ['build-css-dev']);
  buildCSSDev();
}
