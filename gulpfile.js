let gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	gutil = require('gulp-util'),
	watch = require('gulp-watch')

let path = require('path')

let browserSync = require('browser-sync').create()

let webpack = require('webpack')
let webpackConfig = require('./webpack.config')
let WebpackDevServer = require('webpack-dev-server')
let webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleware = require('webpack-hot-middleware')

let webpackBundler = webpack(webpackConfig, function(err, stats) {
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

gulp.task('webpack-dev-server', function(done) {
	let config = Object.create(webpackConfig)
	config.entry[0] = 'webpack-dev-server/client?http://localhost:8080'

	new WebpackDevServer(webpack(config), {
		contentBase: './src',
		publicPath: config.output.publicPath,
		hot: true,
		historyApiFallback: true,
		// It suppress error shown in console, so it has to be set to false.
		quiet: false,
		// It suppress everything except error, so it has to be set to false as well
		// to see success build.
		noInfo: false,
		stats: {
		  // Config for minimal console.log mess.
		  assets: true,
		  colors: true,
		  version: false,
		  hash: false,
		  timings: false,
		  chunks: false,
		  chunkModules: false
		}
	}).listen(8080, 'localhost', function (err) {
		if (err) throw new gutil.PluginError('webpack-dev-server', err)
		gutil.log('[webpack-dev-server]', 'http://localhost:8080')
	});
}) 

gulp.task('browserSync', function() {
	let config = Object.create(webpackConfig)
	config.entry[0] = 'webpack-hot-middleware/client'
	let bundler = webpack(config)
	browserSync.init({
		server: {
			baseDir: 'src'
		},
		middleware: [
			webpackHotMiddleware(bundler),
			webpackDevMiddleware(bundler, {
				hot: true,
				inline: true,
				historyApiFallback: true,
				publicPath: config.output.publicPath,
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
	watch('./stylus/main.styl', function(vinyl) {
		gulp.start('stylus')
	})
})

gulp.task('build', ['stylus'])