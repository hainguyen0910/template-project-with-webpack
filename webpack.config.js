require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const port = process.env.PORT || 3000;

const VENDOR_LIBS = [
  '@reduxjs/toolkit',
  'axios',
  'bootstrap',
  'classnames',
  // 'font-awesome',
  'formik',
  'jquery',
  'query-string',
  'react',
  'react-dom',
  'react-redux',
  'react-router-dom',
  'react-select',
  'reactstrap',
  'redux-saga',
  'sweetalert',
  'yup',
];

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    overlay: true,
    stats: 'minimal',
    inline: true,
    compress: true,
    contentBase: '/',
    port,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|woff2|eot|ttf|wav|mp3|ico)$/i,
        loader: 'file-loader',
        options: {
          // name: '[path][name].[ext]',
          name(resourcePath) {
            return resourcePath.replace(path.resolve(__dirname, 'src'), '');
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
    }),
  ],
  resolve: {
    alias: {
      Actions: path.resolve(__dirname, 'src/actions/'),
      Api: path.resolve(__dirname, 'src/api/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Configs: path.resolve(__dirname, 'src/configs/'),
      Constants: path.resolve(__dirname, 'src/constants/'),
      CustomFields: path.resolve(__dirname, 'src/custom-fields/'),
      Helpers: path.resolve(__dirname, 'src/helpers/'),
      Hocs: path.resolve(__dirname, 'src/hocs/'),
      Hooks: path.resolve(__dirname, 'src/hooks/'),
      Layout: path.resolve(__dirname, 'src/layout/'),
      Pages: path.resolve(__dirname, 'src/pages/'),
      Reducers: path.resolve(__dirname, 'src/reducers/'),
      Redux: path.resolve(__dirname, 'src/redux/'),
      Routes: path.resolve(__dirname, 'src/routes/'),
      Sagas: path.resolve(__dirname, 'src/sagas/'),
      Slices: path.resolve(__dirname, 'src/slices/'),
    },
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.css', '.scss', '.jsx'],
    preferRelative: true,
  },
};
