const { Schema, model } = require('mongoose')
const { CategorySchema } = require('./schema')

module.exports = {
	Category: model('Category', new Schema(CategorySchema(Schema.Types)))
}
