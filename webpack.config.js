const webpack = require('webpack');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isAnalyzing = process.env.ANALYZING === 'true';

// Initialize ExtractTextPlugin with two options
const extractCSSTextPlugin = new ExtractTextPlugin({
    filename: '[md5:contenthash:hex:16].css',
    ignoreOrder: true,
    disable: isDev,
});
const extractStylusTextPlugin = new ExtractTextPlugin({
    filename: '[md5:contenthash:hex:16].css',
    ignoreOrder: true,
    disable: isDev,
});

const srcDir = resolve(__dirname, 'src');
const publicPath = '/assets/';

const basePlugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
        __DEV__: isDev,
    }),
    extractCSSTextPlugin,
    extractStylusTextPlugin,
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: '[name].bundle.js',
        minChunks: 2,
    }),
    new HtmlWebpackPlugin({
        filename: isDev ? 'index.html' : '../index.html',
        title: isDev ? 'Development' : 'Production',
        template: resolve(__dirname, 'src/template.ejs'),
        minify: isDev ? false : {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
    }),
];

let plugins;
if (isDev) {
    const devPlugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ];
    plugins = devPlugins.concat(basePlugins);
} else {
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

    const prodPlugins = [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    comparisons: false,
                },
                output: {
                    comments: false,
                },
            },
            sourceMap: false,
        }),
    ];
    if (isAnalyzing) {
        prodPlugins.push(new BundleAnalyzerPlugin());
    }
    plugins = prodPlugins.concat(basePlugins);
}

module.exports = {
    entry: {
        app: isDev ? [
            'react-hot-loader/patch',
            './index.js',
        ] : './index.js',
        commons: [
            'react',
            'react-dom',
            'redux',
            'redux-thunk',
            'react-redux',
            'react-router',
            'react-router-redux',
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
        chunkFilename: '[name].chunk.js',
        path: resolve(__dirname, join('dist', publicPath)),
        publicPath,
    },
    target: 'web',
    devtool: isDev ? 'cheap-module-eval-source-map' : false,
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
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: isDev,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                use: {
                    loader: 'eslint-loader',
                    options: {
                        quiet: isDev,
                        cache: isDev,
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: extractCSSTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: isDev,
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options : {
                                ident: 'postcss',
                                plugins: (loader) => [
                                    require('postcss-cssnext')(),
                                ],
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
    performance: {
        hints: isDev ? false : "warning",
    },
    plugins,
};
