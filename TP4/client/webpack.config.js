// fichier webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const development=false;

module.exports = {
  entry: './src/scripts/pong.js',
  mode : development ? 'development' : 'production',
  output: {
    path: development ?path.resolve(__dirname, 'dist'): path.resolve(__dirname, '../server/public'),
    filename: 'scripts/bundle.js'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new CopyPlugin({
        patterns: [
          {
            from: 'src/images/*',
            to:   'images/[name][ext]'
          },
          {
            from: 'src/style/*',
            to:   'style/[name][ext]'
          },
        ]
    })
    ]
};
