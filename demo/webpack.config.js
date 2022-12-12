/* eslint-env node */

const path = require('path')

const prod = 'production' === process.env.NODE_ENV

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: ['@babel/polyfill', path.resolve(__dirname, 'index.js')],
  output: {
    path: path.resolve(__dirname, '..', 'demo-dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      'material-ui-popup-state': path.resolve(__dirname, '..', 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    static: {
      directory: __dirname,
    },
  },
}
