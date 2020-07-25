const webpack = require('webpack');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// First, we need to check the environment constants
// include NODE_ENV and ANALYZING
const DEV = process.env.NODE_ENV === 'development';
const ANALYZING = process.env.ANALYZING === 'true';

// Then we initialize ExtractTextPlugin with two instances
// The first one is use for extracting CSS text, and the second
// one is for trasformed Stylus text, with hashed filename
// and disabled in development
const extractCSSTextPlugin = new ExtractTextPlugin({
    filename: '[md5:contenthash:hex:16].css',
    ignoreOrder: true,
    disable: DEV,
});
const extractStylusTextPlugin = new ExtractTextPlugin({
    filename: '[md5:contenthash:hex:16].css',
    ignoreOrder: true,
    disable: DEV,
});

// Next, we need to define the source directory for webpack context
const SOURCE_DIR = resolve(__dirname, '../../src');
// the dll folder that contained pre-built dlls
const DLL_DIR = resolve(__dirname, '../../build');
// the public path of bundled files
const PUBLIC_PATH = '/assets/';
// and filename's prefix of output files
const OUTPUT_PREFIX = DEV ? '[name]' : '[name].[chunkhash:8]';

const basePlugins = [
    // First clean the ./dist forlder using CleanWebpackPlugin
    new CleanWebpackPlugin(),
    // This plugin allows us define some important constants
    new webpack.DefinePlugin({
        // Because React need the NODE_ENV in each stage
        'process.env.NODE_ENV': JSON.stringify(
            DEV ? 'development' : 'production'
        ),
        // Webpack constant, good for loading specific modules
        __DEV__: DEV,
    }),

    // This where we put the created extracting plugins
    extractCSSTextPlugin,
    extractStylusTextPlugin,

    // This plugin creates a HTML file to serve all webpack bundles
    // This is especially useful for webpack bundles that include a hash in the filename
    // which changes every compilation. You can either let the plugin
    // generate an HTML file for you, supply your own
    // template using lodash templates or use your own loader.
    new HtmlWebpackPlugin({
        // The file to write the HTML to, in production we might need to
        // write into parent folder instead of assets folder
        filename: DEV ? 'index.html' : '../index.html',
        // Config the title for generated HTML
        title: DEV ? 'Development' : 'Production',
        description: '',
        // Path to the template, we can using ejs template with no configurations
        template: resolve(__dirname, '../../src/template.ejs'),
        // Inject all bundles into the template, all javascript will be placed
        inject: true,
        // Minify config on production only, parsing an html-minifier config object
        // in production or disable in development
        minify: DEV
            ? false
            : {
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

// Let's define all the plugins for specific stage
let plugins;
if (DEV) {
    const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
    const devPlugins = [
        // Enable Hot Module Replacement, that's webpack cons
        new webpack.HotModuleReplacementPlugin(),
        // This plugin will cause the relative path of the module to be displayed when HMR is enabled
        new webpack.NamedModulesPlugin(),
        // This plugin will load our pre-built dll bundle for better development building
        new webpack.DllReferencePlugin({
            // Passing the manifest file
            manifest: require(join(DLL_DIR, 'vendors-manifest.json')),
            // And mapping the context of requests in manifest file
            context: resolve(__dirname, '../../'),
        }),
        // In development, we need to inject a additional dll file built from DllPlugin
        new AddAssetHtmlPlugin({
            filepath: join(DLL_DIR, 'vendors.dll.js'),
            includeSourcemap: false,
        }),
    ];
    // Concanate base plugins at the end of plugins list
    plugins = basePlugins.concat(devPlugins);
} else {
    const { GenerateSW } = require('workbox-webpack-plugin');

    const prodPlugins = [
        // Generate Service Worker for caching offline-first strategy
        // using Workbox
        new GenerateSW(),
    ];
    // Concanate base plugins at the end of plugins list
    plugins = basePlugins.concat(prodPlugins);
}
if (ANALYZING) {
    // If ANALYZING is true, push a BundleAnalyzerPlugin at the end of plugins list
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
        .BundleAnalyzerPlugin;
    plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
    // Specify webpack bundle mode for environment variables
    mode: DEV ? 'development' : 'production',
    entry: {
        // The main entry load from react-hot-loader/patch in development
        app: './index.js',
    },
    // Resolve js, jsx and json file, then add an source dir alias for quick references
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@src': SOURCE_DIR,
        },
    },
    // Specify webpack context folder
    context: SOURCE_DIR,
    // Tell webpack how to write the completed files to disk
    output: {
        // Filename of each compiled file
        filename: OUTPUT_PREFIX + '.js',
        // Filename of chunks
        chunkFilename: OUTPUT_PREFIX + '.chunk.js',
        // Write all assets to /assets folder in ./dist
        path: resolve(__dirname, join('../../dist', PUBLIC_PATH)),
        publicPath: PUBLIC_PATH,
    },
    // Specific webpack target built
    target: 'web',
    // Using source-map only in development
    devtool: DEV ? 'cheap-module-eval-source-map' : false,
    // Config webpack-dev-server to enable HotModuleReplacement
    devServer: {
        contentBase: './dist',
        publicPath: PUBLIC_PATH,
        hot: true,
        inline: true,
        // Config the history fallback to public path
        historyApiFallback: {
            index: PUBLIC_PATH,
            rewrites: {
                from: /./,
                to: PUBLIC_PATH,
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
                            // Tell babel-loader to cache files in development
                            cacheDirectory: DEV,
                        },
                    },
                ],
                // Only using this loader in context folder
                include: SOURCE_DIR,
            },
            {
                // Using eslint to check js and jsx files before running other loaders
                test: /\.jsx?$/,
                enforce: 'pre',
                use: {
                    loader: 'eslint-loader',
                    options: {
                        // In development, only show errors
                        quiet: DEV,
                        // and cache checking information
                        cache: DEV,
                    },
                },
                // Only using this loader in context folder
                include: SOURCE_DIR,
            },
            {
                // In development, using fallback style-loader and css-loader with
                // all CSS in node_modules folder
                // In production, minizing extracted CSS texts
                test: /\.css$/,
                include: /node_modules/,
                use: extractCSSTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                    },
                }),
            },
            {
                // In development, using fallback style-loader, css-loader includes
                // CSS Modules and source map, postcss-loader includes cssnext plugin
                // with all CSS in node_modules folder
                // In production, minizing extracted CSS texts
                test: /\.css$/,
                exclude: /node_modules/,
                use: extractCSSTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'local',
                                    localIdentName:
                                        '[path][name]__[local]--[hash:base64:5]',
                                },
                                sourceMap: DEV,
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: (loader) => [
                                    require('postcss-cssnext')(),
                                    require('postcss-autoreset')(),
                                ],
                            },
                        },
                    ],
                }),
            },
            {
                // In development, using fallback style-loader, css-loader includes
                // CSS Modules and source map, stylus-loader for .styl files
                // In production, minizing compiled CSS texts
                test: /\.styl$/,
                use: extractStylusTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'local',
                                    localIdentName:
                                        '[path][name]__[local]--[hash:base64:5]',
                                },
                                sourceMap: DEV,
                                importLoaders: 1,
                            },
                        },
                        'stylus-loader',
                    ],
                }),
            },
            {
                // Other media will be extract to specific folders in /assets folder
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: `media/[name].[hash:16].[ext]`,
                    },
                },
            },
        ],
    },
    // Configurate how the performance hints are shown,
    // by default the maxEntrypointSize is 250kB
    performance: {
        // Only show the warning on production build
        hints: DEV ? false : 'warning',
    },
    // Include all defined plugins
    plugins,
};
