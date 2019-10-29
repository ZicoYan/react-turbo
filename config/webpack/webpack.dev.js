const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
  devServer: {
    port: 8000,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
      },
    },
  },
});
