const gulp = require('gulp')
const stylus = require('gulp-stylus')
const gutil = require('gulp-util')
const imagemin = require('gulp-imagemin')

const del = require('del')
const runSequence = require('run-sequence')

const browserSync = require('browser-sync').create()

const webpack = require('webpack')
const webpackDevConfig = require('./webpack.config')
const webpackProdConfig = require('./webpack.config.prod')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

// const webpackBundler = webpack(webpackDevConfig, function(err, stats) {
// 	if (err) {
// 		throw new gutil.PluginError('webpack', err)
// 	}
// 	gutil.log("[webpack]", stats.toString())
// })

// Error log func
const handlePluginError = (pluginName) => {
	return function(err) {
		gutil.log(pluginName, err.message)
		this.emit('end')
	}
}

// Dev tasks
gulp.task('stylus', () => {
	gutil.log('stylusing')
	return gulp.src('src/stylus/**/*.styl')
		.pipe(stylus().on('error', handlePluginError('stylus')))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream({
			once: true
		}))
})

gulp.task('webpack-dev-server', () => {
	const config = Object.create(webpackDevConfig)
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
	}).listen(8080, 'localhost', (err) => {
		if (err) throw new gutil.PluginError('webpack-dev-server', err)
		gutil.log('[webpack-dev-server]', 'http://localhost:8080')
	});
})

gulp.task('browserSync', () => {
	const config = Object.create(webpackDevConfig)
	config.entry[0] = 'webpack-hot-middleware/client'
	const bundler = webpack(config)
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
gulp.task('build:stylus', () => {
	return gulp.src('src/stylus/**/*.styl')
		.pipe(stylus().on('error', handlePluginError('stylus')))
		.pipe(gulp.dest('dist/css'))
})

gulp.task('build:webpack', (done) => {
	const config = Object.create(webpackProdConfig)
	webpack(config, (err, stats) => {
		if (err) {
			throw new gutil.PluginError('[webpack]', err)
		}
		gutil.log('[webpack]', stats.toString())
		done()
	})
})

gulp.task('build:html', () => {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'))
})

gulp.task('build:fonts', () => {
	return gulp.src('src/fonts/**/*')
		.pipe(gutil.noop())
		// TODO: using another fonts converter for web
		.pipe(gulp.dest('dist/fonts'))
})

gulp.task('build:imagemin', () => {
	return gulp.src('src/img/**/*')
		.pipe(imagemin().on('error', handlePluginError('imagemin')))
		.pipe(gulp.dest('dist/img'))
})

gulp.task('clean:dist', (done) => {
	del('dist').then(() => {
		done()
	}).catch(gutil.log)
})

gulp.task('server:dist', () => {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
})

// Main tasks go here
gulp.task('build', (done) => {
	runSequence('clean:dist', ['build:stylus', 'build:webpack', 'build:html', 'build:imagemin', 'build:fonts'], done)
})
gulp.task('dev:webpack', (done) => {
	runSequence('build', 'webpack-dev-server', done)
})
gulp.task('dev:browserSync', (done) => {
	runSequence('browserSync', done)
})
gulp.task('start', (done) => {
	runSequence('build', 'server:dist', done)
})
