var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
    concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();

gulp.task('default', ['watch']);

gulp.task('build-html', function() {
	return gulp.src('source/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('dist')); // tell gulp our output folder
});

gulp.task('build-css', function() {
	return gulp.src('source/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist/stylesheets'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('build-js', function() {
	return gulp.src('source/javascript/**/*.js')
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('dist/javascript/'));
});

gulp.task('fonts', function() {
	return gulp.src('source/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function() {
	return gulp.src('source/images/**/*')
		.pipe(gulp.dest('dist/images'));
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
	});
});

gulp.task('watch', ['browserSync'], function() {
	gulp.watch('./source/**/*.jade', ['build-html']);
	gulp.watch('./source/sass/**/*.sass', ['build-css']);
	gulp.watch('./source/javascript/**/*.js', ['build-js']);
	gulp.watch('./source/fonts/**/*', ['fonts']);
	gulp.watch('./source/images/**/*', ['images']);
});