const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    // does not work?
    ignored: /node_modules/,
  }
});
