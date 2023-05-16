const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// const CleanWebpackPlugin = require('clean-webpack-plugin');

// the path(s) that should be cleaned
// let pathsToClean = [
//     'build'
// ]

// the clean options to use
// let cleanOptions = {
//     root: __dirname,
//     verbose: true, // Write logs to console.
//     dry: false
// }


module.exports = {
  entry: './src/index.jsx', // 相对路径
  // mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build', 'static'), // 打包文件的输出路径
    publicPath: '/static/',
    filename: 'bundle.js', // 打包文件名
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 指定模板路径
      filename: path.resolve(__dirname, 'build', 'index.html'), // 指定文件名
      favicon: './public/favicon.ico',
    }),
    new CleanWebpackPlugin({
      root: __dirname,
      verbose: true, // Write logs to console.
      dry: false,
    }),
    new ManifestPlugin(),
    new WebpackShellPlugin({
      onBuildStart:[],
      onBuildEnd:['python -m trydocpie gen']
    }),
    new CopyPlugin([
      { from: 'public/code-highlight.css', to: 'code-highlight.css' },
      { from: 'public/normalize.css', to: 'normalize.css' },
    ]),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    // historyApiFallback: {index: "build/index.html"},
  },
  module: {
    rules: [ // 配置加载器
      // {
      //   test: /\.jsx$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader',
      //   query: {
      //       presets: ['env', 'react']
      //   }
      // },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          // plugins: ['transform-decorators-legacy'],
          // presets: ['es2015', 'stage-0', 'react'],
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      // {
      //   test: /\.css/,
      //   loader: 'style-loader!css-loader',
      //   // loader: 'css-loader',
      //   // loader: 'style!css-loader',
      // },
      {
        test: /\.css$/,
        loader: 'style-loader',
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
      },
      {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000, // 1w字节以下大小的图片会自动转成base64
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
