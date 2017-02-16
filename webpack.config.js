var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // require for react

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack dev server
    // and connect to provided end point

    'webpack/hot/only-dev-server',

    './index.js'
    // the entry point
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  context: path.resolve(__dirname, "src"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "src/js"),
    publicPath: "/js/"
  },
  devtool: 'eval',
  devServer: {

    contentBase: "./src",
    // the output path

    publicPath: "/js/"
    // match the output publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/
      },
      {
        test: /\.css?$/, use: ['style-loader', 'css-loader?modules', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg)$/, use: ['file?name=./images/[name].[ext]']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // Activate HMR
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      __DEV__: true
    })
  ]
}
