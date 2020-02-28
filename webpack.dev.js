const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'client', 'public'),
    hot: true,
    port: 8080,
    proxy: {
      '/api':'http://localhost:4000'
    }
  }
});
