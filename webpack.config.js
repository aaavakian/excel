const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

// Add hash for the production mode
// Only for changed files a new hash is generated
const filename = ext => {
  return `[name]${isProd ? '.[contenthash]' : ''}.bundle.${ext}`;
};

const jsLoaders = () => {
  const loaders = ['babel-loader'];

  if (isDev) {
    // loaders.push('eslint-loader');
  }

  return loaders;
}

const plugins = () => {
  const base = [
    // This plugin adds all bundled JS files to the given HTML file
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // For copying the favicon
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ];

  if (isDev) {
    base.push(new ESLintPlugin());
  }

  return base;
};

module.exports = {
  // Absolute path to our project source files
  context: path.resolve(__dirname, 'src'),
  // Input file
  entry: {
    main: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      // Relative path can be used (in context)
      './index.js'
    ]
  },
  output: {
    // Absoulte path to the output folder
    path: path.resolve(__dirname, 'dist'),
    // [name] will be set dynamically from entry points
    filename: filename('js'),
    // For cleaning the dist folder each time
    clean: true
  },
  resolve: {
    // Now we can use imports without '.js' extension
    extensions: ['.js'],
    // Using aliases for convenient imports
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // Or we can use relative ways to the context: './core'
      '@core': path.resolve(__dirname, 'src', 'core')
    }
  },
  devServer: {
    port: 8080,
    // For automatic browser launch
    // open: true,
    // Hot-reload
    hot: true,
    watchFiles: './src/'
  },
  plugins: plugins(),
  // Source maps are showing source file names for a part of the code
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        // Order is from the last to the first (e.g. 'sass-loader' is first)
        use: [
          // Instead 'style-loader' move css to separate files
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles SASS to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ]
  }
};
