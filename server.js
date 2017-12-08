var express = require('express');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var fs = require("fs");
var cors = require('cors');
var bodyParser = require('body-parser');
let config = '';

if (process.env.NODE_ENV === 'production') {
    config = require('./webpack/webpack-prod.config.js');
} else {
    config = require('./webpack/webpack-dev.config.js');
}

var port = 3000;
var app = express();
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization");
    next();
});

app.use(express.static(__dirname+ '/'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/items', function(req, res){
    fs.readFile( "./data/data.json",'utf-8',  (error ,data)=>{
        var r = error?error:data;
        res.send(JSON.parse(r));
    });
});

app.listen(port, () => {
    console.log('Server listening to 3000 port.');
});
