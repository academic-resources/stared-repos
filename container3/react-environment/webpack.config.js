var webpack = require('webpack');

module.exports = {

  entry: {
    'react-environment': './src/components.js'
  },

  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },

  output: {
    filename: 'components.js',
    path: 'dist',
    libraryTarget: 'umd',
    library: 'ReactEnvironment'
  },

  module: {
    loaders: [
      { 
        test: /\.js?$/, 
        exclude: /node_modules/, 
        loader: 'babel'
      },
    ]
  }

};
