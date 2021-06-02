const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const devserver = require('./webpack/devserver');
const pug = require('./webpack/pug');
const html = require('./webpack/html');
const sass = require('./webpack/sass');
const css = require('./webpack/css');

const images = require('./webpack/images');
const font = require('./webpack/font');
const ts = require('./webpack/typescript');


const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'docs')
};


const PLUGINSdate = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new HtmlWebpackPlugin({
    title: 'Webpack app',
    filename: 'index.html',
    chunks: ['index'],
    template: PATHS.source + '/index.pug'
  })
];

const ENTRYdate = {
  'index.js': PATHS.source + '/index.js',
};


const common = merge([
  {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: ENTRYdate,
    output: {
      path: PATHS.build,
      filename: '[name]'
    },
    resolve: {
      alias: {
        '@Blocks': path.resolve(__dirname, 'src/blocks/'),
        '@Pages': path.resolve(__dirname, 'src/pages/'),
        '@': path.resolve(__dirname, 'src/'),
      },
    },
    plugins: PLUGINSdate,
  },

  pug(),
  html(),
  sass(),
  css(),
  font(),
  images(),
  ts(),
]);


const developmentConfig = {
	mode: 'development',
  devServer: {
    stats: 'errors-only',
    port: 9000
  },
  
};

const productionConfig = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
  ]
}


module.exports = function(env) {

  if (env.conf === 'development') {
    return merge([
      common,
      developmentConfig,
    ])
  }
  
  if (env.conf === 'production') {
    return merge([
      common,
      productionConfig,
    ])
  }
};