const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    main: './bin/www',
    index: './public/javascripts/index.js',
    home: './public/javascripts/home.js',
    login: './public/javascripts/login.js',
    interactivity: './public/javascripts/interactivity.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
  externalsPresets: { node: true },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: '@sucrase/webpack-loader',
          options: {
            transforms: ['imports']
          }
        }
      }
    ]
  }
};
