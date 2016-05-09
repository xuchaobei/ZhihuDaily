var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './entry.js'
  ],
  output: {
    path: path.resolve(__dirname, './'),
    filename: "bundle.js",
    publicPath: ''
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
        loader: 'babel' // 加载模块 "babel" 是 "babel-loader" 的缩写
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=25000'
      }
    ],
    noParse: [path.join(node_modules, '/react/dist/react.min')]
  }
};