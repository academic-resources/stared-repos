const { Product } = require('./index')

/**
 * Save new product to database
 */
const createProduct = async ({ title, description, price, categoryId }) => {
	const product = new Product({
		title,
		description,
		price: +price,
		createdAt: new Date(),
		category: categoryId
	})

	return product.save()
}

module.exports = { createProduct }
