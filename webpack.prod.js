const merge = require('webpack-merge');
const common = require('./webpack.common');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new Dotenv({
      // silent: true
    })
  ]
});
