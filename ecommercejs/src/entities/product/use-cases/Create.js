const { createProduct } = require('../model/repository')
const { CategoryAddProduct } = require('../../category/use-cases/Update')

/**
 * Create and save Product to database,
 * add relationship to Category
 * @param {*} param0 
 */
const ProductCreate = async ({ title, description, price, categoryId }) => {
	const product = await createProduct({ title, description, price, categoryId })
	await CategoryAddProduct(categoryId, product._id)
	return product
}

module.exports = { ProductCreate }
