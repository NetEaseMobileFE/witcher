var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');


module.exports = {
	devtool: 'eval',
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		contentBase: './app',
		port: 8080
	},
	entry: {
		app: [
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080',
			path.resolve(__dirname, 'app/js/app.jsx')
		],
		vendor: [
			'react', 'react-dom', 'react-router', 'history'
		]
	},
	output: {
		path: __dirname + '/build',
		publicPath: '/',
		filename: './bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'app'),
				loader: 'style!css'
			}, { // LESS
				test: /\.less$/,
				loader: 'style!css!less'
			}, {
				test: /\.js[x]?$/,
				include: path.resolve(__dirname, 'app'),
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	},
	plugins: [
		new OpenBrowserPlugin({url: 'http://localhost:8080'}),
		new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			js: path.join(__dirname, "/app/js"),
			css: path.join(__dirname, "/app/css")
		}
	}
};
