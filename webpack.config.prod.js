var webpack = require('webpack');
var path, { resolve } = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var extractCSSTextPlugin = new ExtractTextPlugin({
	filename: 'css.css',
	ignoreOrder: true,
});
var extractStylusTextPlugin = new ExtractTextPlugin({
	filename: 'style.css',
	ignoreOrder: true,
});

module.exports = {
	entry: [
		'./index.js',
	],
	context: resolve(__dirname, 'src'),
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist/assets'),
		publicPath: '/assets/',
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
					],
					fallback: 'style-loader',
					publicPath: '/assets/',
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
					publicPath: '/assets/',
				}),
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
				    {
				        loader: 'file-loader',
				        options: {
							name: '[path][name].[ext]',
				        },
				    },
				],
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							publicPath: '/assets/',
						},
					},
				],
			},
		],
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

		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: resolve(__dirname, 'src/index.ejs'),
		}),
	],
};
