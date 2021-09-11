const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql;
const mongoose = require("mongoose");

const DogType = require("./dog_type");
const Toytype = require("./toy_type");

const Dog = mongoose.model("dog");
const Toy = mongoose.model("toy");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    dogs: {
      type: new GraphQLList(DogType),
      resolve() {
        return Dog.find({});
      }
    },
    dog: {
      type: DogType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { _id }) {
        return Dog.findById(_id);
      }
    },
    toys: {
      type: new GraphQLList(Toytype),
      resolve() {
        return Toy.find({});
      }
    },
    toy: {
      type: Toytype,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return Toy.findById(args._id);
      }
    }
  }
});

module.exports = RootQuery;
