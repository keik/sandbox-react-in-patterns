const webpack = require('webpack'),
      ExtractTextPlugin = require("extract-text-webpack-plugin")

const prod = process.env.BUILD_ENV === 'production'

const extractCSS = new ExtractTextPlugin('[name].css')

const plugins = [
  extractCSS
]
const plugins_for_production = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]

module.exports = {
  entry: './lib/client/main.js',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: extractCSS.extract(['css', 'sass'])
      }
    ]
  },
  plugins: prod ? plugins : plugins.concat(plugins_for_production)
}
