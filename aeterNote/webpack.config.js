var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/aeternote.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react', 'es2015']
        }
      }]
    },

  devtool: 'source-map',
  resolve: {

    extensions: [".ts", ".js", ".jsx", ".svg", "*"]
  }
};
