const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat,
  GraphQLBoolean
} = graphql
const mongoose = require('mongoose')

const CategoryType = require('./types/category_type')
const Category = mongoose.model('category')

const ProductType = require('./types/product_type')
const Product = mongoose.model('product')

const UserType = require('./types/user_type')
const AuthService = require('../services/auth')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parent, { name }) {
        return new Category({ name }).save()
      }
    },
    deleteCategory: {
      type: CategoryType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, { id }) {
        return Category.findByIdAndDelete(id)
      }
    },
    newProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        category: { type: GraphQLID },
        description: { type: GraphQLString },
        weight: { type: GraphQLFloat }
      },
      resolve: async(parent, data, context) => {
        const validUser = await AuthService.verifyUser( {token: context.token} )
        if (validUser.loggedIn){
          const product = new Product(data)
          return Category.findById(data.category).then(category => {
            category.products.push(product)
            return Promise.all([product.save(), category.save()]).then(
              ([product, category]) => product
            )
          })
        } else {
          throw new Error("You must be logged in to create a product")
        }
      }
    },
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, { id }) {
        const product = Product.findById(id)
        Category.find({}).then(categories =>
          categories.forEach(category => {
            category.products.pull(product)
            category.save()
          })
        )
        return product.remove()
      }
    },
    updateProductCategory: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        category_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Product.updateProductCategory(args.id, args.category_id)
      }
    },
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args)
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args)
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args)
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args)
      }
    }
  }
})

module.exports = mutation
