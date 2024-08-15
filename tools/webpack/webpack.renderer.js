const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

module.exports = {
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new MonacoWebpackPlugin({
      languages: ['javascript', 'typescript'], // Customize as needed
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      ...require('./webpack.aliases'),
    },
  },
  stats: 'minimal',
  devtool: 'inline-source-map',
};
