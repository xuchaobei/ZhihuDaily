/* eslint-disable */
var path = require('path')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('proxy-middleware');
var config = require('./webpack.config');
var url = require('url');
var serverConfig = 'http://news-at.zhihu.com/';

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

var proxyOptions = url.parse(serverConfig);
proxyOptions.cookieRewrite = true;
app.use('/zhihu', proxyMiddleware(proxyOptions));

app.get('*', function(req, res) {
    if(req.accepts('html')){
      res.sendFile(path.join(__dirname, 'index.html'));
    }
});



app.listen(port, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
 
});
