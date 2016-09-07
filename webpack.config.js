const extract_text_webpack_plugin = require("extract-text-webpack-plugin"),
      webpack = require('webpack')

const base_config = require('./webpack.base.config.js')

const prod = process.env.BUILD_ENV === 'production'

const extractCSS = new extract_text_webpack_plugin('[name].css')

const plugins = [extractCSS]
const plugins_for_production = plugins.concat([
  new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
])

module.exports = Object.assign({}, base_config, {
  entry: {
    app: './lib/client/app.js'
  },
  output: {
    path: './build/assets',
    filename: '[name].js'
  },
  target: 'web',
  module: {
    loaders: base_config.module.loaders.concat([
      {test: /\.scss$/, loader: extractCSS.extract(['css', 'sass'])}
    ])
  },
  plugins: prod ? plugins_for_production : plugins
})
