var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry : [
        "babel-polyfill",path.resolve(__dirname,'../src/components/index.jsx')
    ],
    output : {
        path: path.resolve(__dirname,'../dist'),
        publicPath : '/',
        filename : 'bundle.js'
    },
    resolve : {
        extensions : ['.js','.json']
    },
    module : {
        rules : [
            {
                test : [/\.js?$/,/\.jsx?$/],
                loader : 'babel-loader',
                exclude : /(node_modules)/,
                query : {
                    presets : ['es2015','react']
                }
            }
        ]
    },
    plugins: [
        new OpenBrowserPlugin({ url: 'http://localhost:3000' })
    ]
}
