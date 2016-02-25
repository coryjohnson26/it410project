const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const useref = require('gulp-useref')
const rename = require('gulp-rename')
const jpegtran = require('imagemin-jpegtran')
const changed = require('gulp-changed')

gulp.task('convertSASS', function () {
	return gulp.src('src/*.scss','src/**/*.scss')
		.pipe(changed('dist'))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(csso())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist'))
})

gulp.task('autoprefixCSS', function () {
	return gulp.src(['src/*.css', 'src/**/*.css'])
		.pipe(changed('dist'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(csso())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist'))
})

gulp.task('jsMin', function() {
	return gulp.src(['src/*.js', 'src/**/*.js'])
		.pipe(changed('dist'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist'))
})

gulp.task('htmlMin', ['jsMin', 'autoprefixCSS', 'convertSASS'], function() {
	return gulp.src(['src/*.html', 'src/**/*.html'])
		.pipe(changed('dist'))
		.pipe(htmlmin())
		.pipe(useref())
		.pipe(gulp.dest('dist'))
})

gulp.task('imgMin', function() {
	return gulp.src(['src/*.jpg', 'src/**/*.jpg'])
		.pipe(changed('dist/images'))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [jpegtran()]
		}))
		.pipe(gulp.dest('dist/images'))
})

gulp.task('watch', function () {
	gulp.watch(['src/*.jpg', 'src/**/*.jpg'], ['imgMin'])
	gulp.watch(['src/*.js', 'src/**/*.js'], ['jsMin'])
	gulp.watch(['src/*.html', 'src/**/*.html'], ['htmlMin'])
	gulp.watch(['src/*.css', 'src/**/*.css'], ['autoprefixCSS'])
	gulp.watch('src/*.scss','src/**/*.scss', ['convertSASS'])
})

gulp.task('default', ['jsMin', 'autoprefixCSS', 'convertSASS', 'htmlMin', 'imgMin'], function() {
	console.log('completed all gulp tasks')
})