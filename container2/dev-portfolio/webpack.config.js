var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 'production' mode would minify and uglify the code, and use React's production code
  mode: 'development',
  // entry is the starting point for the web made by our files through imports and exports
  entry: path.resolve(__dirname, 'src/index.js'),
  // concatenates all js/jsx files into a single bundle.js inside a bundle folder
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'bundle.js'
  },
  // types of files we want Webpack to bundle
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    publicPath: '/bundle/',
    compress: true,
    port: 3300
  },
  plugins: [
    // This is for exporting styles to a seperate css file [incomplete]
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
      chunkFilename: `${Date.now()}-bundle.css`
    }),
  ]
};