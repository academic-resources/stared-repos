const CategorySchema = (types) => ({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
	},
	products: [
		{
			type: types.ObjectId,
			ref: 'Product'
		}
	]
})

module.exports = { CategorySchema }
