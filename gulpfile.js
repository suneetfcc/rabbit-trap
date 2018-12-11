'use strict';

var config = {
	src: 'src',
	dest: 'dist'
};

var es6FileGlob = '/**/*.es6.js';

var gulp       = require('gulp');
var plugins    = require('gulp-load-plugins')();
var glob       = require('glob');
var path       = require('path');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();


// Takes an array of bundles to run through browserify and babelify
function transpileES6Modules(browserifyFileEntries) {
	browserifyFileEntries.forEach(function (fileEntry) {
		var browserifyBundle = browserify({
			entries: [fileEntry.srcPath]
		})
			.transform(babelify, { presets: ['@babel/preset-env'] });

		var finalStream = browserifyBundle.bundle()
			.on('log', plugins.util.log.bind(plugins.util, 'Browserify Log'))
			.on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
			.pipe(source(fileEntry.outputFilename));

		return finalStream.pipe(gulp.dest(fileEntry.dest));
	});
}

// This takes a source path and finds all files ending
// with .es6.js and creates the bundles to run through browserify
// and babelify
function handleES6Scripts(srcPath) {
	var browserifyFileEntries = [];

	var es6Filepaths = glob.sync(srcPath + es6FileGlob);
	es6Filepaths.forEach(function (filepath) {
		var filename = path.basename(filepath);
		var directoryOfFile = path.dirname(filepath);
		var relativeDirectory = path.relative(
			srcPath,
			directoryOfFile);

		// Create an object and add to the browserify bundle array
		browserifyFileEntries.push({
			srcPath: './' + filepath,
			outputFilename: filename,
			dest: path.join(config.dest, relativeDirectory)
		});
	});

	transpileES6Modules(browserifyFileEntries);
}

gulp.task('buildHtml', () => {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('buildCss', () => {
	return gulp.src('src/*.css')
		.pipe(gulp.dest('dist'));
});

gulp.task('buildJs', (done) => {
	handleES6Scripts(config.src);
	done();
});

gulp.task('default', gulp.parallel('buildHtml' , 'buildCss', 'buildJs'));

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
	});
	gulp.watch('src/*.html', gulp.series('buildHtml'));
	gulp.watch('src/*.css', gulp.series('buildCss'));
	gulp.watch('src/*.js', gulp.series('buildJs'));

	gulp.watch('dist/*.html').on('change', browserSync.reload);
	gulp.watch('dist/*.css').on('change', browserSync.reload);
	gulp.watch('dist/*.js').on('change', browserSync.reload);
});
