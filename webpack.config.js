const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    controller: './src/controller.js',
    resultTable: './src/resultTable.js',
    skillTable: './src/skillTable.js',
    'hot-reload': './hot-reload.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
