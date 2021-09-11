const { ProductList } = require('../../product/use-cases/List')

const categoriesWithProducts = async (categories) => Promise.all(
	categories.map(async (category) => {
		category.products = await ProductList(category.products)
		return category
	})
)

module.exports = { categoriesWithProducts }
