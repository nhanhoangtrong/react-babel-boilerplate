const webpack = require('webpack');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const extractCSSTextPlugin = new ExtractTextPlugin({
    filename: 'css.css',
    ignoreOrder: true,
    disable: isDev,
});
const extractStylusTextPlugin = new ExtractTextPlugin({
    filename: 'stylus.css',
    ignoreOrder: true,
    disable: isDev,
});

const srcDir = resolve(__dirname, 'src');
const publicPath = '/assets/';

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
        __DEV__: isDev,
    }),
    extractCSSTextPlugin,
    extractStylusTextPlugin,
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.bundle.js',
        minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
        filename: isDev ? 'index.html' : '../index.html',
        title: isDev ? 'Development' : 'Production',
        template: resolve(__dirname, 'src/index.ejs'),
    }),
];

const devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
];

const prodPlugins = [
    new webpack.optimize.UglifyJsPlugin(),
];

module.exports = {
    entry: {
        app: isDev ? [
            'react-hot-loader/patch',
            './index.js',
        ] : './index.js',
        vendors: [
            'react',
            'react-dom',
            'redux',
            'redux-thunk',
            'react-redux',
            'react-router',
            'react-router-redux',
            'lodash',
            'immutable',
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@app': srcDir,
        },
    },
    context: srcDir,
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, join('dist', publicPath)),
        publicPath,
    },
    target: 'web',
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: {
        contentBase: './dist',
        publicPath: publicPath,
        hot: true,
        inline: true,
        historyApiFallback: {
            index: publicPath,
            rewrites: {
                from: /./, to: publicPath,
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'react-hot-loader/webpack',
                    'babel-loader',
                ],
            },
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                use: {
                    loader: 'eslint-loader',
                    options: {
                        quiet: isDev,
                        failOnError: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: extractCSSTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                sourceMap: isDev,
                                importLoaders: 1,
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.styl$/,
                use: extractStylusTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: isDev,
                                importLoaders: 1,
                                localIndentName: '[name]_[local]',
                            },
                        },
                        'stylus-loader',
                    ],
                }),
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            },
        ],
    },
    plugins: Array.from(isDev ? devPlugins : prodPlugins).concat(defaultPlugins),
};
