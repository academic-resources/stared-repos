const { ProductCreate } = require('../use-cases/Create')
const { dumpProduct, dumpProducts } = require('./dump')
const { ProductList } = require('../use-cases/List')

const ProductController = {
	getProducts: async (ids) => dumpProducts(await ProductList(ids)),
	createProduct: async ({ productInput }) => dumpProduct(await ProductCreate(productInput))
}

module.exports = ProductController
