const mongoose = require("mongoose");
const axios = require('axios');
const { AWSKey } = require('../../../config/keys');
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const User = mongoose.model("users");
const CategoryType = require("./category_type");
const Category = mongoose.model("categories");
const ProductType = require("./product_type");
const Product = mongoose.model("products");

const authOptions = {
  method: "GET",
  url:
    "https://hcu221eec0.execute-api.us-west-1.amazonaws.com/default/generate-price",
  headers: {
    "x-api-key": AWSKey
  }
};


const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return Category.find({});
      }
    },
    category: {
      type: CategoryType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Category.findById(args._id);
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      async resolve() {
        const products = await Product.find({})
        return products.map(product => {
          return axios(authOptions).then(res => {
            // set our cost onto the Product Object
            product.cost = res.data.cost;
            // then return the complete product object
            return product;
          });
        });
      }
    },
    product: {
      type: ProductType,
      args: { _id: { type: GraphQLID } },
      resolve(_, args) {
        // find our product
        return Product.findById(args._id).then(product => {
          // then fetch our price using the above options
          return axios(authOptions).then(res => {
            // set our cost onto the Product Object
            product.cost = res.data.cost;
            // then return the complete product object
            return product;
          });
        });
      }
    }
  })
});

module.exports = RootQueryType;