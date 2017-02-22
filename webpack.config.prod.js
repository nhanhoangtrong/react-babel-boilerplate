var webpack = require('webpack');
var { resolve } = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    "./index.js"
  ],
  context: resolve(__dirname, 'src'),
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist/js")
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader']
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use:['css-loader?modules&localIdentName=[local]', 'stylus-loader'],
          fallback: 'style-loader',
          publicPath: '/css/'
        })
      },
      {
        test: /\.(png|jpg|jpeg)$/, use: ['file-loader?name=images/[name].[ext]']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      __DEV__: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    // Minify JS

    new ExtractTextPlugin('../css/style.css')
    // Extract text to output
  ]
}
