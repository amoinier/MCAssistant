const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    app: [
      'webpack/hot/dev-server',
      path.resolve(__dirname, 'javascripts/entry.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/built'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: 'http://localhost:8080/built/'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
                ["@babel/env"],"@babel/react"],
            plugins: [
              ['@babel/plugin-proposal-decorators', {legacy: true}],
              ['@babel/plugin-proposal-class-properties', {loose: true}]
            ]
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },
  target: 'node',
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
