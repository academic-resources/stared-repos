const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull
} = graphql;
const mongoose = require("mongoose");
const CategoryType = require("./types/category_type")
const Category = mongoose.model("categories")
const ProductType = require("./types/product_type")
const Product = mongoose.model("products")
const UserType = require("./types/user_type")
const User = mongoose.model("users")
const AuthService = require('../services/auth')

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(
          GraphQLString
        )}
      },
      resolve (_, { name }) {
        return new Category({ name }).save()
      }
    },
    deleteCategory: {
      type: CategoryType,
      args: {
        _id: { type: new GraphQLNonNull(
          GraphQLID
        )}
      },
      resolve (_, { _id }) {
        return Category.remove({ _id })
      }
    },
    newProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(
          GraphQLString
        )},
        description: { type: new GraphQLNonNull(
          GraphQLString
        )},
        weight: { type: GraphQLFloat }
      },
      resolve (_, { name, description, weight }) {
        return new Product({ name, description, weight }).save()
      }
    },
    deleteProduct: {
      type: ProductType,
      args: {
        _id: { type: new GraphQLNonNull(
          GraphQLID
        )}
      },
      resolve (_, { _id }) {
        return Product.remove({ _id })
      }
    },
    updateProductCategory: {
      type: ProductType,
      args: {
        productId: { type: GraphQLID },
        categoryId: { type: GraphQLID }
      },
      resolve(_, { productId, categoryId }) {
        return Product.updateProductCategory(productId, categoryId)
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
          return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        // all we need to log the user our is an id
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString }
      },
      resolve(_, args) {
          return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
          token: { type: GraphQLString }
      },
      resolve(_, args) {
          return AuthService.verifyUser(args);
      }
    }
  }
});

module.exports = mutation;