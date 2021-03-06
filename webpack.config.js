// const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
      skyeye:  __dirname + '/lib/index.js',
    },
    output: {
        path: __dirname + '/demo/build',
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