var webpack = require('webpack');
var { resolve } = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    "./index.js"
  ],
  output: [
    filename: "bundle.js",
    path: resolve(__dirname, "dist/js")
  ],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          loader:'css-loader?modules!postcss-loader',
          fallbackLoader: 'style-loader',
          publicPath: '/css/'
        })
      },
      {
        test: /\.styl$/, use: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]', 'stylus-loader']
      },
      {
        test: /\.(png|jpg|jpeg)$/, use: ['file-loader?name=images/[name].[ext]']
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
}
