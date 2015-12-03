var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'hidden-source-map',
  entry: {
    app: path.resolve(__dirname, 'app/main.jsx'),
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
    loaders:[
      { test: /\.css$/, include: path.resolve(__dirname, 'app'), loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production') 
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};
