const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
  // capitalize!
  name: "UserType",
  // fields refers to everything this Type will be able to return to you. Which means all of the
  // data associated with this type in the database. For our User that is id, email, name, and posts.
  fields: {
    id: { type: GraphQLID }, // Mongoose automatically generates an ID field for our models
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  }
});

module.exports = UserType;