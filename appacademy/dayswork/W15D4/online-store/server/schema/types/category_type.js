const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const Category = mongoose.model('category')
const ProductType = require('./product_type')

const CategoryType = new GraphQLObjectType({
  name: 'CategoryType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parentValue) {
        return Category.allProducts(parentValue.id)
      }
    }
  })
})

module.exports = CategoryType
