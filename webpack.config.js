var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  return {
    entry: [
      'react-hot-loader/patch',
      // require for react

      'webpack-dev-server/client?http://localhost:8080',
      // bundle the client for webpack dev server
      // and connect to provided end point

      './index.jsx'
      // the entry point
    ],
    context: path.resolve(__dirname, "src"),
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "publish"),
      publicPath: "/"
    },
    devtool: 'eval-source-map',
    devServer: {
      hot: true,
      // activate hot reloading

      contentBase: "./publish",
      // the output path

      publicPath: "/"
      // match the output publicPath
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/, loader: ['babel'], exclude: /node_modules/
        },
        {
          test: /\.css?$/, loader: ['style', 'css?modules', 'postcss']
        },
        {
          test: /\.styl$/, loader: ExtractTextPlugin.extract(['css?modules', 'stylus?sourceMap'])
        },
        {
          test: /\.(png|jpg|jpeg)$/, loader: ['file?name=./images/[name].[ext]']
        },
        {
          test: /\.html$/, loader: ['file?name=[name].[ext]']
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // Activate HMR
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
        __DEV__: true
      }),
      new ExtractTextPlugin("style.css")
    ]
  };
};
