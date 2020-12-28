const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const src = path.resolve(__dirname, 'src');
const VENDOR_LIBS = [
  '@reduxjs/toolkit',
  'axios',
  'bootstrap',
  'classnames',
  // 'font-awesome',
  'formik',
  'jquery',
  'popper.js',
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
    bundle: './index.js',
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
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
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
  ],
  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'src/actions/'),
      api: path.resolve(__dirname, 'src/api/'),
      assets: path.resolve(__dirname, 'src/redux/'),
      components: path.resolve(__dirname, 'src/components/'),
      configs: path.resolve(__dirname, 'src/configs/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      CustomFields: path.resolve(__dirname, 'src/custom-fields/'),
      helpers: path.resolve(__dirname, 'src/helpers/'),
      hocs: path.resolve(__dirname, 'src/hocs/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
      layout: path.resolve(__dirname, 'src/layout/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
      redux: path.resolve(__dirname, 'src/redux/'),
      routes: path.resolve(__dirname, 'src/routes/'),
      sagas: path.resolve(__dirname, 'src/sagas/'),
      slices: path.resolve(__dirname, 'src/slices/'),
    },
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.json', '.css', '.scss', '.jsx'],
    preferRelative: true,
  },
};
