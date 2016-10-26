var webpack = require('webpack');
var { resolve } = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = env => {
  return {
    entry: [
      "./index.js"
    ],
    output: [
      filename: "bundle.js",
      path: resolve(__dirname, "publish")
    ],
    devtool: "source-map",
    module: {
      loaders: [
        {
          test: /\.jsx?$/, exclude: /node_modules/, loader: ['babel']
        },
        {
          test: /\.css$/,
          loader: ['style', 'css?modules', 'postcss',]
        },
        {
          test: /\.html$/, loader: ['file?name=[name].[ext]']
        },
        {
          test: /\.(png|jpg|jpeg)$/, loader: ['file?name=images/[name].[ext]']
        }
      ]
    },
    plugins: {
      new webpack.DefinePlugin(
        "process.env.NODE_ENV": JSON.stringify("production"),
        __DEV__: false
      ),

      new webpack.optimize.DedupePlugin(),
      // Eliminate duplicate in modules
      new webpack.optimize.UglifyJsPlugin(),
      // Minify JS
    }
  };
};
