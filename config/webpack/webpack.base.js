const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 配置常量
// 源代码的根目录（本地物理文件路径）
const SRC_PATH = path.resolve('./src');
// 打包后的资源根目录（本地物理文件路径）
const ASSETS_BUILD_PATH = path.resolve('./build');
// 资源根目录（可以是 CDN 上的绝对路径，或相对路径）
const ASSETS_PUBLIC_PATH = '/assets/';

const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.resolve(SRC_PATH, 'index.tsx'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      src: path.resolve('./src/'),
    },
  },
  output: {
    path: path.resolve(ASSETS_BUILD_PATH),
    hashDigestLength: 8,
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
      },
      {
        test: /.less$/,
        include: SRC_PATH,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ASSETS_PUBLIC_PATH,
              hmr: IS_DEV,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                mode: 'local',
                context: path.resolve('.', 'src'),
                hashPrefix: 'Yan',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /.less$/,
        include: path.resolve('./node_modules/antd'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ASSETS_PUBLIC_PATH,
              hmr: IS_DEV,
            },
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 每次打包前，先清空原来目录中的内容
    new CleanWebpackPlugin({ verbose: false }),
    new HtmlWebpackPlugin({
      title: 'Webpack 模板',
      filename: 'index.html',
      template: path.resolve(SRC_PATH, 'template.html'),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: IS_DEV ? '[name].css' : '[name].[hash].css',
      chunkFilename: IS_DEV ? '[id].css' : '[id].[hash].css',
    }),
  ],
};
