const { Schema, model } = require('mongoose')
const { ProductSchema } = require('./schema')

module.exports = {
	Product: model('Product', new Schema(ProductSchema(Schema.Types)))
}
