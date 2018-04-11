// const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
      timing:  __dirname + '/lib/index.js',
    },
    output: {
        path: __dirname + '/build',
        filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
        },
      ]
    },
    plugins: [
        new UglifyJsPlugin()
    ]
}