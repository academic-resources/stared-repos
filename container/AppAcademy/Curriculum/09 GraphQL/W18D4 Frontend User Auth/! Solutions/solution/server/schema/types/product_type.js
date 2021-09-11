const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const Product = mongoose.model("products");

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    weight: { type: GraphQLInt },
    category: {
      type: require("./category_type"),
      resolver(parentValue) {
        return Product.findById(parentValue._id)
          .populate("category")
          .then(product => {
            return product.category;
          });
      }
    }
    // Bonus Phase: Adding the Lambda
    // cost: { type: GraphQLInt }
  })
});

module.exports = ProductType;
