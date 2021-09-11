const { updateCategory } = require('../model/repository')

/**
 * Add Product ObjectID to Category's list of products
 * @param {number} categoryId 
 * @param {number} productId 
 */
const CategoryAddProduct = async (categoryId, productId) => updateCategory(categoryId, { productId })

module.exports = { CategoryAddProduct }
