const path = require('path');
const {merge} = require("webpack-merge")
const basicConfig = require("./webpack.config")

const webpackConfig = merge(basicConfig, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name]/js/index.[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: "http://www.chechebj.com/"
  }
})

module.exports = webpackConfig;
