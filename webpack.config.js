const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const { head } = require('lodash');

module.exports = {
  entry: {
    account:'./src/views/account/account.js',
    home:'./src/views/home/home.js',
    menu:'./src/views/menu/menu.js',
    more:'./src/views/more/more.js',
    store:'./src/views/store/store.js',
    test:'./src/views/test/test.js',
    reg:'./src/views/reg/reg.js',
    common: './src/index.js',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[fullhash:8].js',
    clean:true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(woff | eot | ttf | otf | svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  mode: process.env.NODE_ENV,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  externals: {
    jquery: 'jQuery',
    lodash: '_',
  },
  devServer: {
    open: ['/home.html'],
    // 配置前端请求代理
    proxy: {
      '^/api': {
        target: 'https://www.starbucks.com.cn/',
      },
      '^/bff': {
        target: 'https://bff.starbucks.com.cn/',
        pathRewrite: { '/api1': '' },
      },
    },
    client: {
      overlay: false,
    },
  },
  plugins: [
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template:'./src/views/account/account.html',
      inject:'head',
      chunks: ['common', 'account'],
      filename:'account.html'
    }),
    new HtmlWebpackPlugin({
      template:'./src/views/home/home.html',
      inject:'head',
      chunks: ['common', 'home'],
      filename:'home.html'
    }),
    new HtmlWebpackPlugin({
      template:'./src/views/menu/menu.html',
      inject:'head',
      chunks: ['common', 'menu'],
      filename:'menu.html'
    }),
    new HtmlWebpackPlugin({
      template:'./src/views/more/more.html',
      inject:'head',
      chunks: ['common', 'more'],
      filename:'more.html'
    }),
    new HtmlWebpackPlugin({
      template:'./src/views/store/store.html',
      inject:'head',
      chunks: ['common', 'store'],
      filename:'store.html'
    }),
    new HtmlWebpackPlugin({
      template:'./src/views/test/test.html',
      inject:'head',
      chunks: ['common', 'test'],
      filename:'test.html'
    }),
    new HtmlWebpackPlugin({
      template:'./src/views/reg/reg.html',
      inject:'head',
      chunks: ['common', 'reg'],
      filename:'reg.html'
    }),
  ],
};
