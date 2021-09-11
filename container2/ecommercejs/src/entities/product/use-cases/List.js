const { Product } = require('../model')

const ProductList = async (ids) => {
	const query = {}
	if (Array.isArray(ids) && ids.length > 0) {
		query._id = { $in: ids }
	}
	return Product.find(query)
}

const ProductFromId = async id => Product.findById(id)

module.exports = { ProductList, ProductFromId }
