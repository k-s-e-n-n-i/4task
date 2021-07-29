const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pug = require('./webpack/pug');
const html = require('./webpack/html');
const sass = require('./webpack/sass');
const images = require('./webpack/images');
const font = require('./webpack/font');
const ts = require('./webpack/typescript');

const paths = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'docs'),
};

const pluginsDate = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
  new HtmlWebpackPlugin({
    title: 'Webpack app',
    filename: 'index.html',
    chunks: ['index'],
    template: paths.source + '/index.pug',
  }),
  new HtmlWebpackPlugin({
    title: 'Webpack app',
    filename: 'page-demo-sliders.html',
    chunks: ['page-demo-sliders'],
    template: paths.source + '/pages/page-demo-sliders/page-demo-sliders.pug',
  }),
  new HtmlWebpackPlugin({
    title: 'Webpack app',
    filename: 'tests-slider.html',
    chunks: ['tests-slider'],
    template: paths.source + '/pages/tests-slider/tests-slider.pug',
  }),
];

const entryDate = {
  'index.js': paths.source + '/index.js',
  'layout.js': paths.source + '/blocks/layout/layout.js',
  'page-demo-sliders.js': paths.source + '/pages/page-demo-sliders/page-demo-sliders.js',
  'tests-slider.js': paths.source + '/pages/tests-slider/tests-slider.js',
};

const common = merge([
  {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: entryDate,
    output: {
      path: paths.build,
      filename: 'js/[name]',
    },
    resolve: {
      alias: {
        '@Blocks': path.resolve(__dirname, 'src/blocks/'),
        '@Pages': path.resolve(__dirname, 'src/pages/'),
        '@': path.resolve(__dirname, 'src/'),
      },
    },
    plugins: pluginsDate,
  },

  pug(),
  html(),
  sass(),
  font(),
  images(),
  ts(),
]);

const developmentConfig = {
  mode: 'development',
  devServer: {
    stats: 'errors-only',
    port: 9001,
  },
};

const productionConfig = {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
};

module.exports = function (env) {
  if (env.conf === 'development') {
    return merge([common, developmentConfig]);
  }

  if (env.conf === 'production') {
    return merge([common, productionConfig]);
  }
};
