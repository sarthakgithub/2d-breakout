const path = require('path');
const webpack = require('webpack');

module.exports = {

	entry: ['babel-polyfill', './src/index.js'],

	devtool: 'inline-source-map',
	output: {
		path : path.resolve('public'),
		filename : 'bundle.js'
	},
	devServer : {
		inline: true,
		port: 8080,
		historyApiFallback: true
	},
	resolve : {
		extensions : ['.js','.jsx','.json']
	},
	plugins : [
		new webpack.HotModuleReplacementPlugin()
	],
	module : {
		rules : [

			{
				test : [/\.js?$/,/\.jsx?$/],
				loader : 'babel-loader',
				exclude : /(node_modules)/,
				query : {
                    presets : ['es2015','react']
                }
			},
			{
				test: [/\.css$/,/\.less$/],
        		use: [ 'style-loader', 'css-loader', 'less-loader' ]
			},
			{
	        	test: /\.(png|svg|jpg|gif)$/,
	        	use: [
	        		'file-loader'
	        	]
	       	}
		]
	}
}