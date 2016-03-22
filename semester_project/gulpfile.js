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


gulp.task('autoprefixCSS', function () {
	return gulp.src(['public/*.css', 'public/**/*.css'])
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
	return gulp.src(['public/*.js', 'public/**/*.js'])
		.pipe(changed('dist'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist'))
})

gulp.task('htmlMin', ['jsMin', 'autoprefixCSS'], function() {
	return gulp.src(['public/*.html', 'public/**/*.html'])
		.pipe(changed('dist'))
		.pipe(htmlmin())
		.pipe(useref())
		.pipe(gulp.dest('dist'))
})

gulp.task('imgMin', function() {
	return gulp.src(['public/*.jpg', 'public/**/*.jpg'])
		.pipe(changed('dist'))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [jpegtran()]
		}))
		.pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
	gulp.watch(['public/*.jpg', 'public/**/*.jpg'], ['imgMin'])
	gulp.watch(['public/*.js', 'public/**/*.js'], ['jsMin'])
	gulp.watch(['public/*.html', 'public/**/*.html'], ['htmlMin'])
	gulp.watch(['public/*.css', 'public/**/*.css'], ['autoprefixCSS'])
	//gulp.watch('public/*.scss','public/**/*.scss', ['convertSASS'])
})

gulp.task('default', ['jsMin', 'autoprefixCSS', 'htmlMin', 'imgMin'], function() {
	console.log('completed all gulp tasks')
})