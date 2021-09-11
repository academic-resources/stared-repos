const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'product'
    }
  ]
})

CategorySchema.statics.allProducts = id => {
  const Category = mongoose.model('category')

  return Category.findById(id)
    .populate('products')
    .then(category => {
      return category.products
    })
}

module.exports = mongoose.model('category', CategorySchema)
