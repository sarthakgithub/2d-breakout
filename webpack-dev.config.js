const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CommonConfig = require('./webpack.config.js');

module.exports = merge(CommonConfig, {
	entry: ['webpack-hot-middleware/client?reload=true'],
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ]
})
