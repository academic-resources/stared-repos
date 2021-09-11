const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
const mongoose = require("mongoose");

const ToyType = require("./toy_type");
const Dog = mongoose.model("dog");

const DogType = new GraphQLObjectType({
  name: "DogType",
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    breed: { type: GraphQLString },
    toys: {
      type: ToyType,
      resolve(parentValue) {
        return Dog.findById(parentValue._id).populate("toys");
      }
    }
  }
});

module.exports = DogType;
