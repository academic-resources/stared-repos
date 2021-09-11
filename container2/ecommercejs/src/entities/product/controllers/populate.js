const { CategoryFromId } = require('../../category/use-cases/List')

const productsWithCategory = async (products) => Promise.all(products.map(productWithCategory))

const productWithCategory = async (product) => {
	product.category = await CategoryFromId(product.category)
	return product
}

module.exports = { productWithCategory, productsWithCategory }
