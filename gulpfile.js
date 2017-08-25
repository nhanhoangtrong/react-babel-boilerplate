const gulp = require('gulp');
const path = require('path');

const stylus = require('gulp-stylus');
const gutil = require('gulp-util');
const watch = require('gulp-watch');
const imagemin = require('gulp-imagemin');

const del = require('del');
const runSequence = require('run-sequence');

const browserSync = require('browser-sync').create();

const webpack = require('webpack');
const webpackDevConfig = require('./webpack.config.dev');
const webpackProdConfig = require('./webpack.config.prod');

const WebpackDevServer = require('webpack-dev-server');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const dotenv = require('dotenv');

// Loading environment variables
dotenv.config({path: path.resolve(__dirname, '.env')});

// Gulp plugin errors logging
const handlePluginError = (pluginName) => {
    return function(err) {
        gutil.log(gutil.colors.yellow(pluginName), gutil.colors.red(err.message));
        this.emit('end');
    };
};

/*
* All development building and running tasks
*/

// Building stylus task for watching in development
gulp.task('watch:stylus', () => {
    return watch('src/stylus/**/*.styl')
		.pipe(stylus().on('error', handlePluginError('watch:stylus')))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream({
    once: true,
}));
});

// Building image task for watching in development
gulp.task('watch:image', () => {
    return watch('src/img/**/*')
		.pipe(browserSync.stream({
            once: true,
        }));
});

// Running a Webpack development server using Webpack Dev Server package
gulp.task('webpack-dev-server', () => {
    const config = Object.create(webpackDevConfig);
    config.entry[0] = 'webpack-dev-server/client?http://localhost:' + (process.env.DEV_PORT || 8080);

    new WebpackDevServer(webpack(config), {
        contentBase: './dist',
        publicPath: config.output.publicPath,
        open: true,
        openPage: '/',
        hot: true,
        inline: true,
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
		  timings: true,
		  chunks: true,
		  chunkModules: true,
        },
    }).listen(parseInt(process.env.DEV_PORT, 10) || 8080, process.env.DEV_HOST || 'localhost', (err) => {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'Started on http://localhost:8080');
    });
});

// Running a Browser Sync development server using Webpack Hot Middleware and Webpack Dev Middleware
gulp.task('browserSync', () => {
    const config = Object.create(webpackDevConfig);
    config.entry[0] = 'webpack-hot-middleware/client';
    const webpackBundler = webpack(config);
    browserSync.init({
        server: {
            baseDir: 'src',
        },
        port: parseInt(process.env.DEV_PORT, 10) || 8080,
        host: process.env.DEV_HOST || 'localhost',
        middleware: [
            webpackHotMiddleware(webpackBundler),
            webpackDevMiddleware(webpackBundler, {
                hot: true,
                inline: true,
                historyApiFallback: true,
                publicPath: config.output.publicPath,
                stats: {
                    colors: true
                },
            }),
        ],
        files: [
            'src/css/**/*.css', 'src/**/*.html',
        ],
        open: true,
    });
});

/*
* All production building tasks
*/

// Building Stylus files into CSS files
gulp.task('build:stylus', () => {
    return gulp.src('src/stylus/**/*.styl')
		.pipe(stylus().on('error', handlePluginError('build:stylus')))
        .pipe(gulp.dest('dist/assets/css'));
});

// Running the Webpack production building
gulp.task('build:webpack', (done) => {
    const config = Object.create(webpackProdConfig);
    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('[build:webpack]', err);
        }
        gutil.log('[build:webpack]', stats.toString());
        done();
    });
});

// Minimizing HTML files to distribution folder
gulp.task('build:html', () => {
    return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist/'));
});

// Converting font files to distribution folder
gulp.task('build:fonts', () => {
    return gulp.src('src/fonts/**/*')
		.pipe(gutil.noop())
		// TODO: using another fonts converter for web
        .pipe(gulp.dest('dist/assets/fonts'));
});

// Minimizing images and then streaming to distribution folder
gulp.task('build:imagemin', () => {
    return gulp.src('src/img/**/*')
		.pipe(imagemin().on('error', handlePluginError('build:imagemin')))
        .pipe(gulp.dest('dist/assets/img'));
});

// Cleaning files in distribution folder
gulp.task('clean:dist', (done) => {
    del('dist').then(() => {
        done();
    }).catch(gutil.log);
});

/*
* Production testing tasks
*/
// Serving file in distribution folder
gulp.task('server:dist', () => {
    browserSync.init({
        server: {
            baseDir: 'dist',
        },
    });
});

/*
* Main tasks for development and production
*/

// Building files to distribution folder
gulp.task('build', (done) => {
    runSequence('clean:dist', ['build:webpack', 'build:html', 'build:imagemin', 'build:fonts'], done);
});

// Running Webpack Dev Server in development
gulp.task('dev:webpack', (done) => {
    runSequence('build', 'webpack-dev-server', done);
});

// Running Browser Sync Server in development
gulp.task('dev:browserSync', (done) => {
    runSequence('browserSync', done);
});

// Building files to distribution folder and then running a test server
gulp.task('start', (done) => {
    runSequence('build', 'server:dist', done);
});
