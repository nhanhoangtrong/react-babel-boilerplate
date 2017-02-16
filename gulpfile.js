let gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	gutil = require('gulp-util'),
	watch = require('gulp-watch')

let path = require('path')

let browserSync = require('browser-sync').create()

let webpack = require('webpack')
let webpackDevConfig = require('./webpack.config')
let webpackHotMiddleware = require('webpack-hot-middleware')
let webpackDevMiddleware = require('webpack-dev-middleware')

let webpackBundler = webpack(webpackDevConfig, function(err, stats) {
	if (err) {
		throw new gutil.PluginError('webpack', err)
	}
	gutil.log("[webpack]", stats.toString())
})

gulp.task('stylus', function() {
	gutil.log('stylusing')
	return gulp.src('src/stylus/**/*.styl')
		.pipe(stylus().on('error', function(err) {
			gutil.log(err)
			this.emit('end')
		}))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream({
			once: true
		}))
})

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'src'
		},
		middleware: [
			webpackHotMiddleware(webpackBundler),
			webpackDevMiddleware(webpackBundler, {
				publicPath: webpackDevConfig.output.publicPath,
				stats: {
					colors: true
				}
			})
		],
		files: [
			'src/css/**/*.css', 'src/**/*.html'
		],
		open: false
	})
})

gulp.task('dev', ['browserSync', 'stylus'], function() {
	watch('src/stylus/**/*.styl', function(vinyl) {
		gulp.start('stylus')
	})
})

gulp.task('build', ['stylus'])