const { getProducts, createProduct } = require('../../../entities/product/controllers')
const { createUser } = require('../../../entities/user/controllers')
const { getCategories, createCategory } = require('../../../entities/category/controllers')

module.exports = {
	products: getProducts,
	createProduct,
	createUser,
	categories: getCategories,
	createCategory
}
