const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CommonConfig = require('./webpack.config.js');

module.exports = merge(CommonConfig, {
    devtool: 'inline-source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }
        ),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
})
