const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLInt } = graphql;
const CategoryType = require("./category_type")
const Category = mongoose.model('categories')

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    weight: { type: GraphQLFloat },
    cost: { type: GraphQLInt },
    category: { 
      type: CategoryType,
      resolve(parentValue) {
        return Category.findById(parentValue.category)
          .then(category => category)
          .catch(err => null)
      }
    }
  })
});

module.exports = ProductType;