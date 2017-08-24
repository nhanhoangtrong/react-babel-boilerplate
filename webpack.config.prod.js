var webpack = require('webpack');
var { resolve } = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSSTextPlugin = new ExtractTextPlugin('../css/css.css');
var extractStylusTextPlugin = new ExtractTextPlugin('../css/stylus.css');

module.exports = {
	entry: [
		'./index.js',
	],
	context: resolve(__dirname, 'src'),
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist/js'),
		publicPath: '/js/',
	},
	resolve: {
	    modules: ['node_modules'],
		extensions: ['.js', '.jsx', '.json',],
		alias: {
			'@app': resolve(__dirname, 'src'),
		},
	},
	target: 'web',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					'eslint-loader',
				],
			},
			{
				test: /\.css$/,
				use: extractCSSTextPlugin.extract({
				    use: [
				        {
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]_[local]',
							}
						},
						'postcss-loader',
					],
					fallback: 'style-loader',
					publicPath: '/css/',
				}),
			},
			{
				test: /\.styl$/,
				use: extractStylusTextPlugin.extract({
					use: [
					    {
					        loader: 'css-loader',
					        options: {
					            modules: true,
					            localIdentName: '[name]_[local]',
					        },
					    },
					    'stylus-loader',
					],
					fallback: 'style-loader',
					publicPath: '/css/',
				}),
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				use: [
				    {
				        loader: 'file-loader',
				        options: {
				            name: '../img/[name].[ext]',
				        },
				    },
				],
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__DEV__: false
		}),
		new webpack.optimize.UglifyJsPlugin(),
		// Minify JS

		extractStylusTextPlugin,
		extractCSSTextPlugin,
		// Extract text to output
	]
}
