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
const webpackConfig = require('./webpack.config');

const WebpackDevServer = require('webpack-dev-server');

const dotenv = require('dotenv');

// Loading environment variables
dotenv.config({path: path.resolve(__dirname, '.env')});

// Gulp plugin errors logging
const handlePluginError = (pluginName) => {
    return function errorHandler(err) {
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

// Running a Webpack development server using Webpack Dev Server package
gulp.task('webpack-dev-server', () => {
    const config = Object.create(webpackConfig);

    new WebpackDevServer(webpack(config), config.devServer).listen(parseInt(process.env.DEV_PORT, 10) || 8080, process.env.DEV_HOST || 'localhost', (err) => {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'Started on http://' + process.env.DEV_HOST + ':' + process.env.DEV_PORT);
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
    const config = Object.create(webpackConfig);
    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('[build:webpack]', err);
        }
        gutil.log('[build:webpack]', stats.toString({
            colors: true,
        }));
        done();
    });
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
    runSequence('clean:dist', 'build:webpack', done);
});

// Running Webpack Dev Server in development
gulp.task('dev', (done) => {
    runSequence('clean:dist', 'webpack-dev-server', done);
});

// Building files to distribution folder and then running a test server
gulp.task('start', (done) => {
    runSequence('build', 'server:dist', done);
});
