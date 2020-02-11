const webpack = require('webpack');
const { join, resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DLL_DIR = resolve(__dirname, '../../build');

module.exports = {
    mode: 'development',
    target: 'web',
    // This entry includes a list of all packages need to bundle as dll
    entry: [
        'react',
        'react-dom',
        'redux',
        'react-redux',
        'react-router-dom',
        'connected-react-router',
        'react-transition-group',
        'immutable',
        'redux-thunk',
        'lodash',
    ],
    // Output the compiled files to dll folder and specify the bundled library name
    output: {
        path: DLL_DIR,
        filename: 'vendors.dll.js',
        library: 'vendors',
    },
    // Using eval source map in development stage
    devtool: 'eval',
    plugins: [
        // This plugin will clean the dll folder before compiling
        new CleanWebpackPlugin(),
        // Define development env for React debug
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        // Finally, configure the DllPlugin to output the dll manifest file in dll folder
        new webpack.DllPlugin({
            path: join(DLL_DIR, 'vendors-manifest.json'),
            name: 'vendors',
        }),
    ],
};
