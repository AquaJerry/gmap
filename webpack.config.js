// - Cleaner, clears old dists
// - Html, generates html dynamically
// - Uglifyer, minimizes scripts
import Cleaner from 'clean-webpack-plugin'
import Html from 'html-webpack-plugin'
import path from 'path'
import Uglifyer from 'uglify-js-plugin'

// Webpack config
export default {
  entry: './src/first-map.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new Cleaner('dist'),
    new Uglifyer(),
    new Html({
      description: 'homework for google maps API v3',
      favicon: 'src/favicon.ico',
      template: 'src/first-map.html',
      title: 'First Map',
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
  ],
};
