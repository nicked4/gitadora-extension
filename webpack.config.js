const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    controller: './src/controller.js',
    resultTable: './src/resultTable.js',
    skillTable: './src/skillTable.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
