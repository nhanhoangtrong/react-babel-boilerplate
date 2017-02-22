let gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	gutil = require('gulp-util'),
	watch = require('gulp-watch')

let path = require('path')
let del = require('del')
let runSequence = require('run-sequence')

let browserSync = require('browser-sync').create()

let webpack = require('webpack')
let webpackDevConfig = require('./webpack.config')
let webpackProdConfig = require('./webpack.config.prod')
let WebpackDevServer = require('webpack-dev-server')
let webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleware = require('webpack-hot-middleware')

// let webpackBundler = webpack(webpackDevConfig, function(err, stats) {
// 	if (err) {
// 		throw new gutil.PluginError('webpack', err)
// 	}
// 	gutil.log("[webpack]", stats.toString())
// })

// Dev tasks
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
	let config = Object.create(webpackDevConfig)
	config.entry[0] = 'webpack-dev-server/client?http://localhost:8080'

	new WebpackDevServer(webpack(config), {
		contentBase: './dist',
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
	let config = Object.create(webpackDevConfig)
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

// Build production tasks
gulp.task('build:stylus', function() {
	return gulp.src('src/stylus/**/*.styl')
		.pipe(stylus().on('error', function(err) {
			gulp.log('[stylus]', err)
			this.emit('end')
		}))
		.pipe(gulp.dest('dist/css'))
})

gulp.task('build:webpack', function(done) {
	let config = Object.create(webpackProdConfig)
	webpack(config, function(err, stats) {
		if (err) {
			throw new gutil.PluginError('[webpack]', err)
		}
		gutil.log('[webpack]', stats.toString())
		done()
	})
})

gulp.task('build:html', function(done) {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'))
})

gulp.task('clean:dist', function(done) {
	del('dist').then(function() {
		done()
	}).catch(gutil.log)
})

gulp.task('server:dist', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
})

// Main tasks go here
gulp.task('build', function(done) {
	runSequence('clean:dist', ['build:stylus', 'build:webpack', 'build:html'], done)
})
gulp.task('dev:webpack', function(done) {
	runSequence('build', 'webpack-dev-server', done)
})
gulp.task('dev:browserSync', function(done) {
	runSequence('browserSync', done)
})
gulp.task('start', function(done) {
	runSequence('build', 'server:dist', done)
})