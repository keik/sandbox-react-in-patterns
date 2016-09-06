const extract_text_webpack_plugin = require("extract-text-webpack-plugin"),
      webpack = require('webpack'),
      webpack_node_externals = require('webpack-node-externals')

const prod = process.env.BUILD_ENV === 'production'

const extractCSS = new extract_text_webpack_plugin('[name].css')

const plugins = [
  extractCSS
]
const plugins_for_production = plugins.concat([
  new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
])

const common_loaders = [
  {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
  {test: /\.json?$/, loader: 'json'}
]
const client_loaders = common_loaders.concat([
  {test: /\.scss$/, loader: extractCSS.extract(['css', 'sass'])}
])

module.exports = [
  // for client
  {
    entry: {
      app: './lib/client/app.js'
    },
    output: {
      path: './build/assets',
      filename: '[name].js'
    },
    target: 'web',
    module: {loaders: client_loaders},
    resolve: {extensions: ['', '.js', '.json', '.jsx']},
    plugins: prod ? plugins_for_production : plugins
  },

  // for server
  {
    entry: {
      server: './lib/server'
    },
    output: {
      path: './build',
      filename: '[name].js'
    },
    target: 'node',
    externals: [webpack_node_externals()],
    module: {loaders: common_loaders},
    resolve: {extensions: ['', '.js', '.json', '.jsx']}
  }
]
