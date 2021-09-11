const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;
const mongoose = require("mongoose");
const UserType = require("./user_type");

const User = mongoose.model("user");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // this will be the name of this mutation
    newUser: {
      // creating a User type
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name, email, password }) {
        return new User({ name, email, password }).save();
      }
    }
  }
});

module.exports = mutation;
