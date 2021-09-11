const { CategoryCreate } = require('../use-cases/Create')
const { CategoryList } = require('../use-cases/List')
const { categoriesWithProducts } = require('../controllers/populate')

const CategoryController = {
	getCategories: async () => categoriesWithProducts(await CategoryList()),
	createCategory: async ({ categoryInput }) => CategoryCreate(categoryInput)
}

module.exports = CategoryController
