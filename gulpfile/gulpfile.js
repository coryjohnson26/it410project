const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')

gulp.task('compressJS', function() {
    return gulp.src(['src/*.js', 'src/**/*.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
})

gulp.task('convertCSS', function(){
    return gulp.src(['src/*.scss', 'src/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
})

gulp.task('default', ['convertCSS', 'compressJS'], function(){
    console.log('Completed gulp tasks')
})