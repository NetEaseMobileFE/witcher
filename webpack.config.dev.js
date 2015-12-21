var path = require('path');
var webpack = require('webpack');
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		app: [
			'webpack-hot-middleware/client',
			'./app/js/app.jsx'
		],
		vendor: [
			'react', 'react-dom', 'react-router', 'history'
		]
	},
	output: {
		path: path.join(__dirname, 'dist/js'),
		filename: 'bundle.js',
		publicPath: '/dist/js/',
		pathinfo: true
	},
	plugins: [
		//new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
		new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			DEBUG: true
		})
	],
	module: {
		loaders: [
			{
				test: /\.css$/,
				include: path.join(__dirname, 'app/css'),
				loader: 'style!css'
			}, { // LESS
				test: /\.less$/,
				loader: 'style!css!less'
			}, {
				test: /\.js[x]?$/,
				include: path.join(__dirname, 'app'),
				loader: 'babel'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			js: path.join(__dirname, 'app/js'),
			css: path.join(__dirname, 'app/css')
		}
	}
};
