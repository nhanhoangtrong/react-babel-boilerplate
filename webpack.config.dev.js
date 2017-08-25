var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',

		'webpack/hot/dev-server',
		// require for react
		'react-hot-loader/patch',

		'./index.js',
		// the entry point
	],
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@app': path.resolve(__dirname, 'src'),
		},
	},
	context: path.resolve(__dirname, 'src'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist/assets'),
		publicPath: '/assets/'
	},
	target: 'web',
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [
				    'react-hot-loader/webpack',
				    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            quiet: true,
                        },
                    },
				],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]_[local]',
							},
						},
						'postcss-loader',
				],
			},
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]_[local]',
						},
					},
					'stylus-loader',
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				use: [
				    {
				        loader: 'file-loader',
				        options: {
							name: '[path][name].[ext]',
				        },
				    },
				],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		// Activate HMR
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			__DEV__: true
		}),
	],
};
