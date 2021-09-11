const mongoose = require('mongoose')
const graphql = require('graphql')
const { AWSKey } = require('../../../config/keys')
const axios = require('axios')
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql

const UserType = require('./user_type')
const CategoryType = require('./category_type')
const ProductType = require('./product_type')

const User = mongoose.model('user')
const Category = mongoose.model('category')
const Product = mongoose.model('product')

const authOptions = {
  method: 'GET',
  url:
    'https://kdu7dz0pc7.execute-api.us-east-2.amazonaws.com/default/generate-price',
  headers: {
    'x-api-key': AWSKey
  }
}

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({})
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id)
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return Category.find({})
      }
    },
    category: {
      type: CategoryType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Category.findById(args._id)
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find({}).then(products =>
          products.map(product =>
            axios(authOptions).then(res => {
              product.cost = res.data.cost
              return product
            })
          )
        )
      }
    },
    product: {
      type: ProductType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Product.findById(args._id).then(product => {
          return axios(authOptions).then(res => {
            product.cost = res.data.cost
            return product
          })
        })
      }
    }
  })
})

module.exports = RootQueryType
