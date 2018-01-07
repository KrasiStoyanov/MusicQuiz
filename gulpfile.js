const gulp = require('gulp');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('babel', () => {
    browserify([
            'src/js/main.js'
        ])
        .transform('babelify', {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('build/js'));
});

gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('html', () => {
    return gulp.src('index.html')
        .pipe(connect.reload());
});

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                includePaths: [
                    'src/sass',
                    'node_modules/bootstrap/scss'
                ]
            })
            .on('error', sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('assets', function() {
    return gulp.src('assets/**/*')
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
    gulp.watch(['src/sass/**/*.scss'], ['sass']);
    gulp.watch(['./*.html'], ['html']);
    gulp.watch('src/js/**/*.js', ['babel']);
    gulp.watch(['assets/{images,fonts}/**/*'], ['assets']);
});

gulp.task('build', ['html', 'sass', 'assets']);

gulp.task('development', ['build', 'connect', 'watch'])