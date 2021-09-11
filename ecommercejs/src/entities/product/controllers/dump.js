const { productWithCategory } = require('./populate')

/**
 * Sanitize Product output
 * @param {*} product 
 */
const dumpProduct = async (product) => productWithCategory({
	...product._doc,
	createdAt: new Date(product.createdAt).toISOString()
})

/**
 * For each Product in array of Products, dump output
 * @param {*} products 
 */
const dumpProducts = async (products) => Promise.all(products.map(dumpProduct))

module.exports = { dumpProduct, dumpProducts }
