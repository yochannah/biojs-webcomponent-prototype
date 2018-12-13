const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-modules-commonjs', ["@babel/plugin-transform-strict-mode", {
            strictMode: false
          }]],
          presets: [
            ['@babel/preset-env'],

          ]
        }
      },

    }, {
      test: /\.html$/,
      use: [{
        loader: 'raw-loader'
      }],
    }, {
      test: /\.css$/,
      use: ['css-loader'],
    }]

  },
  optimization: {
    minimize: false
  },
}
