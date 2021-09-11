const { Category } = require('./index')
const { CategoryFromId } = require('../use-cases/List')

/**
 * Save new category to database
 * @param {*} param0 
 */
const createCategory = async ({ title, description }) => {
	const category = new Category({
		title,
		description
	})
	return category.save()
}

/**
 * Add new product id to categories product list
 * @param {*} category 
 * @param {number} productId 
 */
const addCategoryProduct = (category, productId) => {
	category.products.push(productId)
	return category
}

/**
 * Make updates to category and save to database
 * @param {number} id 
 * @param {*} updates 
 */
const updateCategory = async (categoryId, updates) => {
	let category = await CategoryFromId(categoryId)
	if (updates.productId) {
		category = await addCategoryProduct(category, updates.productId)
	}
	return category.save()
}

module.exports = { createCategory, updateCategory }
