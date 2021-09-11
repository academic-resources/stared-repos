const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const mongoose = require("mongoose");
const Toy = mongoose.model("toy");

const ToyType = new GraphQLObjectType({
  name: "ToyType",
  fields: () => ({
    _id: { type: GraphQLID }, // Mongoose automatically generates an ID field for our models
    name: { type: GraphQLString },
    color: { type: GraphQLString },
    dogs: {
      type: new GraphQLList(require("./dog_type")),
      resolve(parentValue) {
        return Toy.findById(parentValue._id)
          .populate("dogs")
          .then(toy => toy.dogs);
      }
    }
  })
});

module.exports = ToyType;
