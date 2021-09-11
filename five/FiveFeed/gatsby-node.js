/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
var webpack = require('webpack')

module.exports = {
  mode: 'development',
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
}
