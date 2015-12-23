var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'hidden-source-map',
	entry: {
		app: './app/js/app.jsx',
		vendor: [
			'react', 'react-dom', 'react-router', 'history'
		]
	},
	output: {
		path: path.join(__dirname, 'dist/js'),
		filename: 'bundle.js',
		publicPath: 'http://c.3g.163.com/nc/qa/witcher/js/'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.bundle.js',
			minChunks: Infinity
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'app',
			children: true,
			minChunks: 2
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.css$/,
				include: path.join(__dirname, 'app/css'),
				loader: 'style!css!autoprefixer-loader?{browsers:["last 2 version", "Android >= 4.0"]}'
			}, { // LESS
				test: /\.less$/,
				loader: 'style!css!less'
			}, {
				test: /\.js[x]?$/,
				include: path.join(__dirname, 'app/js'),
				exclude: path.join(__dirname, 'app/js/plugins'),
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
