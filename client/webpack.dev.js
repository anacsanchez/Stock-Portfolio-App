const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const webpack = require('webpack');
const entryPath = path.join(__dirname, 'app', 'index.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client',
        entryPath
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
