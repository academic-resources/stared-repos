const ProductSchema = (types) => ({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		required: true
	},
	category: {
		type: types.ObjectId,
		ref: 'Category'
	}
})

module.exports = { ProductSchema }
