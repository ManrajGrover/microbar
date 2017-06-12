const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('build', () => {
  browserify({ entries: './src/index.js', debug: true, standalone: 'microbar' })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('microbar.js'))
    .pipe(gulp.dest('./debug'));
});

gulp.task('build-prod', () => {
  browserify({ entries: './src/index.js', standalone: 'microbar' })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('microbar.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['build'], () => {
  gulp.watch('./src/*.js', ['build']);
});

gulp.task('default', ['build', 'build-prod', 'watch']);
